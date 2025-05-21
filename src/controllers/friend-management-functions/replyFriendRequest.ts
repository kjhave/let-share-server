import { Request, Response } from "express";
import {
    getFriendRequestInformation,
    addNewFriend,
    removeFriendRequest,
    getFriendRequestId
} from "../../services";

export const replyFriendRequest = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.user;
    const type = req.body.type; // "accept" or "deny"
    if (type !== "accept" && type !== "deny") {
        res.status(400).json({ message: "Invalid request" });
        return;
    }

    const friendId = req.body.friendId;
    
    if (!friendId) {
        res.status(400).json({ message: "Invalid request" });
        return;
    }

    try {
        const friendRequestId = await getFriendRequestId(userId, friendId);
        if (!friendRequestId) {
            res.status(404).json({ message: "Friend request not found" });
            return;
        }

        //userId1 is the id of the user who sent the friend request
        //userId2 is the id of the user who received the friend request
        const requestInfor = await getFriendRequestInformation(friendRequestId) as { userId1: string, userId2: string };
        if (!requestInfor) {
            res.status(404).json({ message: "Friend request not found" });
            return;
        }
        const { userId1, userId2 } = requestInfor;

        if (userId.toString() !== userId2.toString()){
            res.status(403).json({ message: "You are not authorized to reply this friend request" });
            return;
        }

        if (type === "accept"){
            await addNewFriend(userId1, userId2);
        }

        await removeFriendRequest(friendRequestId);

        if (type === "deny"){
            res.status(200).json({ message: "Friend request denied" });
        } else{
            res.status(200).json({ message: "Friend request accepted" });
        }
    } catch (err) {
        console.error("Error accepting friend request:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
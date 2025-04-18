import { Request, Response } from "express";
import { getFriendRequestInformation } from "../../services/getFriendRequestInformation";
import { addNewFriend } from "../../services/addNewFriend";

export const acceptFriendRequest = async (req: Request, res: Response): Promise<void> => {
    const user = res.locals.user;
    const friendRequestId = req.body.friendRequestId;
    
    if (!friendRequestId) {
        res.status(400).json({ message: "Invalid request" });
        return;
    }

    try {
        //userId1 is the id of the user who sent the friend request
        //userId2 is the id of the user who received the friend request
        const requestInfor = await getFriendRequestInformation(friendRequestId) as { userId1: string, userId2: string };
        if (!requestInfor) {
            res.status(404).json({ message: "Friend request not found" });
            return;
        }
        const { userId1, userId2 } = requestInfor;

        if (user !== userId2){
            res.status(403).json({ message: "You are not authorized to accept this friend request" });
            return;
        }

        await addNewFriend(userId1, userId2);
        res.status(200).json({ message: "Friend request accepted" });
    } catch (err) {
        console.error("Error accepting friend request:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
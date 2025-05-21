import { Request, Response } from "express";
import {
    addFriendRequest, 
    getFriendRequestList, 
    getFriendRequestId, 
    addNewFriend, 
    removeFriendRequest
} from "../../services";
import { isFriend } from "../../utils/isFriend";

export const sendFriendRequest = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.user;
    const { friendId } = req.body;

    if (!friendId) {
        res.status(400).json({ message: "Invalid Request" });
    }

    try {
        //Check if the userId and friendId are the same
        if (userId === friendId) {
            res.status(400).json({ message: "You cannot send a friend request to yourself." });
            return;
        }

        //Check if the userId and friendId are already friends
        const isAlreadyFriend = await isFriend(userId, friendId);
        if (isAlreadyFriend) {
            res.status(400).json({ message: "You are already friends with this user." });
            return;
        }

        //Check if the userId already sent a friend request to the friendId
        const friendRequests = await getFriendRequestList(friendId) as Array<{ id: string, name: string }>;
        const isAlreadyRequested = friendRequests.some((request) => request.id === userId);

        if (isAlreadyRequested) {
            res.status(400).json({ message: "You have already sent a friend request to this user." });
            return;
        }

        //Check if the friendId already sent a friend request to the userId
        const userRequests = await getFriendRequestList(userId) as Array<{ id: string, name: string }>;
        const isAlreadyRequestedByUser = userRequests.some((request) => request.id === friendId);

        if (isAlreadyRequestedByUser) {
            await addNewFriend(userId, friendId);

            const friendRequestId = await getFriendRequestId(userId, friendId);
            if (!friendRequestId) {
                res.status(500).json({ message: "Internal server error" });
                return;
            }
            await removeFriendRequest(friendRequestId);

            res.status(200).json({ message: "You're already received a friend request from this user, now you are friend" });
            return;
        }

        console.log("Sending friend request...");

        await addFriendRequest(userId, friendId);
        res.status(200).json({ message: "Friend request sent." });
    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
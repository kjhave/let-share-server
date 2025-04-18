import { Request, Response } from "express";
import { addFriendRequest } from "../../services/addFriendRequest";
import { getFriendList } from "../../services/getFriendList";
import { getFriendRequestList } from "../../services/getFriendRequestList";
import { getFriendRequestId } from "../../services/getFriendRequestId";
import { addNewFriend } from "../../services/addNewFriend";
import { removeFriendRequest } from "../../services/removeFriendRequest";

export const sendFriendRequest = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.user;
    const { friendId } = req.body;

    try {
        //Check if the userId and friendId are the same
        if (userId === friendId) {
            res.status(400).json({ message: "You cannot send a friend request to yourself." });
            return;
        }

        //Check if the userId and friendId are already friends
        const friends = await getFriendList(userId) as Array<{ _id: string, name: string }>;
        const isAlreadyFriend = friends.some((friend) => friend._id === friendId);

        if (isAlreadyFriend) {
            res.status(400).json({ message: "You are already friends with this user." });
            return;
        }

        //Check if the userId already sent a friend request to the friendId
        const friendRequests = await getFriendRequestList(friendId) as Array<{ _id: string, name: string }>;
        const isAlreadyRequested = friendRequests.some((request) => request._id === userId);

        if (isAlreadyRequested) {
            res.status(400).json({ message: "You have already sent a friend request to this user." });
            return;
        }

        //Check if the friendId already sent a friend request to the userId
        const userRequests = await getFriendRequestList(userId) as Array<{ _id: string, name: string }>;
        const isAlreadyRequestedByUser = userRequests.some((request) => request._id === friendId);

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

        await addFriendRequest(userId, friendId);
        res.status(200).json({ message: "Friend request sent." });
    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
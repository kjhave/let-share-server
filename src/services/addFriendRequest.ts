import { FriendRequest } from "../models/db";

export const addFriendRequest = async (senderId: string, receiverId: string): Promise<void> => {
    try {
        const friendRequest = new FriendRequest({
            userId1: senderId,
            userId2: receiverId,
        });

        await friendRequest.save();
    } catch (error) {
        console.error("Error adding friend request:", error);
        throw new Error("Failed to add friend request");
    }
}
import { FriendRequest } from "../models/db";

export const addFriendRequest = async (senderId: string, receiverId: string): Promise<void> => {
    try {
        await FriendRequest.create({
            userId1: senderId,
            userId2: receiverId,
        });
    } catch (error) {
        console.error("Error adding friend request:", error);
        throw new Error("Failed to add friend request");
    }
}
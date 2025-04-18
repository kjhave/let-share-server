import { FriendRequest } from "../models/db";

export const getFriendRequestList = async (username: string): Promise<Array<Object>> => {
    try {
        // Simulate fetching friend requests from a database
        // userId2 is the user receiving the friend request
        const friendRequests = await FriendRequest.find({ userId2: username }).populate('userId1', '_id name');
        return friendRequests;
    } catch (err) {
        console.error("Error fetching friend requests:", err);
        throw new Error("Error fetching friend requests");
    }
}
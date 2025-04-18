import { FriendRequest } from "../models/db";

export const getFriendRequestList = async (userId: string): Promise<Array<Object>> => {
    try {
        // userId2 is the user receiving the friend request
        const friendRequests = await FriendRequest.find({ userId2: userId })
            .populate('userId1', '_id name')
            .lean();
        return friendRequests;
    } catch (err) {
        console.error("Error fetching friend requests:", err);
        throw new Error("Error fetching friend requests");
    }
}
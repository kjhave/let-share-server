import { FriendRequest } from "../models/db";

type FriendRequestType = {
    _id: string;
    userId1: {
        _id: string;
        name: string;
    }
}

export const getFriendRequestList = async (userId: string): Promise<Array<Object>> => {
    try {
        // userId2 is the user receiving the friend request
        const data = await FriendRequest.find({ userId2: userId })
            .populate('userId1', '_id name')
            .select('userId1')
            .lean<FriendRequestType[]>();

        const friendRequests = data.map((request) => ({
            id: request.userId1._id.toString(),
            name: request.userId1.name,
        }));

        return friendRequests;
    } catch (err) {
        console.error("Error fetching friend requests:", err);
        throw new Error("Error fetching friend requests");
    }
}
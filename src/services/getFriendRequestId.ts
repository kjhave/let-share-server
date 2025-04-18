import { FriendRequest } from "../models/db";

export const getFriendRequestId = async (userId1: string, userId2: string): Promise<string | null> => {
    try {
        const friendRequest = await FriendRequest.findOne({
            $or: [
                { userId1, userId2 },
                { userId1: userId2, userId2: userId1 }
            ]
        });

        return friendRequest?._id.toString() || null;
    } catch (err) {
        console.error("Error fetching friend request ID:", err);
        throw err;
    }
}
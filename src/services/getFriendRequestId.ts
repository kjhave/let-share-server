import { FriendRequest } from "../models/db";
import { Types } from "mongoose";

export const getFriendRequestId = async (userId1: string, userId2: string): Promise<string | null> => {
    try {
        if (!Types.ObjectId.isValid(userId1) || !Types.ObjectId.isValid(userId2)) {
            throw new Error("Invalid user IDs provided.");
        }

        const friendRequest = await FriendRequest.findOne({
            $or: [
                { userId1, userId2 },
                { userId1: userId2, userId2: userId1 }
            ]
        }).exec();

        if (!friendRequest) {
            throw new Error("Friend request not found.");
        }

        return friendRequest?._id.toString() || null;
    } catch (err) {
        console.error("Error fetching friend request ID:", err);
        throw err;
    }
}
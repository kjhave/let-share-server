import { FriendRequest } from "../models/db";
import { Types }    from "mongoose";

export const getFriendRequestInformation = async (friendRequestId: Types.ObjectId): Promise<Object> => {
    try{
        const requestInfor = await FriendRequest.findById(friendRequestId)
            .select('userId1 userId2')
            .lean()
            .exec();

        if (!requestInfor || !requestInfor.userId1 || !requestInfor.userId2) {
            throw new Error("Friend request not found or invalid data");
        }

        return requestInfor;
    }catch(err){
        console.error("Error getting friend request information:", err);
        throw new Error("Internal server error");
    }
};
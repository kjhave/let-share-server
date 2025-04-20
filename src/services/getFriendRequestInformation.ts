import { FriendRequest } from "../models/db";
import { IFriendRequest } from "../models/interfaces";

export const getFriendRequestInformation = async (friendRequestId: string): Promise<IFriendRequest> => {
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
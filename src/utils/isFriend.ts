import { IFriend } from "../models/interfaces";
import { getFriendList } from "../services";

export const isFriend = async (userId1: string, userId2: string): Promise<boolean> => {
    const userFriends: IFriend[] = await getFriendList(userId1);
    const isFriendOfUser = userFriends.some((friend) => {
        return friend.userId.toString() === userId2.toString();
    });

    return isFriendOfUser;
};
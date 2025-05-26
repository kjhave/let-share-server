import { User } from "../models/db";
import { IFriend } from "../models/interfaces";

export const getFriendList = async (userId: string): Promise<Array<IFriend>> => {
    try {
        const user = await User.findById(userId)
            .populate({
                path: "friendList",
                select: "_id name"
            })
            .select("friendList")
            .lean()
            .exec();

        if (!user || !user.friendList) return [];

        const friends: IFriend[] = user.friendList.map((friend: any) => {
            return {
                userId: friend._id,
                name: friend.name,
            };
        });

        return friends;
    } catch (err) {
        console.error(err);
        throw new Error("Internal server error");
    }
}
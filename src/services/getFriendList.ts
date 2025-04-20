import { User } from "../models/db";
import { IFriend } from "../models/interfaces";

export const getFriendList = async (userId: string): Promise<Array<IFriend>> => {
    try {
        const user = await User.findById(userId)
            .populate({
                path: "friendList",
                populate: [
                    { path: "userId1", select: "_id name debt" },
                    { path: "userId2", select: "_id name debt" }
                ]
            })
            .select("_id friendList")
            .lean();

        if (!user || !user.friendList) return [];

        const friends: IFriend[] = user.friendList.map((friendship: any) => {
            const isUser1 = friendship.userId1._id.toString() === userId.toString();
            const friend = isUser1 ? friendship.userId2 : friendship.userId1;
            
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
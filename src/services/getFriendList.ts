import { User } from "../models/db";

export const getFriendList = async (username: string): Promise<Array<Object>> => {
    try {
        const user = await User.findOne({username: username})
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

        const friends = user.friendList.map((friendship: any) => {
            const isUser1 = friendship.userId1._id.toString() === user._id.toString();
            const friend = isUser1 ? friendship.userId2 : friendship.userId1;
            const debt: Number = isUser1 ? friendship.debt : -friendship.debt;

            return {
                _id: friend._id,
                name: friend.name,
                debt: debt
            };
        });

        return friends;
    } catch (err) {
        console.error(err);
        throw new Error("Internal server error");
    }
}
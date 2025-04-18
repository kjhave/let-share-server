import { User } from "../models/db";

export const getUserId = async (username: string): Promise<string | null> => {
    try{
        const user = await User.findOne({ username: username })
            .select('_id')
            .lean()
            .exec();
        
        return user?._id.toString() || null;
    } catch (err){
        console.error("Error getting user ID:", err);
        throw new Error("Internal server error");
    }
}
import { User } from "../models/db";

export type userInformationType = {
    userId: string;
    name: string;
    email: string;
}

export const getUserInformation = async (userId: string): Promise<userInformationType> => {
    try {
        const tmp = await User.findById(userId)
            .select('name email')
            .lean()
            .exec();
        
        if (!tmp) {
            throw new Error("User not found");
        }

        const userInfor: userInformationType = {
            userId: tmp._id.toString(),
            name: tmp.name,
            email: tmp.email
        }

        if (!userInfor) {
            throw new Error("User not found");
        }

        return userInfor;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
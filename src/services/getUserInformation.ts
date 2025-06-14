import { User } from "../models/db";

export type userInformationType = {
    userId: string;
    name: string;
    email: string;
    code: string;
}

export const getUserInformation = async ({
    userId,
    usercode,
} : {
    userId?: string;
    usercode?: string;
}): Promise<userInformationType> => {
    try {
        if (!userId && !usercode) {
            throw new Error("User ID or code must be provided");
        }

        const query = userId && userId != '' ? { _id: userId } : { $or: [{ _id: userId }, { code: usercode }] };

        const tmp = await User.findOne({ $or: [{ _id: userId }, { code: usercode }] })
            .select('name email code')
            .lean()
            .exec();
        
        if (!tmp) {
            throw new Error("User not found");
        }

        const userInfor: userInformationType = {
            userId: tmp._id.toString(),
            name: tmp.name,
            email: tmp.email,
            code: tmp.code,
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
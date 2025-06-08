import { UserStatus } from "../models/db";

export const getUserHangoutStatus = async (userId: string): Promise<{status: boolean, code: string}> => {
    try {
        const status = await UserStatus.findOne({ userId: userId }).select("hangoutStatus hangoutCode").exec();
        if  (status?.hangoutStatus === undefined || status?.hangoutCode === undefined)
            throw new Error("Error fetching user status");
        
        return {
            status: status.hangoutStatus,
            code: status.hangoutCode || "",
        };
    } catch(err){
        throw err;
    }
}
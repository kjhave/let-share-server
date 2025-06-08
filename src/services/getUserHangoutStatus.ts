import { UserStatus } from "../models/db";

export const getUserHangoutStatus = async (userId: string): Promise<boolean> => {
    try {
        const status = await UserStatus.findById({ userId: userId }).select("hangoutStatus").exec();
        if (!status?.hangoutStatus) throw new Error("Error fetching user status");
        
        return status.hangoutStatus;
    } catch(err){
        throw err;
    }
}
import { UserStatus, Hangout } from "../models/db";

export const getUserHangoutStatus = async (userId: string): Promise<{status: boolean, code: string}> => {
    try {
        const status = await UserStatus.findOne({ userId: userId }).select("hangoutStatus hangoutCode").exec();
        if  (status?.hangoutStatus === undefined || status?.hangoutCode === undefined)
            throw new Error("Error fetching user status");

        const hangout = await Hangout.findOne({ code: status.hangoutCode }).exec();
        if (!hangout || hangout.isClosed) {
            status.hangoutStatus = false;
            status.hangoutCode = "";
            await status.save();
        }

        return {
            status: status.hangoutStatus,
            code: status.hangoutCode || "",
        };
    } catch(err){
        throw err;
    }
}
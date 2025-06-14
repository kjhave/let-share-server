import { Hangout, HangoutInvitation } from "../models/db";

export const addHangoutInvitation = async ({
    userId,
    hangoutCode,
    friendId
}: {
    userId: string;
    hangoutCode: string;
    friendId: string;
}): Promise<void> => {
    try {
        const hangout = await Hangout.findOne({ code: hangoutCode });
        if (!hangout) {
            throw new Error("Hangout not found");
        }

        await HangoutInvitation.create({
            userId1: userId,
            userId2: friendId,
            hangoutId: hangout._id
        });
    } catch(err: any) {
        if (err.code === 11000){
            // Duplicate key error (unique field conflict)
            throw new Error(`already sent`);
        } else{
            throw err;
        }
    }
}
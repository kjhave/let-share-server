import { Types } from 'mongoose';
import { UserStatus, Hangout } from '../models/db'

export const leaveHangout = async (userId: string, hangoutCode: string) => {
    try {
        const userStatus = await UserStatus.findOne({ userId: userId });
        if (!userStatus) {
            throw new Error("User not found");
        }

        if (!userStatus.hangoutStatus || !userStatus.hangoutCode) {
            throw new Error("User not in Hangout");
        }

        if (userStatus.hangoutCode !== hangoutCode) {
            throw new Error("Hangout code mismatch");
        }

        const hangout = await Hangout.findOne({ code: userStatus.hangoutCode });
        if (!hangout) {
            throw new Error("Hangout not found");
        }

        if (hangout.host.toString() === userId) 
            await Hangout.updateOne(
                { code: userStatus.hangoutCode },
                { $set: { isClosed: true } }
            );

        userStatus.hangoutStatus = false;
        userStatus.hangoutCode = "";
        await userStatus.save();
    } catch (err) {
        console.error("Error leaving Hangout: ", err);
        throw err;
    }
}

export const joinHangout = async (userId: string, hangoutCode: string) => {
    try {
        const userStatus = await UserStatus.findOne({ userId: userId });
        if (!userStatus) {
            throw new Error("User not found");
        }

        if (userStatus.hangoutStatus || userStatus.hangoutCode) {
            throw new Error("User has already been in Hangout");
        }

        const hangout = await Hangout.findOne({ code: hangoutCode });
        if (!hangout || hangout.isClosed) {
            throw new Error("Hangout not found or has been closed");
        }

        if (Types.ObjectId.isValid(userId) && !hangout.participants.some(p => p.equals(userId))) {
            hangout.participants.push(new Types.ObjectId(userId));
        }

        userStatus.hangoutStatus = true;
        userStatus.hangoutCode = hangoutCode;

        await hangout.save();
        await userStatus.save();
    } catch (err) {
        console.error("Error joining Hangout: ", err);
        throw err;
    }
}
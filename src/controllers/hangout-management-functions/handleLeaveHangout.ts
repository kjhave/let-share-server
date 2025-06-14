import { Request, Response } from "express";
import { leaveHangout } from "../../services";

export const handleLeaveHangout = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.user;
    const hangoutCode = req.body.hangoutCode;
    if (!hangoutCode) {
        res.status(400).json({ message: "Invalid request" });
        return;
    }

    try {
        await leaveHangout(userId, hangoutCode);
        res.status(200).json({ message: "Left Hangout successfully" });
    } catch (err: any) {
        if (err.message === "User not in Hangout" || err.message === "User not found") {
            res.status(400).json({ message: "Invalid request" });
            console.log("Error leaving Hangout: ", err.message);
            return;
        }

        res.status(500).json({ message: "Internal server error" });
        console.error("Error leaving Hangout: ", err);
    }
}
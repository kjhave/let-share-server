import { Request, Response } from 'express';
import { getUserHangoutStatus } from '../../services';

export const handleGetUserHangoutStatus = async (req: Request, res: Response) => {
    const userId = res.locals.user;

    try {
        const status = await getUserHangoutStatus(userId);
        res.status(200).json({
            message: "Get Hangout status successfully",
            status: status.status,
            code: status.code
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error getting hangout status: ", err);
    }
}
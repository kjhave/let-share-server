import { Request, Response } from 'express';
import { getHangoutInvitations, joinHangout } from '../../services';

export const handleJoinHangoutWithCode = async (req: Request, res: Response) => {
    const user = res.locals.user;
    const { hangoutCode } = req.body;

    if (!hangoutCode){
        res.status(400).json({ message: "Invalid request"});
        return;
    }

    try {
        await joinHangout(user, hangoutCode);
        res.status(200).json({ message: "resolved reply invitation successfully" });
    } catch(err){
        console.log("Error replying hangout invitation: ", err);
        res.status(500).json({ message:"Internal server error"});
    }
}
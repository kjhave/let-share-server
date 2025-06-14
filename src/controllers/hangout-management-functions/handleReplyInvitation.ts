import { Request, Response } from 'express';
import { getHangoutInvitations, joinHangout } from '../../services';

export const handleReplyInvitation = async (req: Request, res: Response) => {
    const user = res.locals.user;
    const { senderId, hangoutCode, type } = req.body;

    if (!hangoutCode || !senderId || !type){
        res.status(400).json({ message: "Invalid request"});
        return;
    }

    try {
        if (type === 'accept'){
            const invitation = await getHangoutInvitations(user, senderId);
            if (invitation.length === 0){
                res.status(400).json({ message: 'Invitation not found or expired' });
                return;
            }

            await joinHangout(user, hangoutCode);
        }
        res.status(200).json({ message: "resolved reply invitation successfully" });
    } catch(err){
        console.log("Error replying hangout invitation: ", err);
        res.status(500).json({ message:"Internal server error"});
    }
}
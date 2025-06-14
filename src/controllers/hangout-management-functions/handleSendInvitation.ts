import { Request, Response } from 'express';
import { addHangoutInvitation } from '../../services';

export const handleSendInvitation = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.user;
    const { hangoutCode, friendId } = req.body;

    if (!hangoutCode || !friendId) {
        res.status(400).json({ message: "Invalid Request" });
        return;
    }

    try {
        if (userId === friendId) {
            res.status(400).json({ message: "You cannot send a hangout invitation to yourself." });
            return;
        }

        await addHangoutInvitation({
            userId: userId,
            hangoutCode: hangoutCode,
            friendId: friendId
        });

        res.status(200).json({ message: "Invitation sent successfully." });
    } catch(err: any) {
        if (err.message.includes("already sent")) {
            res.status(400).json({ message: "Invitation already sent to this user." });
            return;
        }

        console.error("Error sending invitation:", err);
        res.status(500).json({ message: "Internal server error." });
    }
}
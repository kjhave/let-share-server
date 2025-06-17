import { Request, Response } from 'express';
import { getHangoutInfo, getUserHangoutStatus, HangoutInfoType } from '../../services';

export const handleGetHangoutParticipants = async (req: Request, res: Response) => {
    const user = res.locals.user;

    try{
        const status = await getUserHangoutStatus(user);
        if (!status || !status.status){
            res.status(400).json({ message: "User are not in a hangout or it expired" });
            return;
        }

        const hangout: HangoutInfoType|null = await getHangoutInfo(status.code);
        if (!hangout){
            res.status(500).json({ message: "Internal server Error" });
            return;
        }

        res.status(200).json({
            message: "Successfully",
            participants: hangout.participants,
        });
    } catch(err){
        console.log("Error getting hangout participant list: ", err);
        res.status(500).json({ message: "Failed to getting hangout participants "});
    }
}
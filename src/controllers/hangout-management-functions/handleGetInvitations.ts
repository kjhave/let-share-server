import { Request, Response } from 'express';
import { getHangoutInvitations, type HangoutInvitation } from '../../services';

export const handleGetInvitations = async (req: Request, res: Response) => {
    const userId = res.locals.user;
    try {
        const data: HangoutInvitation[] = await getHangoutInvitations(userId);

        if (data){
            res.status(200).json(data);
        } else {
            throw new Error("Unknown error, data null");
        }
    } catch(err){
        res.status(500).json({ message: "Internal server error "});
        console.log("Error getting hangout invitation: ", err);
    }
}
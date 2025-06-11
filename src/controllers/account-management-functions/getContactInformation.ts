import { Request, Response } from 'express';
import { getUserInformation } from '../../services';

export const getContactInformation = async (req: Request, res: Response): Promise<void> => {
    const usercode = req.params.usercode;
    if (!usercode) {
        res.status(400).json({ message: "Missing usercode" });
        return;
    }
    
    try {
        const user = await getUserInformation(usercode);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const userContact = {
            userId: user.userId,
            name: user.name,
            code: user.code
        }

        res.status(200).json(userContact);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
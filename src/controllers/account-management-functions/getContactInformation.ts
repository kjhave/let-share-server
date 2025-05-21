import { Request, Response } from 'express';
import { getUserInformation } from '../../services';

export const getContactInformation = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    if (!userId) {
        res.status(400).json({ message: "Missing userId" });
        return;
    }
    
    try {
        const user = await getUserInformation(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const userContact = {
            name: user.name
        }

        res.status(200).json(userContact);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
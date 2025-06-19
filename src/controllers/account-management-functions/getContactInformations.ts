import { Request, Response } from 'express';
import { getUserInformation } from '../../services';

export const getContactInformations = async (req: Request, res: Response): Promise<void> => {
    const userIds: string[] = req.body.userIds;
    if (!userIds) {
        res.status(400).json({ message: "Missing usercode" });
        return;
    }
    
    try {
        const users = await Promise.all(
            userIds.map(userId => getUserInformation({ userId: userId }))
        );

        if (!users) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const userContacts = users.map(user => {
            return {
                userId: user.userId,
                name: user.name,
                code: user.code
            }
        });

        res.status(200).json(userContacts);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
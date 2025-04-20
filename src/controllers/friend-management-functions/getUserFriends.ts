import { Request, Response } from 'express';
import { getFriendList } from '../../services';

export const getUserFriends = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.user;
    try {
        const friends = await getFriendList(userId);
        res.status(200).json(friends);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
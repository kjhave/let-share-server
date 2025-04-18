import { Request, Response } from 'express';
import { getFriendList } from '../../services/getFriendList';
import { get } from 'http';

export const getUserFriends = async (req: Request, res: Response): Promise<void> => {
    const user = res.locals.user;
    try {
        const friends = await getFriendList(user);
        res.status(200).json(friends);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
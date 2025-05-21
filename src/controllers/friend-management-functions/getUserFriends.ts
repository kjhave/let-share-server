import { Request, Response } from 'express';
import { getFriendList } from '../../services';
import { IFriend } from '../../models/interfaces';

export const getUserFriends = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.user;
    try {
        const data: IFriend[] = await getFriendList(userId);

        const friends = data.map((friend) => {
            return {
                id: friend.userId,
                name: friend.name
            }
        });
        
        res.status(200).json(friends);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
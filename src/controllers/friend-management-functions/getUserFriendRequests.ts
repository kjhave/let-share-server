import { Request, Response } from 'express';
import { getFriendRequestList } from '../../services';

export const getUserFriendRequests = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.user;
    try {
        const friendRequests = await getFriendRequestList(userId);
        res.status(200).json(friendRequests);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching friend requests', err });
    }
}
import { Request, Response } from 'express';
import { getFriendRequestList } from '../../services/getFriendRequestList';

export const getUserFriendRequests = async (req: Request, res: Response): Promise<void> => {
    const user = res.locals.user;
    try {
        // Simulate fetching friend requests from a database
        const friendRequests = await getFriendRequestList(user);
    
        res.status(200).json(friendRequests);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching friend requests', err });
    }
}
import { FriendRequest } from '../models/db';

export const removeFriendRequest = async (friendRequestId: string): Promise<void> => {
    try {
        await FriendRequest.findByIdAndDelete(friendRequestId).exec();
    } catch (err) {
        console.error('Error removing friend request:', err);
        throw err;
    }
}
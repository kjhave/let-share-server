import { Friend } from '../models/db';

export const addNewFriend = async (userId1: string, userId2: string): Promise<void> => {
    try {
        await Friend.create({ userId1, userId2 });
    } catch (err) {
        console.error('Error adding new friend:', err);
        throw err;
    }
}
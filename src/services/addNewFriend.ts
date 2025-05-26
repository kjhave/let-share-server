import { User } from '../models/db';
import mongoose from 'mongoose';

export const addNewFriend = async (userId1: string, userId2: string): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        await User.updateOne(
            { _id: userId1 },
            { $addToSet: { friendList: userId2 } },
            { session }
        );
        await User.updateOne(
            { _id: userId2 },
            { $addToSet: { friendList: userId1 } },
            { session }
        );

        await session.commitTransaction();
    } catch (err) {
        await session.abortTransaction();
        console.error('Error adding new friend:', err);
        throw err;
    } finally {
        session.endSession();
    }
};

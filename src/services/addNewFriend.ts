import { Friend, User } from '../models/db';
import mongoose from 'mongoose';

export const addNewFriend = async (userId1: string, userId2: string): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const newFriendship = await Friend.create([{ userId1, userId2 }], { session });

        const friendshipId = newFriendship[0]._id;

        await User.updateOne(
            { _id: userId1 },
            { $addToSet: { friendList: friendshipId } },
            { session }
        );
        await User.updateOne(
            { _id: userId2 },
            { $addToSet: { friendList: friendshipId } },
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

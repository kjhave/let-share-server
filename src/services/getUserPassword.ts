import { User } from '../models/db';

export const getUserPassword = async (username: string): Promise<string | null> => {
    const res = await User.findOne({ username: username }, { password : 1 }).lean();
    return res?.password || null;
};
import { User } from '../models/db/index';

export const getUserPassword = async (username: string): Promise<string | null> => {
    const res = await User.findOne({ username: username }, { password : 1 });
    return res?.password || null;
};
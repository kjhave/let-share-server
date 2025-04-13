import { User } from '../models/db/index';

export default async function getUserPassword(username: string): Promise<string | null> {
    const res = await User.findOne({ where: { username } }).select('password');
    return res?.password || null;
};
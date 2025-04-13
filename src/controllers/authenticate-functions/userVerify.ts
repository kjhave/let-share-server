import bcrypt from 'bcryptjs';
import getUserPassword from '../../services/getUserPassword';

export const userVerify = async (username: string, password: string): Promise<void>  => {
    try {
        const hashedPassword = await getUserPassword(username);
        if (!hashedPassword) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, hashedPassword);
    } catch (err) {
        throw new Error("User verification failed");
    }
};
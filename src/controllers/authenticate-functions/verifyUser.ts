import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { getUserPassword, getUserId  } from '../../services';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables.");
}

export const verifyUser = async (req: Request, res: Response): Promise<void>  => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await getUserPassword(username);
        if (!hashedPassword) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (!isMatch) {
            res.status(401).json({ message: "Wrong password" });
            return;
        }

        const userId = await getUserId(username);
        const payload = { userId };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.error(err); // Log the error for debugging
    }
};
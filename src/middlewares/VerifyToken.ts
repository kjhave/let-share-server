import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables.");
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded !== 'object' || !('userId' in decoded)) {
            res.status(401).json({ message: "Invalid or expired token." });
            return;
        }

        res.locals.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};
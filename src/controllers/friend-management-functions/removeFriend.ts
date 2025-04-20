import { Request, Response } from "express";

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
    res.status(500).json({ message: "remove-friend function has not available yet" });
};
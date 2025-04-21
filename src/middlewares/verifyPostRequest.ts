import { Request, Response, NextFunction } from "express";

export const verifyPostRequest = (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === "POST" && (!req.body || Object.keys(req.body).length === 0)) {
        res.status(400).json({ error: 'Missing request body' });
        return;
    }
    next();
};
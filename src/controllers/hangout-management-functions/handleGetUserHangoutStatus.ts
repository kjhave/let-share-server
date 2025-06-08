import { Request, Response } from 'express';
import { getUserHangoutStatus } from '../../services';

export const handleGetUserHangoutStatus = async (req: Request, res: Response) => {
    const userCheck = req.params.userId;

    if (!userCheck){
        res.status(400).json({ message: "Invalid request"});
        return;
    }

    try {

    } catch(err){
        res.status(500).json({ message: "Internal server error"});
        console.log("Error getting user hangout status", err);
    }
}
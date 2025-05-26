import { Request, Response } from "express";
import { getFinanciallyLinkedSet } from "../../services";

export const getFinanciallyLinkedUserList = async (req: Request, res: Response): Promise<void> => {
    const user = res.locals.user;

    if (!user){
        res.status(400).json({ message: "Invalid request" });
    }

    try {
        const data = await getFinanciallyLinkedSet(user);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}
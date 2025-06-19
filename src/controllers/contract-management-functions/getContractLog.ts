import { Request, Response } from "express";
import { getUserContractList } from "../../services";

export const getContractLog = async (req: Request, res: Response): Promise<void> => {
    const user = res.locals.user;

    try {
        const contracts = await getUserContractList(user);
        res.status(200).json(contracts);
        
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}
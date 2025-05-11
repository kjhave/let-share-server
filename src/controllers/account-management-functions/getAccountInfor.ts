import { Request, Response } from "express";
import { getUserInformation } from "../../services";

export const getAccountInfor = async (req: Request, res: Response): Promise<void> => {
    try{
        const userId = res.locals.user;
        if (!userId) {
            res.status(400).json({ message: "Invalid request" });
            return;
        }

        const userInfor = await getUserInformation(userId);
        if (!userInfor) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        res.status(200).json(userInfor);
    } catch (err) {
        console.log(err);
        throw new Error("Error while getting account information");
    }
};
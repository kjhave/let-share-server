import { Request, Response } from "express";
import { getUserHangoutStatus, getHangoutContractStatus } from "../../services";

export const handleGetContractStatus = async (req: Request, res: Response): Promise<void> => {
    const user = res.locals.user;
    const hangoutCode = req.body.hangoutCode;

    if (!hangoutCode){
        res.status(400).json({ message: "Invalid request" });
        return;
    }

    try {
        const hangout = await getUserHangoutStatus(user);

        if (!hangout.status || hangout.code !== hangoutCode){
            res.status(400).json({ message: "Invalid request" });
            return;
        }

        const contracts = await getHangoutContractStatus(hangoutCode);
        
        res.status(200).json({
            message: "successfully",
            data: {
                contracts: contracts,
            }
        });

    } catch (err: any) {
        if (err.message === "hangout not found"){
            res.status(400).json({ message: "Invalid request" });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        console.log("Error making contract: ", err);
    }
}
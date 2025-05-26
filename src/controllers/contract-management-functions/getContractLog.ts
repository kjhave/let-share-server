import { Request, Response } from "express";

export const getContractLog = async (req: Request, res: Response): Promise<void> => {
    const user = res.locals.user;
    const contractType = res.locals.contractType;

    try {
        // if (contractType === "personal"){
        //     const personalContractLogs = await fetchPersonalContractLogs(user);
        //     res.status(200).json({ contractLogs: personalContractLogs });
        // } else if (contractType === "group"){
        //     const groupId = req.body.groupId;
        //     if (!groupId){
        //         res.status(400).json({ message: "Invalid request" });
        //         return;
        //     }
        //     const groupContractLogs = await fetchGroupContractLogs(user);
        //     res.status(200).json({ contractLogs: groupContractLogs });
        // } else {
        //     res.status(400).json({ message: "Invalid request" });
        // }
        // res.status(200).json({ message: "Contract logs fetched successfully" });
        res.status(200).json({ message: "Contract logs is underdevelopment" });
        
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}
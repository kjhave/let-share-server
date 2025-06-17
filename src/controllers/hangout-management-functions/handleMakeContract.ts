import { Request, Response } from "express";
import { isIContractSplitter } from "../../validations";
import { IContractSplitter } from "../../models/interfaces";
import { addContractLog } from "../../services/addContractLog";
import { getHangoutInfo } from "../../services";

const totalAmount = (contractSplitter: IContractSplitter) => {
    const res = contractSplitter.itemList.reduce((sum: number, item: {itemName: string, itemPrice: number}) => {
        return sum + item.itemPrice;
    }, 0);

    return res;
}

export const handleMakeContract = async (req: Request, res: Response): Promise<void> => {
    const user = res.locals.user;
    const {
        contractName,
        contractDescription,
        contractPayer,
        contractSplitters,
        contractTotalCost,
        hangoutCode
    } = req.body;

    if (!contractPayer || !contractTotalCost || !hangoutCode){
        res.status(400).json({ message: "Invalid request" });
        return;
    }

    const isValidContractSplitters = Array.isArray(contractSplitters)
                                    && contractSplitters.length > 0
                                    && contractSplitters.every(isIContractSplitter);
    
    if (!isValidContractSplitters) {
        res.status(400).json({ message: "Invalid request" });
        return;
    }

    try {
        const hangout = await getHangoutInfo(hangoutCode);
        if (!hangout){
            res.status(400).json({ message: "Invalid request" });
            return;
        }

        const idList = hangout.participants.map(p => p.id);
        
        if (contractSplitters.some(p => {
            return !idList.includes(p.userId);
        })){
            res.status(400).json({ message: "Invalid request" });
            return;
        }

        let total: number = 0;
        contractSplitters.forEach((splitter: IContractSplitter) => {
            total += totalAmount(splitter);
        });

        if (total !== contractTotalCost){
            res.status(400).json({ message: "Invalid request" });
            return;
        }

        await addContractLog({
            contract: {
                contractName: contractName || "",
                contractDescription: contractDescription || "",
                contractPayer: contractPayer,
                contractSplitters: contractSplitters,
                contractTotalCost: contractTotalCost
            },
            hangoutCode: hangoutCode
        });

        res.status(200).json({ message: "Successfully" });
    } catch (err: any) {
        if (err.message === "hangout not found"){
            res.status(400).json({ message: "Invalid request" });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        console.log("Error making contract: ", err);
    }
}
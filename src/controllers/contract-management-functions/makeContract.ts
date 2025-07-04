//Note: for contract making, currently, you are only allowed to make contract with the user you are already friends with or  the user in the same group as you
import { Request, Response } from "express";
import { isIContractSplitter } from "../../validations";
import { IContractSplitter, IRelationship } from "../../models/interfaces";
import { addFinancialAmount } from "../../services";
import { addContractLog } from "../../services/addContractLog";

type financialRelationshipType = IRelationship & {
    amount: number
}

const totalAmount = (contractSplitter: IContractSplitter) => {
    const res = contractSplitter.itemList.reduce((sum: number, item: {itemName: string, itemPrice: number}) => {
        return sum + item.itemPrice;
    }, 0);

    return res;
}

export const makeContract = async (req: Request, res: Response): Promise<void> => {
    const user = res.locals.user;
    const {
        contractName,
        contractDescription,
        contractPayer,
        contractSplitters,
        contractTotalCost
    } = req.body;

    if (!contractPayer || !contractTotalCost){
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
        let total: number = 0;
        const updateFinancialRelationship: financialRelationshipType[] = contractSplitters.map((splitter: IContractSplitter) => {
            const amount = totalAmount(splitter);
            total += amount;
            return {
                userId1: contractPayer,
                userId2: splitter.userId,
                amount: amount
            }
        });

        if (total !== contractTotalCost){
            res.status(400).json({ message: "Invalid request" });
            return;
        }

        if (updateFinancialRelationship.length === 1)
            await addFinancialAmount(updateFinancialRelationship[0]);
        else
            await addFinancialAmount(updateFinancialRelationship);

        await addContractLog({
            contract: {
                contractName: contractName || "",
                contractDescription: contractDescription || "",
                contractPayer: contractPayer,
                contractSplitters: contractSplitters,
                contractTotalCost: contractTotalCost
            }
        });

        res.status(200).json({ message: "Successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error making contract: ", err);
    }
}
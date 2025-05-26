//Note: for contract making, currently, you are only allowed to make contract with the user you are already friends with or  the user in the same group as you
import { Request, Response } from "express";
import { isIContractSplitter } from "../../validations";
import { getFinancialRelationship } from "../../services";
import { IContractSplitter, IRelationship } from "../../models/interfaces";
import { addFinancialAmount } from "../../services/addFinancialAmount";

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
    const contractPayer = req.body.contractPayer;
    const contractSplitters = req.body.contractSplitters;

    const isValidContractSplitters = Array.isArray(contractSplitters)
                                    && contractSplitters.length > 0
                                    && contractSplitters.every(isIContractSplitter);
    
    if (!isValidContractSplitters) {
        res.status(400).json({ message: "Invalid request" });
        return;
    }

    try {

        for (const splitter of contractSplitters){
            const relationship: IRelationship = {
                userId1: contractPayer,
                userId2: splitter.userId
            }
            const financialRelationship: financialRelationshipType|null = await getFinancialRelationship(relationship);

            // if (financialRelationship === null){
            //     addFinancialAmount({
            //         userId1: contractPayer,
            //         userId2: splitter.userId,
            //         amount: totalAmount(splitter)
            //     }, true);
            // }
            // else{
            //     if (financialRelationship.userId1 === contractPayer)
            //         financialRelationship.amount += totalAmount(splitter);
            //     else
            //         financialRelationship.amount -= totalAmount(splitter);

            //     addFinancialAmount(financialRelationship, false);
            // }
        }

        res.status(200).json({ message: "Successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}
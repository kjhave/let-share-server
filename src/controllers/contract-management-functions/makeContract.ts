//Note: for contract making, currently, you are only allowed to make contract with the user you are already friends with or  the user in the same group as you
import { Request, Response } from "express";
import { isFriend } from "../../utils";
import { isIContractSplitter } from "../../validations";
import { getFinancialRelationship } from "../../services";
import { IContractSplitter, IRelationship } from "../../models/interfaces";
import { addFinancialAmount } from "../../services/addFinancialAmount";

type financialRelationshipType = IRelationship & {
    amount: number
}

const totalAmount = (contractSplitter: IContractSplitter){
    const res = contractSplitter.itemList.reduce((sum: number, item: {itemName: string, itemPrice: number}) => {
        return sum + item.itemPrice;
    }, 0);

    return res;
}

export const makeContract = async (req: Request, res: Response): Promise<void> => {
    const user = res.locals.user;
    const contractType = res.locals.contractType;
    const contractPayer = req.body.contractPayer;
    const contractSplitters = req.body.contractSplitters;

    const isValidContractSplitters = Array.isArray(contractSplitters)
                                    && contractSplitters.length > 0
                                    && contractSplitters.every(isIContractSplitter);
    
    if (!isValidContractSplitters) {
        res.status(400).json({ message: "Invalid request" });
    }    

    if (user !== contractPayer){
        res.status(400).json({ message: "Invalid request" });
        return;
    }

    try {
        if (contractType === "personal"){
            if (contractSplitters.length !== 1) {
                res.status(400).json({ message: "Invalid request" });
            }

            const contractSplitter = contractSplitters[0];
            const isAlreadyFriend = isFriend(contractPayer, contractSplitter.user);

            if (!isAlreadyFriend) {
                res.status(400).json({ message: "You are not friends with this user" });
                return;
            }

            const relationship: IRelationship = {
                userId1: contractPayer,
                userId2: contractSplitter
            }
            const financialRelationship: financialRelationshipType|null = await getFinancialRelationship(relationship);

            if (financialRelationship === null){
                addFinancialAmount({
                    userId1: contractPayer,
                    userId2: contractSplitter,
                    amount: totalAmount(contractSplitter)
                }, true);
            }
            else{
                if (financialRelationship.userId1 === contractPayer)
                    financialRelationship.amount += totalAmount(contractSplitter);
                else
                    financialRelationship.amount -= totalAmount(contractSplitter);

                addFinancialAmount(financialRelationship, false);
            }
            
            res.status(200).json({ message: "Contract created successfully" });
        } else if (contractType === "group"){
            res.status(500).json({ message: "Group contract creation is currently under development" });
            // const groupId = req.body.groupId;
            // if (!groupId) {
            //     res.status(400).json({ message: "Invalid request" });
            //     return;
            // }
        } else{
            res.status(400).json({ message: "Invalid request" });
            return;
        }

    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}
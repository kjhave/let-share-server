import { FinancialRelationship } from "../models/db";
import { IRelationship } from "../models/interfaces";

type financialRelationshipType = IRelationship & {
    amount: number
}

export const addFinancialAmount = async (relationship: financialRelationshipType, __new__edge: boolean): Promise<void> => {
    try {
        if (relationship.userId1 > relationship.userId2){
            const tmp = relationship.userId1;
            relationship.userId1 = relationship.userId2;
            relationship.userId2 = tmp;
            relationship.amount = -relationship.amount;
        }

        if (__new__edge){
            if (typeof relationship !== 'number')   throw new Error("Error updating financial amount");
            await FinancialRelationship.create(relationship);
        }
        else{
            await FinancialRelationship.updateOne({
                    userId1: relationship.userId1,
                    userId2: relationship.userId2
                }, {
                    $set: {
                        amount: relationship.amount
                    }
                }
            );
        }
        
    } catch (error) {
        console.error("Error updating financial amount:", error);
        throw error;
    }
}
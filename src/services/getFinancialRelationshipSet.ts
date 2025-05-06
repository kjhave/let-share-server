import { FinancialRelationship } from "../models/db";
import { IRelationship } from "../models/interfaces";
import { isRelationship } from "../validations/isRelationshipSet";

type financialRelationshipType = IRelationship & {
    amount: number
}

export const getFinancialRelationship = async (relationship: IRelationship): Promise<financialRelationshipType|null> => {
    try {
        if (relationship.userId1 > relationship.userId2){
            const tmp = relationship.userId1;
            relationship.userId1 = relationship.userId2;
            relationship.userId2 = tmp;
        }

        const res:financialRelationshipType = await FinancialRelationship
                            .findOne({userId1: relationship.userId1, userId2: relationship.userId2})
                            .projection({
                                userId1: 1,
                                userId2: 1,
                                amount: 1
                            })
                            .lean();
        if (!isRelationship(res))   return null;
        return res;
    } catch (error) {
        console.error("Error fetching financial relationship:", error);
        throw error;
    }
}
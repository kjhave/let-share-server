import { FinancialRelationship } from "../models/db";
import { IRelationship } from "../models/interfaces";

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

        const res: financialRelationshipType | null = await FinancialRelationship
                            .findOne({userId1: relationship.userId1, userId2: relationship.userId2})
                            .select("userId1 userId2 amount")
                            .lean<financialRelationshipType>();

        if (!res)   return null;
        return res;
    } catch (error) {
        console.error("Error fetching financial relationship:", error);
        throw error;
    }
}

type financialRelationshipFullType = {
    amount: number,
    userId1: {
        _id: string,
        name: string
    },
    userId2: {
        _id: string,
        name: string
    }
}

type financialLinkedUserType = {
    userId: string,
    name: string,
    amount: number
}

export const getFinanciallyLinkedSet = async (userId: string): Promise<financialLinkedUserType[]> => {
    try {
        const relationships = await FinancialRelationship.find({
            $or: [{ userId1: userId }, { userId2: userId }],
        })
            .select("userId1 userId2 amount")
            .populate([
                { path: "userId1", select: "_id name" },
                { path: "userId2", select: "_id name" },
            ])
            .lean<financialRelationshipFullType[]>()
            .exec();
        
        if (!relationships) return [];

        const results = relationships.map(rel => {
            const isUser1 = rel.userId1._id.toString() === userId;
            const otherUser = isUser1 ? rel.userId2 : rel.userId1;
            const amount = isUser1 ? rel.amount : -rel.amount;

            return {
                userId: otherUser._id,
                name: otherUser.name,
                amount: amount
            };
        });

        return results;
    }
    catch (error){
        console.error("Error fetching financial linked users:", error);
        throw error;
    }
}
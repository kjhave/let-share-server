import { FinancialRelationship } from "../models/db";
import { IRelationship } from "../models/interfaces";
import { startSession } from "mongoose";

type IFinancialRelationship = IRelationship & {
    amount: number
}

const isIFinancialRelationship = (variable: any): variable is IFinancialRelationship => {
    return (
        variable && typeof variable === "object"
        &&  typeof variable.userId1 === "string"
        &&  typeof variable.userId2 === "string"
        &&  typeof variable.amount  === "number"
    );
}

export async function addFinancialAmount(relationship: IFinancialRelationship): Promise<void>;
export async function addFinancialAmount(relationships: IFinancialRelationship[]): Promise<void>;
export async function addFinancialAmount(relationship: any): Promise<void>{
    if (isIFinancialRelationship(relationship))
        handleOne(relationship);
    else
        handleSet(relationship);
}

const handleOne = async (relationship: IFinancialRelationship): Promise<void> => {
    let { userId1, userId2, amount } = relationship;

    const id1Str = userId1.toString();
    const id2Str = userId2.toString();

    // Normalize order
    if (id1Str > id2Str) {
        [userId1, userId2] = [userId2, userId1];
        amount = -amount;
    }

    try {
        await FinancialRelationship.updateOne(
            { userId1, userId2 },
            { $inc: { amount } },
            { upsert: true }
        );
    } catch(err) {
        console.log("Error adding financial relationship:", err);
        throw err;
    }
}

const handleSet = async (relationships: IFinancialRelationship[]): Promise<void> => {
    const session = await startSession();
    session.startTransaction();

    try {
        const operations = relationships.map((rel) => {
            let { userId1, userId2, amount } = rel;

            const id1Str = userId1.toString();
            const id2Str = userId2.toString();

            // Normalize order
            if (id1Str > id2Str) {
                [userId1, userId2] = [userId2, userId1];
                amount = -amount;
            }

            return {
                updateOne: {
                    filter: { userId1, userId2 },
                    update: { $inc: { amount } },
                    upsert: true,
                },
            };
        });

        await FinancialRelationship.bulkWrite(operations, { session });

        await session.commitTransaction();
        session.endSession();
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error('Bulk financial relationship update failed:', err);
        throw err;
    }
}
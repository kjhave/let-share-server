import { FinancialRelationship, Hangout } from "../models/db";
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

export const addHangoutContractsAndRelations = async ({
    hangoutCode,
    relations,
    submitContracts,
}: {
    hangoutCode: string,
    relations: IFinancialRelationship[],
    submitContracts: string[], 
}): Promise<void> => {
    const session = await startSession();
    session.startTransaction();

    try{
        if (relations.some(relation => !isIFinancialRelationship(relation)))
            throw Error('wrong format');
            
        const operations = relations
            .filter(rel => rel.userId1.toString() !== rel.userId2.toString())
            .map((rel) => {
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

        const hangout = await Hangout.findOne({ code: hangoutCode });
        if (!hangout)
            throw Error("hangout not found");

        hangout.contracts.forEach(p => {
            if (p?.contract && submitContracts.includes(p.contract.toString())) {
                p.isSubmitted = true;
            }
        });
        
        await hangout.save({ session });


        await session.commitTransaction();
        session.endSession();
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error updating financial relationship', err);
        throw err;
    }
}
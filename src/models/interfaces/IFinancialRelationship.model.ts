import { Types } from "mongoose";

export interface IFinancialRelationship{
    userId1: Types.ObjectId,
    userId2: Types.ObjectId,
    amount: Number
};
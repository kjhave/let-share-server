import { Types } from "mongoose";

export interface IRelationship{
    userId1: Types.ObjectId,
    userId2: Types.ObjectId
};
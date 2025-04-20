import { Document } from "mongoose";

export interface IFriendRequest extends Document {
    userId1: string;
    userId2: string;
    createdAt: Date;
    updatedAt: Date;
}
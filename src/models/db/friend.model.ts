import { Schema } from "mongoose";

export const FriendSchema = new Schema({
    userId1: { type: Schema.Types.ObjectId, ref: "User" },
    userId2: { type: Schema.Types.ObjectId, ref: "User" },
    debt: { type: Number, default: 0 }
});
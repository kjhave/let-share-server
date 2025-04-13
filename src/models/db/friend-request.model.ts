import { Schema } from "mongoose";

export const FriendRequestSchema = new Schema({
    userId1: { type: Schema.Types.ObjectId, ref: "User" },
    userId2: { type: Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
});
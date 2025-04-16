import { Schema } from "mongoose";

export const FriendRequestSchema = new Schema({
    userId1: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userId2: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
    timestamps: true
});
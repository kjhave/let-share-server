import { Schema } from "mongoose";

export const UserStatusSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", require: true },
    hangoutStatus: { type: Boolean, default: false }
}, {
    timestamps: true,
});
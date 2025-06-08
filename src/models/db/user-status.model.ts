import { Schema } from "mongoose";

export const UserStatusSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", require: true, unique: true },
    hangoutStatus: { type: Boolean, default: false },
    hangoutCode: { type: String, default: "" },
}, {
    timestamps: true,
});
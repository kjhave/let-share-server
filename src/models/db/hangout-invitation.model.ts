import { Schema } from "mongoose";

export const HangoutInvitationSchema = new Schema({
    userId1: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userId2: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hangoutId: { type: Schema.Types.ObjectId, ref: "Hangout", required: true },
    createdA: {
        type: Date,
        default: Date.now,
        expires: 60 * 15
    }
}, {
    timestamps: true,
});
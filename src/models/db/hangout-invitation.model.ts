import { Schema } from "mongoose";

export const HangoutInvitationSchema = new Schema({
    userId1: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userId2: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hangoutId: { type: Schema.Types.ObjectId, ref: "Hangout", required: true },
    expireAt: {
        type: Date,
        default: () => new Date(Date.now() + 15 * 60 * 1000),
        expires: 0
    }
}, {
    timestamps: true,
});

HangoutInvitationSchema.index({ userId1: 1, userId2: 1 }, { unique: true });
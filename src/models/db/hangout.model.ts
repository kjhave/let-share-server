import { Schema } from "mongoose";

export const HangoutSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    participants: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
      default: []
    },
    host: { type: Schema.Types.ObjectId, ref: "User", required: true },
    code: { type: String, required: true },
    contracts: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "ContractLog"
        }],
        default: []
    },
}, {
    timestamps: true
});

HangoutSchema.index({ code: 1 }, { unique: true });
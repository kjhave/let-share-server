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
            contract: {
                type: Schema.Types.ObjectId,
                ref: "ContractLog"
            },
            isSubmitted: {
                type: Boolean,
                default: false
            }
        }],
        default: []
    },
    relation: {
        type: [{
            userId1: { type: Schema.Types.ObjectId, ref: "User", require: true},
            userId2: { type: Schema.Types.ObjectId, ref: "User", require: true},
            amount: { type: Number, require: true },
        }],
        default: []
    },
    isClosed: { type: Boolean, default: false },
}, {
    timestamps: true
});

HangoutSchema.index({ code: 1 }, { unique: true });
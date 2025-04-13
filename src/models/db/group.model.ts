import { Schema } from "mongoose";

export const GroupSchema = new Schema({
    groupName: { type: String, required: true },
    groupMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    groupOwner: { type: Schema.Types.ObjectId, ref: "User" },
    commonBills: [{ type: Schema.Types.ObjectId, ref: "Bill" }]
}, {
    timestamps: true,
});
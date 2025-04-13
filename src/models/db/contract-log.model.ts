import { Schema } from "mongoose";

export const ContractLogSchema = new Schema({
    contractName: { type: String, required: true },
    contractDescription: { type: String, required: false, default: "" },
    contractItems: [{ itemName: String, itemPrice: Number }],
    contractPayer: { type: Schema.Types.ObjectId, ref: "User" },
    contractSplitter: { type: Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true,
});

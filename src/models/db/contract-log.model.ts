import { Schema } from "mongoose";

export const ContractLogSchema = new Schema({
    contractName: { type: String, required: true },
    contractDescription: { type: String, required: false, default: "" },
    contractTotalCost: { type: Number, required: true, default: 0 },
    contractPayer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contractSplitter: { type: [{ user: { type: Schema.Types.ObjectId, ref: "User" }, itemList: [{ itemName: String, itemPrice: Number}] }], required: true }
}, {
    timestamps: true,
});

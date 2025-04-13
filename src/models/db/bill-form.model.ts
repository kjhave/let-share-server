import { Schema } from "mongoose";

export const BillFormSchema = new Schema({
    billName: { type: String, required: true },
    billDescription: { type: String, required: false, default: "" },
    billItems: [{ itemName: String, itemPrice: Number }]
});
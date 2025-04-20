import { Document } from "mongoose";
import { Types } from "mongoose";
import { IContractSplitter } from "./IContractSplitter.model";

export interface IContractLog extends Document {
    contractName: string;
    contractDescription?: string;
    contractTotalCost: number;
    contractPayer: Types.ObjectId;
    contractSplitters: IContractSplitter[];
    createdAt?: Date;
    updatedAt?: Date;
}
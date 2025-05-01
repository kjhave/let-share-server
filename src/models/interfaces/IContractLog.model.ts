import { Types } from "mongoose";
import { IContractSplitter } from "./IContractSplitter.model";

export interface IContractLog{
    contractName: string;
    contractDescription?: string;
    contractTotalCost: number;
    contractPayer: Types.ObjectId;
    contractSplitters: IContractSplitter[];
    createdAt?: Date;
    updatedAt?: Date;
}
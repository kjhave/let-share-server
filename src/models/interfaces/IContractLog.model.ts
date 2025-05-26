import { IContractSplitter } from "./IContractSplitter.model";

export interface IContractLog{
    contractName: string;
    contractDescription?: string;
    contractTotalCost: number;
    contractPayer: string;
    contractSplitters: IContractSplitter[];
    createdAt?: Date;
    updatedAt?: Date;
}
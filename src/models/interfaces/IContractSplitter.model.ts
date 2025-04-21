import { Types } from "mongoose";

export interface IContractSplitter{
    userId: Types.ObjectId;
    itemList: Array<{
        itemName: string;
        itemPrice: number;
    }>;
}
export interface IContractSplitter{
    userId: string;
    itemList: Array<{
        itemName: string;
        itemPrice: number;
    }>;
}
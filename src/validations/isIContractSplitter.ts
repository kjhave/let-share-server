import { IContractSplitter } from "../models/interfaces";

export const isIContractSplitter = (variable: any): variable is IContractSplitter => {
    return (
        typeof variable.user === "string" &&
        Array.isArray(variable.itemList) &&
        variable.itemList.every(
            (item: { itemName: any; itemPrice: any }) =>
                typeof item.itemName === "string" &&
                typeof item.itemPrice === "number"
        )
    );
}
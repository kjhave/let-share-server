import { IContractSplitter } from "../models/interfaces";

export const isIContractSplitter = (variable: any): variable is IContractSplitter => {
    return (
        variable && typeof variable === "object"
        &&  typeof variable.userId === "string"
        &&  Array.isArray(variable.itemList)
        &&  variable.itemList.every(
                (item: { itemName: any; itemPrice: any }) =>
                    typeof item.itemName === "string" &&
                    typeof item.itemPrice === "number"
            )
    );
}
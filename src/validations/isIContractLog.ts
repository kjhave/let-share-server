import { IContractLog } from "../models/interfaces";
import { isIContractSplitter } from "./";

export const isIContractLog = (variable: any): variable is IContractLog => {
    return (
        variable && typeof variable === "object"
        && typeof variable.contractName === "string"
        && typeof variable.contractDescription === "string"
        && typeof variable.contractTotalCost === "number"
        && typeof variable.contractPayer === "string"
        && Array.isArray(variable.contractSplitters)
        && variable.contractSplitters.every(
            (splitter: any) => isIContractSplitter(splitter)
        )
    );
}
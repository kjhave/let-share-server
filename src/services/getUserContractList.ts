import { ContractLog } from "../models/db";
import { IContractLog } from "../models/interfaces";

export const getUserContractList = async(userId: string): Promise< Array<IContractLog & { id: string }> > => {
    try {
        const contracts = await ContractLog.find({
            $or: [
                { contractPayer: userId },
                { "contractSplitters.userId": userId }
            ]
        }).lean().exec();
        
        return contracts.map(contract => {
            return {
                ...contract,
                id: contract._id.toString(),
            }
        });
    } catch(err) {
        console.log("Error when fetching user contract log: ", err);
        throw err;
    }
}
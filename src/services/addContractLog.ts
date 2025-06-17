import { ContractLog, Hangout } from "../models/db"
import { IContractLog } from "../models/interfaces"
import { isIContractLog } from "../validations"

export const addContractLog = async ({
    contract,
    hangoutCode = ""
} : {
    contract: IContractLog,
    hangoutCode?: string
}): Promise<void> => {
    try {
        if (!isIContractLog(contract))
            throw new Error("wrong contract format");

        const contractLog = await ContractLog.create(contract);

        if (hangoutCode && hangoutCode !== ""){
            const updatedHangout = await Hangout.findOneAndUpdate(
                { code: hangoutCode },
                {
                    $addToSet: {
                        contracts: {
                            contract: contractLog._id,
                            isSubmitted: false
                        }
                    }
                }
            );

            if (!updatedHangout)    throw new Error("hangout not found");
        }
    } catch(err){
        throw err;
    }
}
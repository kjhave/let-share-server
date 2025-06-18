import { Hangout } from "../models/db";
import { IContractLog } from "../models/interfaces";

export const getHangoutContractStatus = async (hangoutCode: string): Promise<{ contract: IContractLog & { id: string }, isSubmitted: boolean }[]> => {
    try {
        const hangout = await Hangout.findOne({ code: hangoutCode })
                                    .select("contracts")
                                    .populate("contracts.contract")
                                    .lean<{
                                        contracts: { contract: IContractLog & { _id: string }, isSubmitted: boolean }[]
                                    }>()
                                    .exec();
        if (!hangout)
            throw new Error("hangout not found");

        return hangout.contracts.map(contract => {
            return {
                ...contract,
                contract: {
                    ...contract.contract,
                    id: contract.contract._id.toString(),
                }
            }

        });
    } catch(err) {
        throw err;
    }
}
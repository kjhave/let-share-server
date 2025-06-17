import { Hangout } from "../models/db";
import { IContractLog } from "../models/interfaces";

export const getHangoutContractStatus = async (hangoutCode: string): Promise<{ contract: IContractLog, isSubmitted: boolean }[]> => {
    try {
        const hangout = await Hangout.findOne({ code: hangoutCode })
                                    .select("contracts")
                                    .populate("contracts.contract")
                                    .lean<{
                                        contracts: { contract: IContractLog, isSubmitted: boolean }[]
                                    }>()
                                    .exec();
        if (!hangout)
            throw new Error("hangout not found");

        return hangout.contracts;
    } catch(err) {
        throw err;
    }
}
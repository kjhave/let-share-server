import { Request, Response } from "express";
import { getUserHangoutStatus, getHangoutContractStatus, addHangoutContractsAndRelations } from "../../services";

export const handleSubmitContract = async (req: Request, res: Response): Promise<void> => {
    const user = res.locals.user;
    const {
        hangoutCode,
        submitContracts,
        submitRelations
    } = req.body;

    if (!hangoutCode){
        res.status(400).json({ message: "Invalid request" });
        return;
    }

    if (!submitContracts || !Array.isArray(submitContracts)){
        res.status(400).json({ message: "Invalid request" });
        return;
    }

    if (!submitRelations || !Array.isArray(submitRelations) || submitRelations.some(p => {
        return typeof(p) !== "object"
            || typeof(p.userId1) !== "string"
            || typeof(p.userId2) !== "string"
            || typeof(p.amount) !== "number";
    })){
        res.status(400).json({ message: "Invalid request" });
        return;
    }

    try {
        const hangout = await getUserHangoutStatus(user);

        if (!hangout.status || hangout.code !== hangoutCode){
            res.status(400).json({ message: "Invalid request" });
            return;
        }

        const contracts = await getHangoutContractStatus(hangoutCode);
        const validContracts = contracts.filter(p => !p.isSubmitted)
                                        .map(p => p.contract.id);
        
        if (submitContracts.some(p => {
            return !validContracts.includes(p);
        })){
            res.status(400).json({ message: "Invalid request" });
            return;
        }

        const map: { [key: string]: number } = {};

        contracts.filter(p => submitContracts.includes(p.contract.id))
        .forEach(p => {
            if (!map?.[p.contract.contractPayer])   map[p.contract.contractPayer] = 0;
            map[p.contract.contractPayer] += p.contract.contractTotalCost,

            p.contract.contractSplitters.forEach(splitter => {
                const amount = splitter.itemList.reduce((sum, cur) => sum += cur.itemPrice, 0);

                if (!map?.[splitter.userId])    map[splitter.userId] = 0;
                map[splitter.userId] -= amount;
            })
        })

        submitRelations.forEach(p => {
            map[p.userId1] -= p.amount;
            map[p.userId2] += p.amount;
        });

        if (Object.entries(map).some(([key, value]) => value !== 0)){
            res.status(400).json({ message: "Invalid request" });
            return;
        }

        await addHangoutContractsAndRelations({
            hangoutCode: hangoutCode,
            submitContracts: submitContracts,
            relations: submitRelations,
        });

        res.status(200).json({ message: "successfully "});
    } catch (err: any) {
        if (err.message === "hangout not found" || err.message === 'wrong format'){
            res.status(400).json({ message: "Invalid request" });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        console.log("Error making contract: ", err);
    }
}
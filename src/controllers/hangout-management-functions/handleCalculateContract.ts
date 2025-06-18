import { Request, Response } from "express";
import { getUserHangoutStatus, getHangoutContractStatus } from "../../services";

export const handleCalculateContract = async (req: Request, res: Response): Promise<void> => {
    const user = res.locals.user;
    const {
        hangoutCode,
        submitContracts
    } = req.body;

    if (!hangoutCode){
        res.status(400).json({ message: "Invalid request" });
        return;
    }

    if (!submitContracts || !Array.isArray(submitContracts)){
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
        
        console.log(submitContracts, validContracts, contracts);
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

        const creditors = Object.entries(map).filter(([key, value]) => value > 0);
        const debtors = Object.entries(map).filter(([key, value]) => value < 0);

        const relations: {
            userId1: string,
            userId2: string,
            amount: number
        }[] = [];

        console.log(creditors, debtors);

        for (let i = 0, j = 0; i < creditors.length || j < debtors.length; ){
            if (creditors[i][1] + debtors[j][1] == 0){
                relations.push({
                    userId1: creditors[i][0],
                    userId2: debtors[j][0],
                    amount: creditors[i][1],
                });
                i++;
                j++;
                continue;
            }

            if (creditors[i][1] + debtors[j][1] < 0){
                relations.push({
                    userId1: creditors[i][0],
                    userId2: debtors[j][0],
                    amount: creditors[i][1],
                });
                debtors[j][1] += creditors[i][1];
                i++;
                continue;
            }

            relations.push({
                userId1: creditors[i][0],
                userId2: debtors[j][0],
                amount: -debtors[i][1],
            });
            creditors[i][1] += debtors[j][1];
            j++;
        }

        res.status(200).json({
            message: "successfully",
            data: {
                relations: relations
            }
        });
    } catch (err: any) {
        if (err.message === "hangout not found"){
            res.status(400).json({ message: "Invalid request" });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        console.log("Error making contract: ", err);
    }
}
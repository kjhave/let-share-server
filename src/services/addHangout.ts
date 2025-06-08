import { Hangout, UserStatus } from "../models/db";
import { genCode } from "./genCode";

import mongoose from "mongoose";

export const addHangout = async ({
    name = "",
    description = "",
    host,
}: {
    name: string,
    description: string,
    host: string,
}): Promise<string> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const code = await genCode("Hangout");
        
        await Hangout.create({
            name: name,
            description: description,
            participants: [],
            host: host,
            code: code,
            contracts: []
        });

        const res = await UserStatus.findByIdAndUpdate(
            { host, hangout: false },
            { $set: { hangout: true } },
            { new: false }
        );

        if (!res)   throw new Error("User is not found or has been already in another hangout");

        await session.commitTransaction();

        return code;
    } catch(err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }

}
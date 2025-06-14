import { Hangout } from "../models/db";

export type HangoutInfoType = {
    host: {
        id: string,
        name: string,
    },
    participants: {
        id: string,
        name: string,
    }[],
    isClosed: boolean,
};

export const getHangoutInfo = async (code: string): Promise<HangoutInfoType|null> => {
    try {
        const hangout = await Hangout.findOne({ code: code })
            .populate('host', '_id name')
            .populate('participants', '_id name')
            .lean<{
                host: {
                    _id: string,
                    name: string,
                },
                participants: {
                    _id: string,
                    name: string,
                }[],
                isClosed: boolean,
            }>()
            .exec();
        
        if (!hangout)    return null;

        return {
            host: {
                id: hangout.host._id.toString(),
                name: hangout.host.name,
            },
            participants: hangout.participants.map(p => {
                return {
                    id: p._id.toString(),
                    name: p.name,
                }
            }),
            isClosed: hangout.isClosed,
        };
    } catch(err){
        throw err;
    }
}
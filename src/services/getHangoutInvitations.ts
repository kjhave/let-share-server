import { HangoutInvitation } from "../models/db";

export interface HangoutInvitation {
    userProfile: {
        id: string,
        name: string,
    }
    hangoutCode: string;
    expireAt: Date;
}

export const getHangoutInvitations = async (userId: string, senderId?: string): Promise<HangoutInvitation[]> => {
    try {
        if (senderId){
            const invitation = await HangoutInvitation
            .findOne(
                {
                    userId1: senderId, 
                    userId2: userId,
                }
            )
            .select('userId1 hangoutId expireAt')
            .lean()
            .exec();

            if (!invitation)    return [];
            
            return [{
                userProfile: {
                    id: '',
                    name: '',
                },
                hangoutCode: '',
                expireAt: invitation?.expireAt,
            }];
        }

        const invitations = await HangoutInvitation
            .find(
                { userId2: userId }
            )
            .populate('userId1', 'name')
            .populate('hangoutId', 'code')
            .select('userId1 hangoutId expireAt')
            .lean<{
                userId1: {
                    _id: string,
                    name: string
                },
                hangoutId: {
                    code: string;
                },
                expireAt: Date,
            }[]>()
            .exec();

        if (!invitations || invitations.length === 0) {
            return [];
        }

        return invitations.map(invitation => ({
            userProfile: {
                id: invitation.userId1._id.toString(),
                name: invitation.userId1.name,
            },
            hangoutCode: invitation.hangoutId.code,
            expireAt: invitation.expireAt,
        }));
    } catch (err) {
        throw err;
    }
}
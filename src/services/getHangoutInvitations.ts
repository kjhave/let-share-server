import { HangoutInvitation } from "../models/db";

export interface HangoutInvitation {
    userId1: string;
    userId2: string;
    hangoutCode: string;
}

export const getHangoutInvitations = async (userId: string): Promise<HangoutInvitation[]> => {
    try {
        const invitations = await HangoutInvitation
            .find(
                { userId2: userId }
            )
            .populate('hangoutId', 'code')
            .lean<{
                userId1: string;
                userId2: string;
                hangoutId: {
                    code: string;
                }
            }[]>()
            .exec();

        if (!invitations || invitations.length === 0) {
            return [];
        }

        return invitations.map(invitation => ({
            userId1: invitation.userId1.toString(),
            userId2: invitation.userId2.toString(),
            hangoutCode: invitation.hangoutId.code
        }));
    } catch (err) {
        throw err;
    }
}
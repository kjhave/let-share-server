import express from "express";

export const getFriendsList = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const user = res.locals.user;
        const friends = await user.getFriends();

        res.status(200).json(friends);
    }
    catch(err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addFriend = async (req: express.Request, res: express.Response): Promise<void> => {
};

export const removeFriend = async (req: express.Request, res: express.Response): Promise<void> => {
};
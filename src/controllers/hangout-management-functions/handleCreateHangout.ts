import { Request, Response } from 'express';
import { addHangout } from '../../services';

export const handleCreateHangout = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.userId;
    const name = req.body.name;
    const description = req.body.name;

    if (!name || !description){
        res.status(400).json({ message: "Invalid Request" });
        return;
    }

    try {
        const code = await addHangout({
            name: name,
            description: description,
            host: userId
        });

        res.status(200).json({ message: "Create Hangout successfully", code: code });
    } catch (err){
        res.status(500).json({ message: "Internal server error"});
        console.log("Error creating Hangout: ", err);
    }
}
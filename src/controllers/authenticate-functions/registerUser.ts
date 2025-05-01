import { Request, Response } from "express";
import { addNewUser } from "../../services";
import { isIUser } from "../../validations/isIUser";

const isPwdValid = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
}

const isUsernameValid = (username: string): boolean => {
    const regex = /^[a-zA-Z0-9]{5,}$/;
    return regex.test(username);
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const user = req.body.user;
    console.log(user);

    if (!isIUser(user)) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }

    if (!isUsernameValid(user.username)) {
        res.status(400).json({ message: "Username must be at least 5 characters long and can only contain alphanumeric characters." });
        return;
    }

    if (!isPwdValid(user.password)) {
        res.status(400).json({ message: "Passwords are required to have a minimum length of 8 characters and contain at least one lowercase character, one uppercase character, and one numerical character. Only alphanumeric characters are permitted." });
        return;
    }

    try{
        await addNewUser(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
        return;
    }

    res.status(201).json({ message: "Success! Welcome to our apps" });
}
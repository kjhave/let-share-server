import { User } from "../models/db";

export const addNewUser = async (
    username: string,
    email: string,
    password: string,
    name: string
): Promise<void> => {
    try{
        await User.create({
            username: username,
            email: email,
            password: password,
            name: name
        });
    }
    catch(err: any){
        if (err.code === 11000){
            // Duplicate key error (unique field conflict)
            const field = Object.keys(err.keyPattern)[0];
            throw new Error(`${field} is already taken. Please try another one.`);
        } else{
            throw err;
        }
    }
}
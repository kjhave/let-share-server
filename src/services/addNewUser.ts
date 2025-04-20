import { User } from "../models/db";
import { hash } from "bcryptjs";

const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;

if (!BCRYPT_SALT_ROUNDS) {
    throw new Error("Missing BCRYPT_SALT_ROUNDS in environment variables.");
}

export const addNewUser = async (
    username: string,
    email: string,
    password: string,
    name: string
): Promise<void> => {
    const hashedPassword = await hash(password, BCRYPT_SALT_ROUNDS);
    try{
        await User.create({
            username: username,
            email: email,
            password: hashedPassword,
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
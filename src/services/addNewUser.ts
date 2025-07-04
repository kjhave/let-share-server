import { User, UserStatus } from "../models/db";
import { hash } from "bcryptjs";
import { IUser } from "../models/interfaces/IUser.model";
import { genCode } from "./genCode";

if (!process.env.BCRYPT_SALT_ROUNDS) {
    throw new Error("Missing BCRYPT_SALT_ROUNDS in environment variables.");
}

const BCRYPT_SALT_ROUNDS: number = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

export const addNewUser = async (user: IUser): Promise<void> => {
    const hashedPassword = await hash(user.password, BCRYPT_SALT_ROUNDS);
    const code = await genCode("User", 6);

    try{
        console.log("Creating user with username:", user.username);
        const res = await User.create({
            username: user.username,
            email: user.email,
            password: hashedPassword,
            name: user.name,
            code: code,
        });

        await UserStatus.create({
            userId: res._id,
            hangoutStatus: false,
            hangoutCode: "",
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
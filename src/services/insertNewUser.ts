import { error } from "console";
import { User } from "../models/db/index";

export const insertNewUser = async (username: string, email: string, password: string, name: string): Promise<void> => {
    try{
        User.insertOne({username: username, email: email, password: password, name: name});
    }
    catch(err){
        // if (err === "") throw new error("message": "username or email is already taken, please try another one");
    }
}
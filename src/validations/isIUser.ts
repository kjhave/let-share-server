import { IUser } from "../models/interfaces/IUser.model";
import { Types } from "mongoose";

export const isIUser = (user: any): user is IUser => {
    return user && typeof user === "object"
        && typeof user.username === "string"
        && typeof user.email === "string"
        && typeof user.password === "string"
        && typeof user.name === "string"
}
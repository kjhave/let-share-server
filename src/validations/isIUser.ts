import { IUser } from "../models/interfaces/IUser.model";
import { Types } from "mongoose";

export const isIUser = (user: any): user is IUser => {
    return user && typeof user === "object"
        && user.userId instanceof Types.ObjectId
        && typeof user.username === "string"
        && typeof user.email === "string"
        && typeof user.password === "string"
        && typeof user.username === "string"
}
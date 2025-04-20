import { Document, Types } from "mongoose";

export interface IUser extends Document{
    username: string;
    email: string;
    password: string;
    name: string;
    friendList: Types.ObjectId[]; 
    groupList: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
};
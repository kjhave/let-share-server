import { Types } from "mongoose";

export interface IUser{
    username: string;
    email: string;
    password: string;
    name: string;
    friendList: Types.ObjectId[]; 
    groupList: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
};
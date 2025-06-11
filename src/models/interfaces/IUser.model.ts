export interface IUser{
    username: string;
    email: string;
    password: string;
    name: string;
    code: string;
    friendList: string[]; 
    groupList: string[];
    createdAt?: Date;
    updatedAt?: Date;
};
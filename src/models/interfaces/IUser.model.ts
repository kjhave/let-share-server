export interface IUser{
    username: string;
    email: string;
    password: string;
    name: string;
    friendList: string[]; 
    groupList: string[];
    createdAt?: Date;
    updatedAt?: Date;
};
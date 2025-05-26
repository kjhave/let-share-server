import { Schema } from "mongoose";

export const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: {  type: String, required: true },
    friendList: [{ type: Schema.ObjectId, ref: "User" }],
    groupList: [{ type: Schema.ObjectId, ref: "Group" }]
});
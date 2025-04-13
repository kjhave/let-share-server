import { Schema } from "mongoose";

export const UserSchema = new Schema({
    name: {  type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friendList: { type: Schema.ObjectId, ref: "Friend" },
    groupList: { type: Schema.ObjectId, ref: "Group" }
});
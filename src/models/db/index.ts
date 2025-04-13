import { model } from "mongoose";

import { UserSchema } from "./user.model";
export const User = model("User", UserSchema);

import { FriendSchema } from "./friend.model";
export const Friend = model("Friend", FriendSchema);

import { FriendRequestSchema } from "./friend-request.model";
export const FriendRequest = model("FriendRequest", FriendRequestSchema);

import { GroupSchema } from "./group.model";
export const Group = model("Group", GroupSchema);

import { BillFormSchema } from "./bill-form.model";
export const BillForm = model("BillForm", BillFormSchema);

import { ContractLogSchema } from "./contract-log.model";
export const ContractLog = model("ContractLog", ContractLogSchema);
import { model, Model } from "mongoose";

import { UserSchema } from "./user.model";
import { IUser } from "../interfaces";
export const User: Model<IUser> = model<IUser>("User", UserSchema);

import { FriendRequestSchema } from "./friend-request.model";
import { IFriendRequest } from "../interfaces";
export const FriendRequest: Model<IFriendRequest> = model<IFriendRequest>("FriendRequest", FriendRequestSchema);

import { GroupSchema } from "./group.model";
export const Group = model("Group", GroupSchema);

import { BillFormSchema } from "./bill-form.model";
export const BillForm = model("BillForm", BillFormSchema);

import { ContractLogSchema } from "./contract-log.model";
import { IContractLog } from "../interfaces";
export const ContractLog: Model<IContractLog> = model<IContractLog>("ContractLog", ContractLogSchema);

import { FinancialRelationshipSchema } from "./financial-relationship.model";
import { IRelationship } from "../interfaces";
export const FinancialRelationship: Model<IRelationship> = model<IRelationship>("FinancialRelationship", FinancialRelationshipSchema);
// This file defines the interface for a friend request in the application.
// It includes the following properties:
// - userId: The ID of friend (string).
// - name: Name of friend (string).

import { ObjectId } from "mongoose";

export interface IFriend {
    userId: ObjectId;
    name: string;
}
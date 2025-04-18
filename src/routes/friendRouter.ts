//Router for friend management functions

import express from 'express';
import * as FriendManagementFunctions from '../controllers/friend-management-functions';

const router = express.Router();

router.get("/", FriendManagementFunctions.getUserFriends);

router.post("/remove", FriendManagementFunctions.removeFriend);

router.get("/requests", FriendManagementFunctions.getUserFriendRequests);

router.post("/requests/send", FriendManagementFunctions.sendFriendRequest);

router.post("/requests/reply", FriendManagementFunctions.replyFriendRequest);

export default router;
//Router for hangout management functions

import express from 'express';
import * as HangoutManagementFunctions from "../controllers/hangout-management-functions";

const router = express.Router();

router.get("/participants", HangoutManagementFunctions.handleGetHangoutParticipants);
router.get("/status/user", HangoutManagementFunctions.handleGetUserHangoutStatus);
router.get("/invitation", HangoutManagementFunctions.handleGetInvitations);

router.post("/create", HangoutManagementFunctions.handleCreateHangout);
router.post("/join", HangoutManagementFunctions.handleJoinHangoutWithCode);
router.post("/leave", HangoutManagementFunctions.handleLeaveHangout);
router.post("/invitation/send", HangoutManagementFunctions.handleSendInvitation);
router.post("/invitation/reply", HangoutManagementFunctions.handleReplyInvitation);

export default router;
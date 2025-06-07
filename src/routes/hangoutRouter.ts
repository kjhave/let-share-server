//Router for hangout management functions

import express from 'express';
import * as HangoutManagementFunctions from "../controllers/hangout-management-functions";

const router = express.Router();

router.get("/status", HangoutManagementFunctions.getHangoutStatus);
router.get("/:userId/status", HangoutManagementFunctions.getUserHangoutStatus);
router.get("/invitation/:userId", HangoutManagementFunctions.getInvitations);

router.post("/create", HangoutManagementFunctions.handleCreateHangout);
router.post("/invitation/send", HangoutManagementFunctions.handleSendInvitation);
router.post("/invitation/reply", HangoutManagementFunctions.handleReplyInvitation);

export default router;
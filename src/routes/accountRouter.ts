//Router for account management functions

import express, { NextFunction, Request, Response } from 'express';
import friendRouter from './friendRouter';
import * as AccountManagementFunctions from '../controllers/account-management-functions';
import { getContractLog } from '../controllers/contract-management-functions';

const router = express.Router();

router.get("/contactInformation/:userId", AccountManagementFunctions.getContactInformation);

router.get("/profile", AccountManagementFunctions.getAccountInfor);

router.post("/password_change", AccountManagementFunctions.updateAccountPassword);

router.post("/profile/update", AccountManagementFunctions.updateAccountInfor);

// Router for contract history functions
router.get("/contracts", (req: Request, res: Response, next: NextFunction) => {
    res.locals.contractType = "personal";
    next();
}, getContractLog);

//Router for friend management functions
router.use("/friends", friendRouter);

export default router;
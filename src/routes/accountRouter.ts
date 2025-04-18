//Router for account management functions

import express, { Request, Response } from 'express';
import friendRouter from './friendRouter';
import * as AccountManagementFunctions from '../controllers/account-management-functions';

const router = express.Router();

router.get("/profile", AccountManagementFunctions.getAccountInfor);

router.post("/password_change", AccountManagementFunctions.updateAccountPassword);

router.post("/profile/update", AccountManagementFunctions.updateAccountInfor);

//Router for contract history functions
// router.get("/contracts", (req: Request, res: Response) => {
//     const user = res.locals.user;
    
//     try {
//         res.status(200).json({message: "Success"});
//     }
//     catch (err) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

//Router for friend management functions
router.use("/friends", friendRouter);

export default router;
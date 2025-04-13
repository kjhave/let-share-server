//Router for groups management functions

import express, { Request, Response } from 'express';
import verifyToken from '../middlewares/VerifyToken';

const router = express.Router();

router.get("/", verifyToken, (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        res.status(200).json({message: "Success"});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/create", verifyToken, (req: Request, res: Response) => {
    const user = res.locals.user;

    try {
        res.status(200).json({message: "Success"});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/group/:groupId", verifyToken, (req: Request, res: Response) => {
    const user = res.locals.user;
        
    try {
        const groupId = req.params.id;
        res.status(200).json({message: "Success", groupId});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/group/:groupId/update", verifyToken, (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        res.status(200).json({message: "Success"});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/group/:groupId/delete", verifyToken, (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        res.status(200).json({message: "Success"});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//Router for bill form management functions
import billFormRouter from './billFormRouter';
router.use("/group/:groupId/billForms", billFormRouter);

//Router for contract history functions
router.get("/contracts", verifyToken, (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        res.status(200).json({message: "Success"});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
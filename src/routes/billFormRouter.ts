//Router for bill form function, extension for contract-making and group-management function

import express, {Request, Response } from "express";

import { verifyToken } from "../middlewares/verifyToken";

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

router.get("/billForm/:billFormId", verifyToken, (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        const billId = req.params.billId;
        res.status(200).json({message: "Success", billId});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/billForm/:billFormId/update", verifyToken, (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        const billId = req.params.billId;
        res.status(200).json({message: "Success", billId});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/billForm/:billFormId/delete", verifyToken, (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        const billId = req.params.billId;
        res.status(200).json({message: "Success", billId});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
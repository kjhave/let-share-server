//Router for bill form function, extension for contract-making and group-management function

import express, {Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        res.status(200).json({message: "Success"});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/create", (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        res.status(200).json({message: "Success"});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/billForm/:billFormId", (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        const billId = req.params.billId;
        res.status(200).json({message: "Success", billId});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/billForm/:billFormId/update", (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        const billId = req.params.billId;
        res.status(200).json({message: "Success", billId});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/billForm/:billFormId/delete", (req: Request, res: Response) => {
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
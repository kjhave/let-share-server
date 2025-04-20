//Router for groups management functions

import express, { Request, Response, NextFunction } from 'express';
import { getContractLog } from '../controllers/contract-management-functions';

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

router.get("/group/:groupId", (req: Request, res: Response) => {
    const user = res.locals.user;
        
    try {
        const groupId = req.params.id;
        res.status(200).json({message: "Success", groupId});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/group/:groupId/update", (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        res.status(200).json({message: "Success"});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/group/:groupId/delete", (req: Request, res: Response) => {
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

// Router for contract history functions
router.get("/contracts", (req: Request, res: Response, next: NextFunction) => {
    res.locals.contractType = "group";
    next();
}, getContractLog);

export default router;
//Router for account management functions

import express, { Request, Response } from 'express';
import verifyToken from '../middlewares/VerifyToken';

const router = express.Router();

router.get("/friends", verifyToken, (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        res.status(200).json({message: "Success"});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/profile", verifyToken, (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        res.status(200).json({message: "Success"});
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/password_change", verifyToken, (req: Request, res: Response) => {
    const user = res.locals.user;

    try {
        const { oldPassword, newPassword } = req.body;
        
        // Validate and update password in database (mocked here)
        if (oldPassword === "old_password" && newPassword) {
            res.status(200).json({ message: "Password changed successfully" });
        } else {
            res.status(400).json({ message: "Invalid password" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/profile/update", verifyToken, (req: Request, res: Response) => {
    const user = res.locals.user;
    
    try {
        const { password, name, email, phoneNumber } = req.body;
        
        // Validate and update profile in database (mocked here)
        if (password === 'old_password' && name && email && phoneNumber) {
            res.status(200).json({ message: "Profile updated successfully" });
        } else {
            res.status(400).json({ message: "Invalid profile data" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

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
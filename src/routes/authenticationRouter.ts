//Router for authentication and authorization

import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables.");
}

const router = express.Router();


router.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;



    const payload = { username };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });

    res.json({ token });
});

router.post('/register', (req: Request, res: Response) => {
    const { username, password, name, email, phoneNumber } = req.body;

    res.status(201).json({ message: "Success! Welcome to our apps" });
});

// router.post('/forget_password', (req: Request, res: Response) => {
//     //later
// });



export default router;

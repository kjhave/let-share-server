//Router for authentication and authorization

import express, { Request, Response } from 'express';
import { verifyUser } from '../controllers/authenticate-functions/verifyUser';
import { registerUser } from '../controllers/authenticate-functions/registerUser';

const router = express.Router();

router.post('/login', verifyUser);

router.post('/register', registerUser);

// router.post('/forget_password', (req: Request, res: Response) => {
//     //later
// });



export default router;

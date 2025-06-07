//Router for authentication and authorization

import express from 'express';
import * as AuthManagementFunctions from '../controllers/authenticate-functions';

const router = express.Router();

router.post('/login', AuthManagementFunctions.loginUser);

router.post('/register', AuthManagementFunctions.registerUser);

// router.post('/forget_password', (req: Request, res: Response) => {
//     //later
// });



export default router;

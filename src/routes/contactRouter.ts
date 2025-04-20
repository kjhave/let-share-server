//Router for contract management functions
//Note: for contract making, currently, you are only allowed to make contract with the user you are already friends with or  the user in the same group as you

import express, { Request, Response } from 'express';
import { makeContract } from '../controllers/contract-management-functions/makeContract';

const router = express.Router();

router.post("/", makeContract);

export default router;
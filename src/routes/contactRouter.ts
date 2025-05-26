//Router for contract management functions

import express, { Request, Response } from 'express';
import { makeContract } from '../controllers/contract-management-functions/makeContract';
import { getContractLog, getFinanciallyLinkedUserList } from '../controllers/contract-management-functions';

const router = express.Router();

router.get("/history", getContractLog);

router.get("/list", getFinanciallyLinkedUserList);

router.post("/add", makeContract);

export default router;
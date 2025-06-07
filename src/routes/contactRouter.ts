//Router for contract management functions

import express from 'express';
import * as ContractManagementFunctions from '../controllers/contract-management-functions';

const router = express.Router();

router.get("/history", ContractManagementFunctions.getContractLog);
router.get("/list", ContractManagementFunctions.getFinanciallyLinkedUserList);

router.post("/add", ContractManagementFunctions.makeContract);

export default router;
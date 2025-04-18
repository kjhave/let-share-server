import express from 'express';

const app = express();

// Middleware
app.use(express.json());

import { verifyPostRequest } from './middlewares/verifyPostRequest';
import { verifyToken } from './middlewares/verifyToken';
app.post("*", verifyPostRequest);

//Import routers
import authenticationRouter from './routes/authenticationRouter';
import accountRouter        from './routes/accountRouter';
import contactRouter        from './routes/contactRouter';
import groupRouter          from './routes/groupRouter';

// Mount routers
app.use("/authentication", authenticationRouter);
app.use("/accounts", verifyToken, accountRouter);
app.use("/contract", verifyToken, contactRouter);
app.use("/groups", verifyToken, groupRouter);

export default app;
import express from 'express';

const app = express();

// Middleware
app.use(express.json());

import { verifyPostRequest } from './middlewares/verifyPostRequest';
app.post("*", verifyPostRequest);

//Import routers
import authenticationRouter from './routes/authenticationRouter';
import accountRouter        from './routes/accountRouter';
import contactRouter        from './routes/contactRouter';
import groupRouter          from './routes/groupRouter';

// Mount routers
app.use("/authentication", authenticationRouter);
app.use("/accounts", accountRouter);
app.use("/contract", contactRouter);
app.use("/groups", groupRouter);

export default app;
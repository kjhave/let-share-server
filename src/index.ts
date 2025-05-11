import dotenv from 'dotenv';
dotenv.config();

import app from './app';


if (!process.env.PORT){
    throw new Error("Missing PORT in environment variables.");
}

const port = process.env.PORT;

// config cors
import cors from 'cors';
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
    credentials: true
}))

// database connection
import connectDB from './config/db';
connectDB();

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}. This is a backend server, so you won't see anything here.`);
});
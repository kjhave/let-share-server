import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const port = process.env.PORT;

if (!port){
    throw new Error("Missing PORT in environment variables.");
}

//database connection
import connectDB from './config/db';
connectDB();

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}. This is a backend server, so you won't see anything here.`);
});

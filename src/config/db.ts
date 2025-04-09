//database connection

import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in .env file");
}

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // 5 seconds
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit on failure
    }
};

export default connectDB;
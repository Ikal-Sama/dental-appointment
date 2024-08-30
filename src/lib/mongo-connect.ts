import mongoose from "mongoose";

export async function dbConnect() {
    try {
        const conn = await mongoose.connect(String(process.env.MONGODB_URI));
        console.log("MongoDB connected");
        return conn;
    } catch (error: any) {
        throw new Error(error)
    }
}
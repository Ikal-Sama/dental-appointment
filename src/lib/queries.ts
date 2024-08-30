"use server"
import { dbConnect } from "./mongo-connect";
import User from "@/models/user-model";

export async function getUserByEmail(email: string) {
    await dbConnect();
    const user = await User.findOne({ email });
    return user;
  }
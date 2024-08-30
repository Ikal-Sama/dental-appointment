"use server"

import { dbConnect } from "@/lib/mongo-connect";
import User from "@/models/user-model";
import { revalidatePath } from "next/cache";

export async function toggleUserStatus(id: string, newStatus: "active" | "deactivate") {
    try {
      await dbConnect();

      const user = await User.findByIdAndUpdate(
        { _id: id },
        { status: newStatus },
        { new: true }
      );  
      if (user) {
        revalidatePath("/users")
        return { success: "Status updated successfully" };
      } else {
        return { error: "User not found" };
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      return { error: "Failed to update user status" };
    }
  }
"use server"

import { dbConnect } from '@/lib/mongo-connect';
import {auth, signIn, signOut} from '@/auth'
import User from '@/models/user-model';
import Appointments from '@/models/appointments';
import { revalidatePath } from 'next/cache';
import Notification from '@/models/notification';


export async function markAppointmentAsDone(id: string){
    try {
        await dbConnect();
        const appointment = await Appointments.findOne({_id: id})
        if(!appointment){
            return { error: "Appointment not found" };
        }
      

        appointment.status = "done";
        await appointment.save();
        revalidatePath("/myappointments")
        return { success: "Appointment marked as done" };

    } catch (error) {
        console.error("Error marking appointment as done:", error);
        return { error: "Failed to update appointment" };
    }
}
export async function acceptAppointment(id: string){
    try {
        await dbConnect();
        const appointment = await Appointments.findOne({_id: id})
        if(!appointment){
            return { error: "Appointment not found" };
        }
      

        appointment.status = "ongoing";
        await appointment.save();
        revalidatePath("/appointments")

        const user = await User.findById(appointment.userId);
        if (user) {
          const notification = new Notification({
            userId: user._id,
            appointmentId: appointment._id,
            message: `Your appointment has been accepted`,
          });
          await notification.save();
        }

        return { success: "Appointment is accepted" };

    } catch (error) {
        console.error("Error accepting appointment:", error);
        return { error: "Failed to accepting appointment" };
    }
}

export async function deleteAppointment(id: string) {
    try {
      await dbConnect();
      const appointment = await Appointments.findByIdAndDelete({ _id: id });
      const userId = appointment.userId; // assuming the appointment document has a userId field
      const user = await User.findByIdAndUpdate(userId, {
        $pull: { appointments: id }
      });
      revalidatePath("/completedappointments");
      return { success: "Appointment deleted successfully" };
    } catch (error) {
      console.error("Error marking appointment as delete:", error);
      return { error: "Failed to delete appointment" };
    }
}

export async function cancelAppointment(id: string){
    try {
        await dbConnect();
        const appointment = await Appointments.findOne({_id: id})
        if(!appointment){
            return { error: "Appointment not found" };
        }
      

        appointment.status = "canceled";
        await appointment.save();
        revalidatePath("/newappointments")
        const user = await User.findById(appointment.userId);
        if (user) {
          const notification = new Notification({
            userId: user._id,
            appointmentId: appointment._id,
            message: `Admin has canceled your appointment`,
          });
          await notification.save();
        }

        return { success: "Appointment marked as canceled" };
    } catch (error) {
        console.error("Error marking appointment as delete:", error);
        return { error: "Failed to delete appointment" };
    }
}


export async function getAllUsers() {
    try {
        await dbConnect();
        const allUsers = await User.find().lean();
        return {allUsers};
    } catch (error: any) {
        return {error: error.message}
    }
}

export async function roleChange(id: string, newRole: string) {
    try {
      await dbConnect();
      const userId = id;
      const updateUser = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
      if (!updateUser) {
        throw new Error(`Failed to update user role for ${userId}`);
      }
      return {success: "User role updated successfully"}
    } catch (error) {
      console.error(error);
      // Handle error response to the client
    }
}



export async function getNotifications(id: string){
    try {
        await dbConnect()
        const notifications = await Notification.find({
            read: false,
            userId: id
        })
        return notifications;

    } catch (error) {
        console.error(error);
    }
}

export async function markNotificationAsRead(id: string) {
    try {
      await dbConnect();
      await Notification.findByIdAndUpdate(id, { read: true });
      return { success: "Notification marked as read" };
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }
  


"use server"

import { dbConnect } from '@/lib/mongo-connect';
import {auth, signIn, signOut} from '@/auth'
import User from '@/models/user-model';
import Appointments from '@/models/appointments';
import { revalidatePath } from 'next/cache';


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
        return { success: "Appointment marked as canceled" };
    } catch (error) {
        console.error("Error marking appointment as delete:", error);
        return { error: "Failed to delete appointment" };
    }
}


export async function getAllUsers() {
    try {
        await dbConnect();
        const allUsers = await User.find();
        return {allUsers};
    } catch (error: any) {
        return {error: error.message}
    }
}



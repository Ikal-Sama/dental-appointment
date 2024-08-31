"use server"

import { auth } from "@/auth";
import { dbConnect } from "@/lib/mongo-connect";
import Appointments from "@/models/appointments";
import Notification from "@/models/notification";
import User from "@/models/user-model";
import { revalidatePath } from "next/cache";


interface Params{
    id: string;
    service:string;
    patientName:string;
    patientPhone:number;
    date: Date;
    hour:string;
}
export async function createAppointment({
    id,
    service,
    patientName,
    patientPhone,
    date,
    hour,
}: Params){
    try {
        // const session = await auth();
        // const userId = session?.user;
        // const id = userId?.id as string;
        await dbConnect();
        
        const user = await User.findById(id).populate('medicalHistory');
        
        if (!user) {
          return { error: "User not found" };
        }

        if (!user.medicalHistory || Object.keys(user.medicalHistory).length === 0) {
            return { error: "Cannot create an appointment for a user with empty medical history" };
        }
    
        const existingAppointment = await Appointments.findOne({
          userId: user._id,
          status: "ongoing",
        });
        
        if (existingAppointment) {
          return { error: "You already have an ongoing appointment" };
        }
    
        const newAppointment = new Appointments({
          userId: user._id,
          patientName,
          patientPhone,
          service,
          date,
          hour,
          medicalHistory: user.medicalHistory, 
        });
    
        await newAppointment.save();

        user.appointments.push(newAppointment._id);
        await user.save();

        const admins = await User.find({ $or: [{ role: 'admin' }, { role: 'secretary' }] });
        admins.forEach((admin) => {
            const notification = new Notification({
            userId: admin._id,
            appointmentId: newAppointment._id,
            message: `${user.name}`,
            });
            notification.save();
        });

        return { success: "Appointment created successfully", newAppointment };

    } catch (error: any) {
        console.error(error);
        return { error: error.message};
    }
}

// Get the uer's appointments who logged in
export async function getUserAppointments(id: string) {
    try {
        await dbConnect();
        // const session = await auth();
        // const userId = session?.user;
        // const id = userId?.id as string;

        const appointments = await Appointments.find({ userId: id }).lean();
        if(!appointments){
            return {error: "No appointments found"}
        }
        return {appointments};

    } catch (error: any) {
        return {error: error.message}
    }
}

export async function getAppointmentsById(id: string) {
    try {
        await dbConnect()
        const appointments = await Appointments.findById({_id: id}).populate({
            path: 'userId',
            populate: {
                path: 'medicalHistory'
            }
        }).lean()

        if (!appointments) {
            return { error: "No appointments found" };
        }

        return { appointments };
    } catch (error: any) {
        return { error: error.message };
    }
}

// export async function markAsDone(appointmentId: string) {
//     try {
//         await dbConnect();
//         const session = await auth();
//         const userId = session?.user;
//         const id = userId?.id as string;

//         const appointment = await Appointments.findOne({ _id: appointmentId, userId: id });
//         if (!appointment) {
//             return { error: "Appointment not found" };
//         }
//         if(appointment.status === "ongoing"){
//             return { error: "Cannot mark ongoing appointment as done" };
//         }

//         appointment.status = "done";
//         await appointment.save();
//         revalidatePath("/myappointments")
//         return { success: "Appointment marked as done" };


//     } catch (error) {
//         console.error("Error marking appointment as done:", error);
//         return { error: "Failed to update appointment" };
//     }
// }

export async function userCancelAppointments(appointmentId: string) {
    try {
        await dbConnect();
        const session = await auth();
        const userId = session?.user;
        const id = userId?.id as string;

        const appointment = await Appointments.findOne({ _id: appointmentId, userId: id });
        if (!appointment) {
            return { error: "Appointment not found" };
        }
        if(appointment.status === "ongoing"){
            return { error: "Cannot cancel accepted appointment" };
        }

        appointment.status = "canceled";
        await appointment.save();

        const adminUser = await User.findOne({ $or: [{ role: 'admin' }, { role: 'secretary' }] });
        if (adminUser) {
          const notification = new Notification({
            userId: adminUser._id,
            appointmentId: appointment._id,
            message: `User has canceled appointment`,
          });
          await notification.save();
        }

        revalidatePath("/myappointments")

      
        return { success: "Appointment is canceled" };

    } catch (error) {
        console.error("Error marking cancel appointment:", error);
        return { error: "Failed to cancel appointment" };
    }
}

export async function userDeleteAppointment(id: string) {
    try {
        await dbConnect();
        const session = await auth();
        const userData = session?.user;
        const userId = userData?.id;

        const appointment = await Appointments.findById({ _id: id, userId: userId });

        if (!appointment) {
        return { error: "Appointment not found" };
        }

        if (appointment.status === "ongoing") {
        return { error: "Cannot delete ongoing appointment" };
        }

        await Appointments.deleteOne({ _id: id, userId: userId }); // Use deleteOne()
        const user = await User.findByIdAndUpdate(userId, {
        $pull: { appointments: id }
        });

        revalidatePath("/myappointments");
        return { success: "Appointment deleted successfully" };
    } catch (error) {
      console.error("Error marking appointment as delete:", error);
      return { error: "Failed to delete appointment" };
    }
}


export async function getNewAppointment() {
    try {
        await dbConnect()
        const newAppointments = await Appointments.find({ status: 'new' }).lean()
    return {newAppointments}
    } catch (error:any) {
        console.log(error)
        return {error: error.message}
    }
}
export async function getOngoingAppointments() {
    try {
        await dbConnect()
        const ongoingAppointments = await Appointments.find({ status: 'ongoing' })
    return {ongoingAppointments}
    } catch (error:any) {
        console.log(error)
        return {error: error.message}
    }
}

export async function getComletedAppointment() {
    try {
        await dbConnect()
        const completedAppointments = await Appointments.find({ status: 'done' })
    return {completedAppointments}
    } catch (error:any) {
        console.log(error)
        return {error: error.message}
    }
}

export async function getCanceledAppointment() {
    try {
        await dbConnect()
        const canceledAppointments = await Appointments.find({ status: 'canceled' })
    return {canceledAppointments}
    } catch (error:any) {
        console.log(error)
        return {error: error.message}
    }
}

export async function getAllAppointments() {
    try {
        await dbConnect()
        const allAppointments = await Appointments.find()
        return {allAppointments}
    } catch (error: any) {
        console.log(error)
        return {error: error.message}
    }
}

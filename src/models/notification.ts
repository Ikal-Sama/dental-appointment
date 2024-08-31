import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment" },
  message: { type: String },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});


const Notification = mongoose.models.Notification || mongoose.model("Notification" , notificationSchema)
export default Notification;
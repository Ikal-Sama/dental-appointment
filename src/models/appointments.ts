import mongoose, { Schema } from "mongoose";

const appointSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    patientName: {
        type: String,
        required: true
    },
    patientPhone: {
        type: Number,
        required: true
    },
    service: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date,
        default: Date.now()
    },
    hour:{
        required: true,
        type: String,
    },
    status:{
        type: String,
        enum: ["done", "ongoing", "canceled", "new"],
        default: "new"
    },
    // medicalHistory: {
    //     type: {
    //       physician: String,
    //       allergies: [String],
    //       conditions: [String],
    //       pastSurgeries: [String],
    //       medications: [String],
    //       immunizations: [String],
    //     }
    // }
},{
    timestamps: true,
})

const Appointments = mongoose.models.Appointment || mongoose.model("Appointment" , appointSchema)
export default Appointments;
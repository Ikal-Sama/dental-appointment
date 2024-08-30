    import mongoose, { Schema } from "mongoose";

    const userSchema = new Schema({
        name: {
            required: true,
            type: String
        },
        age: {
            type: String
        },
        bio: {
            type: String
        },
        address: {
            type: String
        }, 
        password:{
            required: true,
            type: String
        },
        email:{
            required: true,
            type: String,
        },
        image:{
            type: String
        },
        role: {
            type: String,
            enum: ['admin', 'user', 'secretary', 'frontdesk'],
            default: 'user'
        },
        status: {
            type: String,
            enum: ['active', 'deactivate' ],
            default: 'active'
        },
        appointments: [
            {
                type: Schema.Types.ObjectId, ref: 'Appointments'
            }
        ],
        medicalHistory: {
            type: {
            physician: String,
            allergies: [String],
            conditions: [String],
            pastSurgeries: [String],
            medications: [String],
            immunizations: [String],
            },
        },
    
    })

    const User = mongoose.models.User || mongoose.model("User" , userSchema)
    export default User;
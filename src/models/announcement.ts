import mongoose from 'mongoose'

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        required: true,
        enum: ['discount', 'closed', 'other'], // Define allowed types
    },
    duration: {
        from: {
            type: Date,
            required: true,
        },
        to: {
            type: Date,
            required: true,
        },
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], // Define allowed statuses
        default: 'active',
    },
}, {
    timestamps: true,
})

const Announcement = mongoose.models.Announcement || mongoose.model("Announcement", announcementSchema);
export default Announcement;
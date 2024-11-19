import mongoose from 'mongoose'

const servicesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    image: {
        type: String
    }
}, {
    timestamps: true,
})

const Services = mongoose.models.Services || mongoose.model("Services", servicesSchema);
export default Services;
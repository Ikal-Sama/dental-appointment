"use server"

import { dbConnect } from "@/lib/mongo-connect"
import { ServicesSchema } from "@/lib/validateForm"
import Services from "@/models/services"
import { z } from "zod"


export const createServices = async(values: z.infer<typeof ServicesSchema>) => {
    try {
        await dbConnect()
        const existingServices = await Services.findOne({
            name: values.name
        });
        if(existingServices) {
            return {error: 'Service already exists', success: false}
        }
        const services = await Services.create({
            name: values.name,
            description: values.description,
            price: values.price,
            duration: values.duration,
            image: values.image
        })
        return {success: true, data: services}
    } catch (error) {
        return {success: false, error: 'Something went wrong'}
    }
}

export const getAllServices = async () => {
    try {
        await dbConnect()
        const services = await Services.find()
        return services;
    } catch (error) {
        return {success: false, error: "Something went wrong"}
    }
}

export const getServiceById = async(id: string) => {
    try {
        await dbConnect()
        const service = await Services.findById(id)
        if(!service) {
            return {error: 'Service not found', success: false}
        }
        return {success: true, data: service};
    } catch (error) {
        return {success: false, error: 'Something went wrong'}
    }
}

export const updateService = async(serviceId: string, values: z.infer<typeof ServicesSchema> ) => {
    try {
        const service = await Services.findByIdAndUpdate(serviceId, {
            name: values.name,
            description: values.description,
            price: values.price,
            duration: values.duration,
            image: values.image
        }, {new: true})
        return {success: true, data: service}
    } catch (error) {
        return {success:false, error: 'Something went wrong updating the service'}
    }
}

export const deleteService = async(serviceId: string) => {
    try {
        await Services.findByIdAndDelete(serviceId)
        return {success: true, message: "Service Deleted Successfully"}
    } catch (error) {
        return {success: false, error: 'Something went wrong deleting the service'}
    }
}

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

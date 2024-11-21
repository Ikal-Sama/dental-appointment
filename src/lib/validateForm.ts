import * as z from 'zod'

export const LoginSchema =z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1,{
        message: "Password is required"
    }),
})

export const RegisterSchema =z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6,{
        message: "Minimum 6 characters required"
    }),
    confirmPassword: z.string().min(6,{
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1,{
        message: "Name is required"
    }),
})


export const EditProfile =z.object({
   
    name: z.string().min(1,{
        message: "Name is required"
    }),
    age: z.string().min(1,{
        message: "Age is required"
    }),
    address: z.string().min(1,{
        message: "Address is required"
    }),
    bio: z.string().min(1,{
        message: "bio is required"
    }),
})

export const EditSecurity =z.object({
    oldPassword: z.string().min(5,{
        message: "Old password is required"
    }),
    newPassword: z.string().min(5,{
        message: "New password is required"
    }),
    confirmNewPassword: z.string().min(5,{
        message: "Confirm password is required"
    }),
    email: z.string().min(1,{
        message: "email is required"
    }),
})

export const AppointmentSchema = z.object({
    service: z.string(),
    date: z.string(),
    hour: z.string(),
    patientName: z.string(),
    patientPhone: z.string(),
})

export const medicalHistorySchema = z.object({
    physician: z.string(),
    allergies: z.array(z.string()),
    conditions: z.array(z.string()),
    pastSurgeries: z.array(z.string()),
    medications: z.array(z.string()),
    immunizations: z.array(z.string()),
    allergy: z.string(),
    condition: z.string(),
    pastSurgerry: z.string(),
    medication: z.string(),
    immunization: z.string(),
})

export const ServicesSchema = z.object({
    name: z.string().min(1, "Name is required"), // Ensure it's not empty
    description: z.string().min(1, "Description is required"), // Ensure it's not empty
    price: z.preprocess(
      (value) => Number(value),
      z.number().positive("Price must be a positive number") // Prevent zero and negative values
    ),
    duration: z.preprocess(
      (value) => Number(value),
      z.number().positive("Duration must be a positive number") // Prevent zero and negative values
    ),
    image: z.string().min(1, "Image is required"), // Ensure the image field is not empty
 });

export const StaffSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6,{
        message: "Minimum 6 characters required"
    }),
    confirmPassword: z.string().min(6,{
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1,{
        message: "Name is required"
    }),
    role: z.string().min(1,{
        message: "Role is required"
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attach the error to the `confirmPassword` field
});
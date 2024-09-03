"use server"

import { dbConnect } from '@/lib/mongo-connect';
import {auth, signIn, signOut} from '@/auth'
import User from '@/models/user-model';
import bcrypt from 'bcryptjs'
import { useParams } from 'next/navigation';
import { getUserByEmail } from '@/lib/queries';
import { revalidatePath } from 'next/cache';




interface RegisterProps{
    name: string;
    email: string;
    password: string;
}

interface Params{
    id: string;
    name: string;
    address: string;
    age: number;
    bio: string;
    image: string;
}

interface SecurityParams{
    email: string;
    oldPassword: string;
    password: string;
}

// export async function doSocialLogin(formData: any){
//     const action = formData.get('action');
//     await signIn(action, {redirectTo: "/"})
// }

export async function doLogout() {
    await signOut({redirectTo: '/'})
}

//TODO: Credential Login using Authjs
export async function doCredentialLogin(formData: any){
    try {
        const response = await signIn("credentials", {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        });
        if (response?.error) {
          return response;
      }
     

      // Assuming the response contains user information including role
      const user = await getUserByEmail(formData.get('email'));
      if (response.status === 200) {
        if (user.status === "deactivate") {
          return { error: "Your account is deactivated. Please contact an administrator." };
        }
      }
      return { ...response, role: user.role, status: user.status };
    } catch (error: any) {
        throw new Error(error); 
    }
}



export async function register({
    name,
    email,
    password
}: RegisterProps){
    try {
        await dbConnect();

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return {error: "Email already in use!"}
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        })
    
        await newUser.save()  
        return { success: "User created successfuly!"}
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getUserById(userId: any){
    try {
        // const session = await auth()
        // userId = session?.user?.id
        // await dbConnect();
        const user = await User.findById(userId);
        if(!user) {
            return {error: "User not found!"}
        }
        return {user}
    } catch (error) {
        return {error: error}

    }
}

export async function editUserProfile({
    name,
    bio,
    address,
    age,
    image,
  }: Params) {
    try {

        const session = await auth()

      await dbConnect();
      const user = await User.findById(session?.user?.id);
  
      if (!user) {
        return { error: "User not found!" }; // Return a plain object
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        session?.user?.id,
        {
          name,
          bio,
          address,
          age,
          image,
        },
        { new: true }
      );
  
      return { success: "User Updated Successfully", updatedUser };
    } catch (error: any) {
      console.error("Error updating user:", error);
      // Return a plain error message string instead of an Error object
      return { error: error.message || "An error occurred while updating the profile." };
    }
  }

  export async function changeSecurity({
    oldPassword,
    password,
    email
  }:SecurityParams){
    try {
        const session = await auth()
        await dbConnect();
        const user = await User.findById(session?.user?.id);
        
        if (!user) {
          return { error: "User not found!" }; // Return a plain object
        }

        if (!user.password) {
            return { error: "Password not set!" }; // Return a plain object
        }

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
          return { error: "Incorrect old password" };
        }
    
        // Update password and email if the old password is correct
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUserPassword = await User.findByIdAndUpdate(
          session?.user?.id,
          {
            password: hashedPassword,
            email,
          },
          { new: true }
        );
        revalidatePath("/profile")
        
        return { success: "User Updated Successfully" };

    } catch (error: any) {
        console.log(error);
        return { error: error.message || "An error occurred while updating the password." };
    }
  }

interface medicalHistoryProps{
  physician: string;
  allergies: string[];
  conditions: string[];
  pastSurgeries: string[];
  medications: string[];
  immunizations: string[];
}

  export async function addMedicalHistory({
    physician,
  allergies,
  conditions,
  pastSurgeries,
  medications,
  immunizations,
  }: medicalHistoryProps) {
    try {
      const session = await auth()
      const userId = session?.user?.id
      await dbConnect()

      const user = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            "medicalHistory.physician": physician,
          },
          $push: {
            "medicalHistory.allergies": { $each: allergies, $slice: -5 },
            "medicalHistory.conditions": { $each: conditions, $slice: -5 },
            "medicalHistory.pastSurgeries": { $each: pastSurgeries, $slice: -5 },
            "medicalHistory.medications": { $each: medications, $slice: -5 },
            "medicalHistory.immunizations": { $each: immunizations, $slice: -5 },
          },
        },
        { new: true }
      );
      
    if (!user) {
      throw new Error("User not found");
    }

      const plainUser = JSON.parse(JSON.stringify(user)); // Convert to plain object
      console.log(plainUser);
    
      return { success: "Medical history updated successfully", user: plainUser }

    } catch (error: any) {
      console.log(error);
      
      return {error: error.message}
    }
  }
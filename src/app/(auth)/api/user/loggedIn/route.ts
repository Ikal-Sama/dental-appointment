import { auth } from "@/auth";
import { dbConnect } from "@/lib/mongo-connect";
import User from "@/models/user-model";
import { NextResponse } from "next/server";




export async function GET(){
    try {
        const session = await auth()
        const loggedIn = session?.user;
        const id = loggedIn?.id

        const loggedInUser = await User.findById(id);
        if(!loggedInUser){
            return NextResponse.json({error: "Users not found"}, {
                status: 400
            })
        }

        return NextResponse.json({loggedInUser})
    } catch (error) {
        return NextResponse.json({error: error}, {
            status: 500
        })
    }
}
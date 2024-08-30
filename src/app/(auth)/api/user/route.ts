import { dbConnect } from "@/lib/mongo-connect";
import User from "@/models/user-model";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnect();
        const user = await User.find();
        if(!user) {
            return NextResponse.json({error: "Users not found"}, {
                status: 400
            })
        }
        return NextResponse.json({user})
        
    } catch (error) {
        return NextResponse.json({error: error}, {
            status: 500
        })

    }
}
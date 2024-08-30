import { dbConnect } from "@/lib/mongo-connect";
import User from "@/models/user-model";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }){
    try {
        await dbConnect();
        const user = await User.findById(params.id).populate('medicalHistory');
        if(!user) {
            return NextResponse.json({error: "User not found"}, {
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






// export async function PUT(request: Request, { params }: { params: { id: string } }){
//     try {
//         const body = await request.json();
//         const {email, name, age, bio, address, image} = body;
//         await dbConnect();
//         const user = await User.findById(params.id);
//         if(!user) {
//             return NextResponse.json({error: "User not found"}, {
//                 status: 400
//             })
//         }

//         const updatedUser = await User.findByIdAndUpdate(params.id, {
//             name,
//             email,
//             bio,
//             age,
//             address,
//             image
//         }, {new: true})
//         return NextResponse.json({updatedUser})
        
//     } catch (error) {
//         return NextResponse.json({error: error}, {
//             status: 500
//         })

//     }
// }
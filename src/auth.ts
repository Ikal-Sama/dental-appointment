import NextAuth from 'next-auth'
import google from 'next-auth/providers/google';
import github from 'next-auth/providers/github';
import credentials from 'next-auth/providers/credentials'

import { authConfig } from './auth.config';
import User from './models/user-model';
import bcrypt from 'bcryptjs'


export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig as any,
    providers: [
        credentials({
            async authorize(credentials: any){
                if(credentials === null) return null;
                try {
                    const user =  await User.findOne({
                        email: credentials?.email
                    })                    

                    if(user){
                        if (user.status === "deactivate") {
                            throw new Error("User is deactivated");
                          }
                        const isMatch = await bcrypt.compare(credentials.password, user.password)
                        if(isMatch){
                            return {
                                id: user._id.toString(), 
                                email: user.email,
                                name: user.name,
                                age: user.age,
                                address: user.address,
                                bio: user.bio,
                                role: user.role,
                                status: user.status
                              };
                        }else{
                            throw new Error("Email or Password is not correct")
                        }
                    }else{
                        throw new Error("User not found")
                    }

                } catch (error: any) {
                    throw new Error(error.message)
                }
            }
        }),
        google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization:{
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization:{
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ]
})
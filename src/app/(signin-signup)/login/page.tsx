import { auth } from "@/auth";
import { LoginForm } from "@/components/users/login-form";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import image1 from "../../../../public/assets/images/image1.jpg";

export default async function page() {
  const session = await auth();
  const loggedIn = session?.expires;

  if (loggedIn) {
    redirect("/");
  }
  return (
    <div className='flex flex-col lg:flex-row gap-10'>
      <div>
        <LoginForm />
      </div>
      <div className='w-full flex flex-col'>
        <h1 className='text-3xl font-semibold text-teal-500'>
          Gonzales Dental Clinic.
        </h1>
        <p className='text-muted-foreground mt-3 text-sm mb-5'>
          We strive to provide the best possible dental care to our patients.
          Our staff is skilled and experienced, and we always strive to provide
          the best possible dental experience for our patients.
        </p>
        <div className='max-w-[50rem] max-h-[24rem]'>
          <Image
            src={image1}
            alt='login'
            width={300}
            height={300}
            className=' w-full h-full object-fill'
          />
        </div>
      </div>
    </div>
  );
}

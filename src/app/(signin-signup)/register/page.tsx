import { auth } from "@/auth";
import { RegisterForm } from "@/components/users/register-form";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();
  const loggedIn = session?.expires;

  if (loggedIn) {
    redirect("/");
  }

  return (
    <div className="flex gap-10">
      <div>
        <RegisterForm />
      </div>
      <div className="w-full flex flex-col">
        <h1 className="text-3xl font-semibold text-teal-500">
          Gonzales Dental Clinic
        </h1>
        <p className="text-muted-foreground mt-3 text-sm mb-5">
          We strive to provide the best possible dental care to our patients.
          Our staff is skilled and experienced, and we always strive to provide
          the best possible dental experience for our patients.
        </p>
        <div className="max-w-[50rem] max-h-[24rem]">
          <Image
            src="/assets/services-1.jpg"
            alt="login"
            width={300}
            height={300}
            className=" w-full h-full object-fill"
          />
        </div>
      </div>
    </div>
  );
}

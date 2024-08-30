import { getUserAppointments } from "@/app/actions/appointment";
import { auth } from "@/auth";
import AppointmentsTabs from "@/components/users/appointments";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function MyAppointmentPage() {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;
  //@ts-ignore
  const appointments = await getUserAppointments(userId);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My appointments</h1>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm hover:text-zinc-500"
        >
          <ArrowLeft className="w-5 h-5 stroke-[1.25px]" />
          Go Back
        </Link>
      </div>

      <div className="mt-5">
        <AppointmentsTabs userId={userId ?? ""} appointments={appointments} />
      </div>
    </div>
  );
}

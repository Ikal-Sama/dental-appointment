import { getOngoingAppointments } from "@/app/actions/appointment";
import OngoingAppointments from "@/components/admin/ongoing-appointments";
import React from "react";

export default async function page() {
  const appoinments = await getOngoingAppointments();
  const ongoing = appoinments.ongoingAppointments as any;
  return (
    <div>
      <h1 className="my-5 text-xl font-semibold">
        Proceeding/Ongoing Appointments
      </h1>
      <OngoingAppointments ongoing={ongoing} />
    </div>
  );
}

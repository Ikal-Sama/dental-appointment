import { getComletedAppointment } from "@/app/actions/appointment";
import CompletedAppointments from "@/components/admin/completed-appointments";
import React from "react";

export default async function page() {
  const appointments = await getComletedAppointment();
  const completed = appointments.completedAppointments as any;
  return (
    <div>
      <h1 className="my-5 text-xl font-semibold">Completed Appointments</h1>
      <CompletedAppointments completed={completed} />
    </div>
  );
}

"use client";

import React from "react";
import AppointmentsDetails from "./appointments-details";
import { useParams } from "next/navigation";

export default function AppointmentDetailsWrapper() {
  const params = useParams();
  const appointmentId = params.id as string;
  return (
    <div>
      <AppointmentsDetails appointmentId={appointmentId} />
    </div>
  );
}

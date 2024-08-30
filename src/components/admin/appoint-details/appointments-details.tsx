import { getAppointmentsById } from "@/app/actions/appointment";
import React, { useEffect, useState } from "react";
import { formatTime } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export default function AppointmentsDetails({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const [appointments, setAppointments] = useState(null);
  const [error, setError] = useState(null);

  // console.log(appointments);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await getAppointmentsById(appointmentId);
        //@ts-ignore
        setAppointments(response.appointments);
      } catch (error: any) {
        setError(error.message);
      }
    }
    fetchAppointments();
  }, [appointmentId]);

  return (
    <div>
      <Card className="p-5">
        <h1 className="font-semibold text-lg">Basic Information</h1>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <p>
            <span className="font-semibold">Patient Name: </span>
            {
              //@ts-ignore
              appointments?.patientName
            }
          </p>
          <p>
            <span className="font-semibold">Phone: </span>
            {
              //@ts-ignore
              appointments?.patientPhone
            }
          </p>
          <p>
            <span className="font-semibold">Scheduled Date: </span>
            {
              //@ts-ignore
              new Date(appointments?.date).toLocaleDateString()
            }
          </p>
          <p>
            <span className="font-semibold">Scheduled Time: </span>
            {
              //@ts-ignore
              appointments?.hour ? formatTime(appointments.hour) : ""
            }
          </p>
          <p>
            <span className="font-semibold">Service: </span>

            {
              //@ts-ignore
              appointments?.service
            }
          </p>
        </div>
      </Card>

      <Card className="mt-10 p-5">
        <h1 className="font-semibold text-lg">Medical History</h1>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div>
            <h2 className="font-semibold">Allergies:</h2>
            <ul className="flex gap-2 px-3">
              {
                //@ts-ignore
                appointments?.userId?.medicalHistory?.allergies?.map(
                  //@ts-ignore
                  (allergy, index) => (
                    <li key={index}>{`${allergy},`}</li>
                  )
                )
              }
            </ul>
          </div>

          <div>
            <h2 className="font-semibold">Conditions:</h2>
            <ul className="flex gap-2 px-3 ">
              {
                //@ts-ignore
                appointments?.userId?.medicalHistory?.conditions?.map(
                  //@ts-ignore
                  (condition, index) => (
                    <li key={index}>{`${condition},`}</li>
                  )
                )
              }
            </ul>
          </div>

          <div>
            <h2 className="font-semibold">Immunizations:</h2>
            <ul className="flex gap-2 px-3">
              {
                //@ts-ignore
                appointments?.userId?.medicalHistory?.immunizations?.map(
                  //@ts-ignore
                  (immunization, index) => (
                    <li key={index}>{`${immunization},`}</li>
                  )
                )
              }
            </ul>
          </div>

          <div>
            <h2 className="font-semibold">Medications:</h2>
            <ul className="flex gap-2 px-3">
              {
                //@ts-ignore
                appointments?.userId?.medicalHistory?.medications?.map(
                  //@ts-ignore
                  (medication, index) => (
                    <li key={index}>{`${medication},`}</li>
                  )
                )
              }
            </ul>
          </div>

          <div>
            <h2 className="font-semibold">Past Surgeries:</h2>
            <ul className="flex gap-2 px-3">
              {
                //@ts-ignore
                appointments?.userId?.medicalHistory?.pastSurgeries?.map(
                  //@ts-ignore
                  (surgery, index) => (
                    <li key={index}>{`${surgery},`}</li>
                  )
                )
              }
            </ul>
          </div>

          <div>
            <h2 className="font-semibold">Physician:</h2>
            <p className="px-3">
              {
                //@ts-ignore
                appointments?.userId?.medicalHistory?.physician
              }
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

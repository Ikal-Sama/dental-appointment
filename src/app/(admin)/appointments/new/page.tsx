import { getNewAppointment } from "@/app/actions/appointment";
import NewAppointments from "@/components/admin/new-appointments";

export default async function page() {
  const appointments = await getNewAppointment();
  const newappointments = appointments.newAppointments as any;

  return (
    <div>
      <h1 className="my-5 text-xl font-semibold">New Appointments</h1>
      <NewAppointments newappointments={newappointments} />
    </div>
  );
}

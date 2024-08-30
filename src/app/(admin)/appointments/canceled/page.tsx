import { getCanceledAppointment } from "@/app/actions/appointment";
import CanceledAppointments from "@/components/admin/canceled-appointments";

export default async function page() {
  const appointments = await getCanceledAppointment();
  const canceled = appointments.canceledAppointments as any;
  return (
    <div>
      <h1 className="my-5 text-xl font-semibold">Canceled Appointments</h1>
      <CanceledAppointments canceled={canceled} />
    </div>
  );
}

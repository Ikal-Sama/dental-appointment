import { auth } from "@/auth";
import AppointmentDetailsWrapper from "@/components/admin/appoint-details/appoint-detailsWrapper";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  const loggedIn = session?.user;

  //@ts-ignore
  if (!["admin", "secretary"].includes(loggedIn?.role)) {
    redirect("/appointments/new");
  }
  return (
    <div>
      <h1 className="my-5 text-xl font-semibold">Appointments Details</h1>
      <AppointmentDetailsWrapper />
    </div>
  );
}

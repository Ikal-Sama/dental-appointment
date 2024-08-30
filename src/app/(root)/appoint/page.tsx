import { auth } from "@/auth";
import { Card } from "@/components/ui/card";
import AppointmentForm from "@/components/users/appointment-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AppointmentPage() {
  const session = await auth();
  const loggedIn = session?.user;
  const userId = loggedIn?.id;

  if (!loggedIn) {
    redirect("/login");
  }
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create new appointment</h1>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm hover:text-zinc-500"
        >
          <ArrowLeft className="w-5 h-5 stroke-[1.25px]" />
          Go Back
        </Link>
      </div>

      <Card className="mt-10 p-8">
        <h1 className=" font-semibold mb-5">Appointment Form</h1>
        <AppointmentForm userId={userId ?? ""} />
      </Card>
    </div>
  );
}

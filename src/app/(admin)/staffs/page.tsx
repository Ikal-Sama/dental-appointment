import { auth } from "@/auth";
import AllStaff from "@/components/admin/all-staff";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  const loggedIn = session?.user;
  //@ts-ignore
  if (loggedIn?.role !== "admin") {
    redirect("/dashboard");
  }
  return (
    <div>
      <h1 className="my-5 text-xl font-semibold">All Staff</h1>
      <AllStaff />
    </div>
  );
}

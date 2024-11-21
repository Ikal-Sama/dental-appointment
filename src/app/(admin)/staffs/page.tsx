import { auth } from "@/auth";
import AddStaffMember from "@/components/admin/AddStaffMember";
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
      <div className='flex justify-between items-center'>
        <h1 className='my-5 text-xl font-semibold'>All Staff</h1>
        <AddStaffMember />
      </div>
      <AllStaff />
    </div>
  );
}

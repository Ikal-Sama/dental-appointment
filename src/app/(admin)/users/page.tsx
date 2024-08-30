import AllUser from "@/components/admin/all-user";
import { auth } from "@/auth";
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
      <h1 className="my-5 text-xl font-semibold">All Users</h1>
      <AllUser />
    </div>
  );
}

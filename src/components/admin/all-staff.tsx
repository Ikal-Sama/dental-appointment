// import { columns } from "@/app/(admin)/staffs/columns";
import { getAllUsers } from "@/app/actions/admin";
import { Card } from "../ui/card";
import { DataTable } from "../ui/data-table";
import { columns } from "@/app/(admin)/staffs/columns";

export default async function AllStaff() {
  const users = await getAllUsers();

  const filteredUsers = users.allUsers?.filter(
    (user) => user.role === "secretary" || user.role === "frontdesk"
  ) as any;

  return (
    <Card className='p-2'>
      <DataTable columns={columns} data={filteredUsers} />
    </Card>
  );
}

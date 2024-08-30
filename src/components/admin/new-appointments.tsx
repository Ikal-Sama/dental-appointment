import { columns } from "@/app/(admin)/appointments/new/columns";
import { DataTable } from "../ui/data-table";

export default function NewAppointments({
  newappointments,
}: {
  newappointments: any;
}) {
  return (
    <div>
      <DataTable columns={columns} data={newappointments} />
    </div>
  );
}

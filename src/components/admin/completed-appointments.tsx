import React from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "@/app/(admin)/appointments/completed/columns";

export default function CompletedAppointments({
  completed,
}: {
  completed: any;
}) {
  return (
    <div>
      <DataTable columns={columns} data={completed} />
    </div>
  );
}

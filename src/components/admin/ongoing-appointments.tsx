import React from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "@/app/(admin)/appointments/ongoing/columns";

export default function OngoingAppointments({ ongoing }: { ongoing: any }) {
  return (
    <div>
      <DataTable columns={columns} data={ongoing} />
    </div>
  );
}

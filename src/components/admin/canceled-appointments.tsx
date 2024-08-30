import React from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "@/app/(admin)/appointments/completed/columns";

function CanceledAppointments({ canceled }: { canceled: any }) {
  return (
    <div>
      <DataTable columns={columns} data={canceled} />
    </div>
  );
}

export default CanceledAppointments;

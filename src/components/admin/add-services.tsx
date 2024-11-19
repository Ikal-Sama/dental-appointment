import React from "react";
import { Card } from "../ui/card";
import { DataTable } from "../ui/data-table";
import { columns } from "@/app/(admin)/addservices/columns";
import { getAllServices } from "@/app/actions/services";

export default async function AddServices() {
  const services = (await getAllServices()) as any;

  return (
    <div>
      <DataTable columns={columns} data={services} />
    </div>
  );
}

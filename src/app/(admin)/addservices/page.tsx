import AddServices from "@/components/admin/add-services";
import AddServicesModal from "@/components/admin/add-services-modal";
import { Stethoscope } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div>
      <h1 className='my-5 text-xl font-semibold flex gap-2'>
        <Stethoscope />
        Services
      </h1>
      <div className='flex justify-end'>
        <AddServicesModal />
      </div>
      <AddServices />
    </div>
  );
}

"use client";
import { getServiceById } from "@/app/actions/services";
import UpdateCardDetail from "@/components/admin/update-carddetail";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function UpdateServicePage() {
  return (
    <div>
      <h1 className='my-5 text-xl font-semibold flex gap-2'>Service Details</h1>
      <UpdateCardDetail />
    </div>
  );
}

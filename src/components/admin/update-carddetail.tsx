"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { getServiceById } from "@/app/actions/services";
import UpdateCardForm from "./UpdateCardForm";
import { useParams } from "next/navigation";

export default function UpdateCardDetail() {
  const params = useParams();
  const serviceId = params.id;

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchServiceById = async () => {
      const res = await getServiceById(serviceId as string);
      if (res.success) {
        setData(res.data);
      } else {
        console.log(res.error);
        // Handle error or display an error message here.
      }
    };
    fetchServiceById();
  }, []);
  return (
    <div>
      <Card className='p-2'>
        <UpdateCardForm data={data} />
      </Card>
    </div>
  );
}

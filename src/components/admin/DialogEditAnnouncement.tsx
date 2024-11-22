"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EditAnnouncementForm from "./EditAnnouncementForm";
import { getAppointmentsById } from "@/app/actions/appointment";
import { getAnnouncementById } from "@/app/actions/announcement";

export default function DialogEditAnnouncement({
  announcementId,
}: {
  announcementId: string;
}) {
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    const fetchAnnouncementsById = async () => {
      const res = await getAnnouncementById(announcementId);
      if (res.success) {
        setData(res.data);
      }
      console.log(data);
    };

    fetchAnnouncementsById();
  }, [announcementId]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button id='trigger-edit-announce'></button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditAnnouncementForm data={data} />
      </DialogContent>
    </Dialog>
  );
}

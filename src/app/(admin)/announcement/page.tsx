import Announcements from "@/components/admin/Announcements";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import AnnouncementForm from "@/components/users/announcement-form";
import { useAnnouncementStore } from "@/lib/store/announcement";
import React, { useState } from "react";

export default function Announcement() {
  return (
    <div>
      <h1 className='my-5 text-xl font-semibold'>Announcement</h1>
      <Card className='w-[32rem] p-4'>
        <h1 className='my-2 font-semibold'>Create announcement</h1>
        <AnnouncementForm />
      </Card>

      <div className='mt-5'>
        <h1 className='text-xl font-bold my-5'>List of Announcements</h1>
        <Announcements />
      </div>
    </div>
  );
}

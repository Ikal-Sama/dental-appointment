"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAnnouncementStore } from "@/lib/store/announcement";
import React, { useState } from "react";

export default function Announcement() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const setAnnouncement = useAnnouncementStore(
    (state) => state.setAnnouncement
  );

  const handleSave = () => {
    if (title && description) {
      const newAnnouncement = {
        id: Date.now(), // Generate a unique ID
        title,
        description,
        isOpen: true,
      };
      setAnnouncement(newAnnouncement);
      toast({
        title: "Created Successfully",
        description: `Announcement created!`,
      });
    } else {
      toast({
        title: "Please Fill in the details",
        description: `Somenthing wrong...`,
      });
    }
  };

  return (
    <div>
      <h1 className='my-5 text-xl font-semibold'>Announcement</h1>
      <Card className='w-[32rem] p-4'>
        <h1 className='my-2 font-semibold'>Create announcement</h1>
        <div className='flex flex-col gap-3'>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Write description here...'
          />
          <Button onClick={handleSave}>Save changes</Button>
        </div>
      </Card>
    </div>
  );
}

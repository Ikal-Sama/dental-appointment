"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteAnnouncementById } from "@/app/actions/announcement";
import { useToast } from "../ui/use-toast";

export default function AlertAnnouncementDelete({
  announcementId,
}: {
  announcementId: string;
}) {
  const { toast } = useToast();
  const handleDeleteAnnouncement = async () => {
    const res = await deleteAnnouncementById(announcementId);
    if (res.success) {
      toast({
        title: "Announcement deleted",
        description: `Announcement is successfully deleted`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to delete announcement",
        description: `Failed to delete announcement: ${res.error}`,
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button id='trigger-delete-announce'></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to{" "}
            <span className='text-red-500'>delete</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            announcement and remove the data from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAnnouncement}
            className='bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300'
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

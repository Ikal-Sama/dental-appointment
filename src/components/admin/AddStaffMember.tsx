import React from "react";
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
import { Plus } from "lucide-react";
import AddStaffForm from "./AddStaffForm";

export default function AddStaffMember() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className='w-4 h-4' />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add New Staff</DialogTitle>
        </DialogHeader>
        <AddStaffForm />
      </DialogContent>
    </Dialog>
  );
}

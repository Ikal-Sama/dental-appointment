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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import ServicesForm from "./services-form";

export default function AddServicesModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className='w-4 h-4' /> Add New
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full'>
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
          <DialogDescription>Create a new services...</DialogDescription>
        </DialogHeader>
        <ServicesForm />
      </DialogContent>
    </Dialog>
  );
}

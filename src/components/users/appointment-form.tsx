"use client";

import { AppointmentSchema } from "@/lib/validateForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createAppointment } from "@/app/actions/appointment";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { CircleAlert } from "lucide-react";

export default function AppointmentForm({ userId }: { userId: string }) {
  const { toast } = useToast();
  const [appointmentDetails, setAppointmentDetails] = useState<{
    id: string;
    patientName: string;
    service: string;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      service: "",
      date: "",
      hour: "",
      patientName: "",
      patientPhone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentSchema>) {
    console.log("onSubmit called with values:", values);
    // const transformedValues = {
    //   ...values,
    //   date: new Date(values.date),
    // };
    // if (dialogOpen) return;
    await createAppointment(
      //@ts-ignore
      { id: userId, ...values }
    )
      .then((data) => {
        console.log("createAppointment response:", data);
        if (data.success) {
          toast({
            title: "Created Successfull",
            description: "Appointment created successfully",
          });
          setAppointmentDetails({
            id: data.newAppointment._id,
            patientName: data.newAppointment.patientName,
            service: data.newAppointment.service,
          });
          setDialogOpen(true);
        } else {
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: `${data.error}`,
          });
        }
      })
      .catch((e) => {
        console.error("Error creating appointment:", e);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Error creating appointment",
        });
      });
  }
  return (
    <>
      <Form {...form}>
        <div className="grid grid-cols-2 gap-10">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-2 mt-3">
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    {/* <Input placeholder="shadcn" {...field} /> */}
                    <Select
                      onValueChange={(value) => {
                        form.setValue("service", value);
                      }}
                      defaultValue={form.getValues("service")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="cleaning">Teeth Cleaning</SelectItem>
                        <SelectItem value="filling">Teeth Filling</SelectItem>
                        <SelectItem value="braces">Teeth Braces</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patientPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="shadcn" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hour</FormLabel>
                    <FormControl>
                      <Input type="time" placeholder="shadcn" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Create Appointment</Button>
          </form>
          <div>
            <div className="mt-3">
              <ul className="list-disc text-sm text-zinc-500 w-[30rem]">
                <h1 className="text-xl text-emerald-500 mb-3">Read Me:</h1>
                <li>Make sure to input all fields</li>
                <li>Our working hours is 9:00 AM - 4:00 PM</li>
                <li>Our working days are Monday - Friday</li>
                <li>
                  You can't create another appointment if you already have
                  ongoing appointment
                </li>
                <li>
                  Your account will be deactivated if you book an appointment
                  and fail to show up three times.
                </li>
              </ul>
              <Image
                src="/assets/fillup.jpg"
                alt="Image fill"
                width={500}
                height={50}
                className="object-contain "
              />
            </div>
          </div>
        </div>
      </Form>
      {appointmentDetails && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Take a screenshot</DialogTitle>
              <DialogDescription>
                Please take a screenshot of the appointment details. This will
                help us track your appointments more efficiently.
              </DialogDescription>
            </DialogHeader>
            <div>
              {appointmentDetails.id && (
                <p>Appointment ID: {appointmentDetails.id}</p>
              )}
              {appointmentDetails.patientName && (
                <p>Patient Name: {appointmentDetails.patientName}</p>
              )}
              {appointmentDetails.service && (
                <p>Service Type: {appointmentDetails.service}</p>
              )}
            </div>
            <DialogFooter>
              <span className="flex flex-col gap-2 ">
                <span className="font-bold flex gap-1 text-sm text-red-500">
                  <CircleAlert className="w-5 h-5 " /> NOTE:
                </span>
                <span className="text-sm text-muted-foreground">
                  Your account will be deactivated if you book an appointment
                  and fail to show up three times.
                </span>
              </span>
            </DialogFooter>
            {/* <DialogClose asChild>
        <Button>Close</Button>
      </DialogClose> */}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

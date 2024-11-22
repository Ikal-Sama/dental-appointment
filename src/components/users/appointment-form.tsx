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
import {
  createAppointment,
  getAllAppointments,
} from "@/app/actions/appointment";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function AppointmentForm({
  userId,
  servicesName,
}: {
  userId: string;
  servicesName: string;
}) {
  const { toast } = useToast();
  const searchParams = useSearchParams(); // Get the query parameters
  const defaultService = searchParams.get("service") || "";

  const [appointmentDetails, setAppointmentDetails] = useState<{
    id: string;
    patientName: string;
    patientPhone: number;
    service: string;
    date: Date;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [existingAppointments, setExistingAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointments = await getAllAppointments();
        //@ts-ignore
        setExistingAppointments(appointments.allAppointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      service: defaultService || "",
      date: "",
      hour: "",
      patientName: "",
      patientPhone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentSchema>) {
    const selectedDate = new Date(values.date).toISOString().split("T")[0];
    const selectedTime = values.hour;

    const existingAppointment = existingAppointments.find((appointment) => {
      const appointmentDate = new Date(appointment.date)
        .toISOString()
        .split("T")[0];
      return (
        appointmentDate === selectedDate && appointment.hour === selectedTime
      );
    });

    if (existingAppointment) {
      toast({
        variant: "destructive",
        title: "Time and Date slot already booked",
        description: "Please select another time slot and date",
      });
      return; // Prevent submission
    }

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
            patientPhone: data.newAppointment.patientPhone,
            date: data.newAppointment.date,
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
        <div className='grid grid-cols-2 gap-10'>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='flex flex-col gap-2 mt-3'>
              <FormField
                control={form.control}
                name='service'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    {/* <Input placeholder="shadcn" {...field} /> */}
                    <Select
                      onValueChange={(value) => {
                        form.setValue("service", value);
                      }}
                      defaultValue={defaultService}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a service' />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {
                          //@ts-ignore
                          servicesName.map((service: any) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='patientName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input placeholder='shadcn' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='patientPhone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='shadcn' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='hour'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hour</FormLabel>
                    <FormControl>
                      <Input
                        type='time'
                        {...field}
                        onFocus={(e) => e.target.showPicker()}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        {...field}
                        onFocus={(e) => e.target.showPicker()}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit'>Create Appointment</Button>
          </form>
          <div>
            <div className='mt-3'>
              <ul className='list-disc text-sm text-zinc-500 w-[30rem]'>
                <h1 className='text-xl text-emerald-500 mb-3'>Read Me:</h1>
                <li>Make sure to input all fields</li>
                <li>Our working hours is 9:00 AM - 4:00 PM</li>
                <li>Our working days are Monday - Sunday</li>
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
                src='/assets/fillup.jpg'
                alt='Image fill'
                width={500}
                height={50}
                className='object-contain '
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
              {appointmentDetails.patientPhone && (
                <p>Phone Number: {appointmentDetails.patientPhone}</p>
              )}
              {appointmentDetails.date && (
                <p>Date: {appointmentDetails.date.toLocaleDateString()}</p>
              )}
              {appointmentDetails.service && (
                <p>Service Type: {appointmentDetails.service}</p>
              )}
            </div>
            <DialogFooter>
              <span className='flex flex-col gap-2 '>
                <span className='font-bold flex gap-1 text-sm text-red-500'>
                  <CircleAlert className='w-5 h-5 ' /> NOTE:
                </span>
                <span className='text-sm text-muted-foreground'>
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

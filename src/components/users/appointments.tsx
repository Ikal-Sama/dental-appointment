"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "../ui/data-table";
import { columns } from "@/app/(root)/myappointments/columns";

export default function AppointmentsTabs({
  userId,
  appointments,
}: {
  userId: string;
  appointments: object;
}) {
  //@ts-ignore
  const newAppointments = appointments.appointments.filter(
    (item: any) => item.status === "new"
  );
  //@ts-ignore
  const ongoingAppointments = appointments.appointments.filter(
    (item: any) => item.status === "ongoing"
  );
  //@ts-ignore
  const doneAppointments = appointments.appointments.filter(
    (item: any) => item.status === "done"
  );
  //@ts-ignore
  const canceledAppointments = appointments.appointments.filter(
    (item: any) => item.status === "canceled"
  );

  return (
    <Tabs defaultValue="new" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-5">
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
        <TabsTrigger value="done">Done</TabsTrigger>
        <TabsTrigger value="canceled">Canceled</TabsTrigger>
      </TabsList>
      <TabsContent value="new" className="">
        {newAppointments.length > 0 ? (
          <Card className="p-5">
            <DataTable columns={columns} data={newAppointments} />
          </Card>
        ) : (
          <Card>
            <CardHeader className="text-center text-zinc-500">
              No New Appointments
            </CardHeader>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="ongoing" className="">
        {ongoingAppointments.length > 0 ? (
          <Card className="p-5">
            <DataTable columns={columns} data={ongoingAppointments} />
          </Card>
        ) : (
          <Card>
            <CardHeader className="text-center text-zinc-500">
              No Ongoing Appointments
            </CardHeader>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="done">
        {doneAppointments.length > 0 ? (
          <Card className="p-5">
            <DataTable columns={columns} data={doneAppointments} />
          </Card>
        ) : (
          <Card>
            <CardHeader className="text-center text-zinc-500">
              No Done Appointments
            </CardHeader>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="canceled">
        {canceledAppointments.length > 0 ? (
          <Card className="p-5">
            <DataTable columns={columns} data={canceledAppointments} />
          </Card>
        ) : (
          <Card>
            <CardHeader className="text-center text-zinc-500">
              No Canceled Appointments
            </CardHeader>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
}

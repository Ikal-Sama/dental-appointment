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
  // console.log(appointments);

  return (
    <Tabs defaultValue="new" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-5">
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
        <TabsTrigger value="done">Done</TabsTrigger>
        <TabsTrigger value="canceled">Canceled</TabsTrigger>
      </TabsList>
      <TabsContent value="new" className="">
        {
          //@ts-ignore
          appointments.appointments.filter((item: any) => item.status === "new")
            .length > 0 ? (
            //@ts-ignore
            appointments.appointments
              .filter((item: any) => item.status === "new")
              .map((item: any) => (
                <Card className="p-5">
                  <DataTable columns={columns} data={[item]} key={item._id} />
                </Card>
              ))
          ) : (
            <Card>
              <CardHeader className="text-center text-zinc-500">
                No New Appointments
              </CardHeader>
            </Card>
          )
        }
      </TabsContent>
      <TabsContent value="ongoing" className="">
        {
          //@ts-ignore
          appointments.appointments.filter(
            (item: any) => item.status === "ongoing"
          ).length > 0 ? (
            //@ts-ignore
            appointments.appointments
              .filter((item: any) => item.status === "ongoing")
              .map((item: any) => (
                <Card className="p-5">
                  <DataTable columns={columns} data={[item]} key={item.id} />
                </Card>
              ))
          ) : (
            <Card>
              <CardHeader className="text-center text-zinc-500">
                No Ongoing Appointments
              </CardHeader>
            </Card>
          )
        }
      </TabsContent>
      <TabsContent value="done">
        {
          //@ts-ignore
          appointments.appointments.filter(
            (item: any) => item.status === "done"
          ).length > 0 ? (
            //@ts-ignore
            appointments.appointments
              .filter((item: any) => item.status === "done")
              .map((item: any) => (
                <DataTable columns={columns} data={[item]} key={item._id} />
              ))
          ) : (
            <Card>
              <CardHeader className="text-center text-zinc-500">
                No Done Appointments
              </CardHeader>
            </Card>
          )
        }
      </TabsContent>
      <TabsContent value="canceled">
        {
          //@ts-ignore
          appointments.appointments.filter(
            (item: any) => item.status === "canceled"
          ).length > 0 ? (
            //@ts-ignore
            appointments.appointments
              .filter((item: any) => item.status === "canceled")
              .map((item: any) => (
                <DataTable columns={columns} data={[item]} key={item._id} />
              ))
          ) : (
            <Card>
              <CardHeader className="text-center text-zinc-500">
                No Canceled Appointments
              </CardHeader>
            </Card>
          )
        }
      </TabsContent>
    </Tabs>
  );
}

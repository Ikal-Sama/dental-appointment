import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Calendar,
  CalendarArrowUp,
  CalendarClock,
  CalendarX2,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAllAppointments,
  getNewAppointment,
  getOngoingAppointments,
} from "@/app/actions/appointment";
import { getAllUsers } from "@/app/actions/admin";

export default async function page() {
  const appointments = await getAllAppointments();
  const allAppointments = appointments.allAppointments;
  //@ts-ignore
  const newAppointments = await getNewAppointment();
  const newApp = newAppointments.newAppointments;

  const users = await getAllUsers();
  const allUsers = users.allUsers;
  const usersWithRoleUser = allUsers?.filter((user) => user.role === "user");

  const canceledAppointmentsCount = allAppointments?.filter(
    (appointment) => appointment.status === "canceled"
  ).length;

  const newAppointmentsCount = allAppointments?.filter(
    (appointment) => appointment.status === "new"
  ).length;

  const ongoingAppointmentsCount = allAppointments?.filter(
    (appointment) => appointment.status === "ongoing"
  ).length;

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {newAppointmentsCount}
            </div>
            <p className="text-xs text-muted-foreground">Appointments</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proceeding</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {ongoingAppointmentsCount}
            </div>
            <p className="text-xs text-muted-foreground">Appointments</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Canceled</CardTitle>
            <CalendarX2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {canceledAppointmentsCount}
            </div>
            <p className="text-xs text-muted-foreground">Appointments</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <CalendarArrowUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allAppointments?.length}</div>
            <p className="text-xs text-muted-foreground">Appointments</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex mt-10 gap-5 justify-evenly">
        <Card className="xl:col-span-2 w-full" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-col lg:flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Appointments</CardTitle>
              <CardDescription>
                Recent appointments from the store.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/appointments/new">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="">Date</TableHead>
                  <TableHead className="text-right">Service</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-y-scroll">
                {newApp?.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{data.patientName}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {data.patientPhone}
                      </div>
                    </TableCell>

                    <TableCell className="">
                      {new Date(data.date).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="text-right">{data.service}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5" className="w-full">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8 overflow-y-scroll ">
            {usersWithRoleUser?.map((data, index) => (
              <div className="flex items-center gap-4" key={index}>
                <Avatar className="hidden h-9 w-9 sm:flex">
                  {data.image ? (
                    <AvatarImage src={`${data.image}`} alt="Avatar" />
                  ) : (
                    <AvatarImage src="/assets/avatar.png" alt="Avatar" />
                  )}
                </Avatar>
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="grid gap-1 ">
                    <p className="text-sm font-medium leading-none">
                      {data.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {data.email}
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <p className="font-medium leading-none text-sm">
                      {data.appointments.length}
                    </p>
                    <span className="text-muted-foreground text-sm">
                      Appointments
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

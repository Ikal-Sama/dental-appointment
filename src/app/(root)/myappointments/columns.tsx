"use client";

import {
  userCancelAppointments,
  userDeleteAppointment,
} from "@/app/actions/appointment";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  Check,
  Edit,
  MoreHorizontal,
  Trash2,
  ArrowUpDown,
  Ban,
} from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Appointments = {
  id: string;
  patientName: string;
  patientPhone: number;
  service: string;
  date: Date;
  hour: string;
  status: "ongoing" | "done" | "canceled";
};

export const columns: ColumnDef<Appointments>[] = [
  {
    accessorKey: "patientName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "patientPhone",
    header: "Phone Number",
  },
  {
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date: Date = getValue() as any;
      return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    },
  },
  {
    accessorKey: "hour",
    header: "Hours",
    cell: ({ getValue }) => {
      const hour = getValue() as any;
      const [hours, minutes] = hour.split(":");
      const hoursNum = parseInt(hours);
      const ampm = hoursNum < 12 ? "AM" : "PM";
      const hours12 = hoursNum % 12 === 0 ? 12 : hoursNum % 12;
      return `${hours12}:${minutes} ${ampm}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as any;
      let badgeClass = "";
      switch (status) {
        case "new":
          badgeClass = "bg-orange-500 text-white";
          break;
        case "ongoing":
          badgeClass = "bg-blue-500 text-white";
          break;
        case "done":
          badgeClass = "bg-green-500 text-white";
          break;
        case "canceled":
          badgeClass = "bg-red-500 text-white";
          break;
        default:
          badgeClass = "bg-gray-500 text-white";
      }
      return (
        <span
          className={`badge ${badgeClass} text-xs font-bold py-1 px-2 rounded-full`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      //@ts-ignore
      const id = row.original._id;
      const { toast } = useToast();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await userDeleteAppointment(id)
                  .then((data) => {
                    if (data.success) {
                      toast({
                        title: "Appointment deleted",
                        description: `${data.success}`,
                      });
                    } else {
                      toast({
                        variant: "destructive",
                        title: "Something went wrong",
                        description: `${data.error}`,
                      });
                    }
                  })
                  .catch((e) => {
                    console.log(e.error);
                  });
              }}
              className="text-sm  text-red-500 flex items-center gap-2 p-1 hover:bg-zinc-100 cursor-pointer duration-200"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await userCancelAppointments(id)
                  .then((data) => {
                    if (data.success) {
                      toast({
                        title: "Appointment cancelled",
                        description: `${data.success}`,
                      });
                    } else {
                      toast({
                        variant: "destructive",
                        title: "Something went wrong",
                        description: `${data.error}`,
                      });
                    }
                  })
                  .catch((e) => {
                    console.log(e.error);
                  });
              }}
              className="text-sm  text-orange-500 flex items-center gap-2 p-1 hover:bg-zinc-100 cursor-pointer duration-200"
            >
              <Ban className="w-4 h-4" />
              Cancel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
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
import {
  Check,
  Edit,
  MoreHorizontal,
  Trash2,
  ArrowUpDown,
  Ban,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { markAppointmentAsDone } from "@/app/actions/admin";

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
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

function ActionsCell({ row }: { row: any }) {
  const id: any = row.original._id;
  const { toast } = useToast();

  const handleMarkAsDone = async () => {
    await markAppointmentAsDone(id).then((data) => {
      if (data.success) {
        toast({
          title: "Appointment marked as done",
          description: "The appointment has been marked as done.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: `${data.error}`,
        });
      }
    });
  };
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
          className="text-sm flex items-center gap-2 p-1 text-emerald-500 cursor-pointer hover:bg-zinc-100 focus:outline-none"
          onClick={handleMarkAsDone}
        >
          <Check className="w-4 h-4 " />
          Done
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

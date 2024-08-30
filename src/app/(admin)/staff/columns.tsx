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
import { Check, Edit, MoreHorizontal, Trash2, ArrowUpDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export type Users = {
  id: string;
  name: string;
  email: string;
  address: string;
  role: string;
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      //@ts-ignore
      const imageUrl = user.image ? user.image : "/assets/avatar.png"; // default image URL
      return (
        <div className="flex items-center gap-2">
          <img
            src={imageUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <span>{user.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  //   {
  //     accessorKey: "appointments",
  //     header: "Appointments",
  //     cell: ({ row }) => {
  //       // Access the appointments array and return its length
  //       const appointments = row.original.appointments;
  //       return appointments.length; // Display the number of appointments
  //     },
  //   },
  {
    id: "actions",
    cell: ({ row }) => {
      //@ts-ignore
      const id: any = row.original._id;
      const { toast } = useToast();
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link href={`/users/${id}`}>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </Link>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>See Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];

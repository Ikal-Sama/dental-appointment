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
import { useState } from "react";
import { roleChange } from "@/app/actions/admin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Users = {
  id: string;
  name: string;
  email: string;
  address: string;
  role: string;
  appointments: [];
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
    cell: ({ row }) => <HeaderCell row={row} />,
  },
  {
    accessorKey: "appointments",
    header: "Appointments",
    cell: ({ row }) => {
      // Access the appointments array and return its length
      const appointments = row.original.appointments;
      return appointments.length; // Display the number of appointments
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      //@ts-ignore
      const id: any = row.original._id;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link href={`/users/${id}`}>
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
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

function HeaderCell({ row }: { row: any }) {
  const { toast } = useToast();
  //@ts-ignore
  const user = row.original._id;
  const [selectedRole, setSelectedRole] = useState({});

  const handleRoleChange = async (newRole: string) => {
    // const newRole = event.target.value;
    setSelectedRole(newRole);
    // Call API to update user role
    await roleChange(user, newRole).then((data) => {
      if (data?.success) {
        toast({
          title: "Role updated",
          description: `Role updated successfully!`,
        });
      }
    });
  };

  return (
    <Select onValueChange={handleRoleChange}>
      <SelectTrigger className="w-[120px] text-xs">
        <SelectValue placeholder="Change role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="frontdesk" className="text-xs">
          Front Desk
        </SelectItem>
        <SelectItem value="secretary" className="text-xs">
          Secretary
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

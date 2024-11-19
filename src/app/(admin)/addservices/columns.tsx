"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PhilippinePeso } from "lucide-react";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
};

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      //@ts-ignore
      const imageUrl: string = row.getValue("image");
      return (
        <div className='h-11 w-11 relative '>
          <Image
            src={imageUrl}
            alt='Service Image'
            fill
            className='rounded-full object-cover w-full h-full'
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className=' w-32'>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className='line-clamp-3 w-32'>{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className='flex gap-2'>
        <PhilippinePeso className='w-4 h-4' />
        {row.getValue("price")}
      </div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      //@ts-ignore
      const duration = row.getValue("duration");
      return <div>{duration === 1 ? `${duration} hr` : `${duration} hrs`}</div>;
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

  // const handleMarkAsDone = async () => {
  //   await markAppointmentAsDone(id).then((data) => {
  //     if (data.success) {
  //       toast({
  //         title: "Appointment marked as done",
  //         description: "The appointment has been marked as done.",
  //       });
  //     } else {
  //       toast({
  //         variant: "destructive",
  //         title: "Something went wrong",
  //         description: `${data.error}`,
  //       });
  //     }
  //   });
  // };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-sm flex items-center gap-2 p-1 text-emerald-500 cursor-pointer hover:bg-zinc-100 focus:outline-none'>
          Update
        </DropdownMenuItem>
        <DropdownMenuItem className='text-sm flex items-center gap-2 p-1 text-red-500 cursor-pointer hover:bg-zinc-100 focus:outline-none'>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { useAnnouncementStore } from "@/lib/store/announcement";
import React from "react";
import { Card } from "../ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import DialogEditAnnouncement from "./DialogEditAnnouncement";
import AlertAnnouncementDelete from "./AlertAnnouncementDelete";

export default function ListAnnouncements({
  announcements,
}: {
  announcements: any[];
}) {
  return (
    <div>
      {/* Closed Type Announcements */}
      <h2 className='text-muted-foreground my-3'>Closed Announcements</h2>
      <div className='flex flex-wrap gap-3'>
        {announcements
          .filter((item) => item.type === "closed")
          .map((item) => (
            <Card key={item._id} className='w-[25rem] p-2'>
              <div className='flex justify-between items-center'>
                <h3 className='font-bold'>{item.title}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis className='w-5 h-5 stroke-[-25px] text-muted-foreground' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        document
                          .getElementById("trigger-edit-announce")
                          ?.click();
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        document
                          .getElementById("trigger-delete-announce")
                          ?.click();
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className='text-muted-foreground mt-2'>{item.description}</p>
              <div className='flex flex-col text-sm text-muted-foreground mt-3'>
                <span>Duration:</span>
                <span className='ml-2'>
                  From: {item.duration.from.toLocaleDateString()}
                </span>
                <span className='ml-2'>
                  To: {item.duration.to.toLocaleDateString()}
                </span>
              </div>
              <div className='text-sm text-muted-foreground flex justify-end'>
                <span>Status:</span>
                <p className=''>
                  {item.status === "active" ? (
                    <span className='text-green-500'>{item.status}</span>
                  ) : (
                    <span className='text-red-500'>{item.status}</span>
                  )}{" "}
                </p>
              </div>
              <DialogEditAnnouncement announcementId={item._id} />
            </Card>
          ))}
      </div>

      {/* Discount Type Announcements */}
      <h2 className='text-muted-foreground my-3'>Discount Announcements</h2>
      <div className='flex flex-wrap gap-3'>
        {announcements
          .filter((item) => item.type === "discount")
          .map((item) => (
            <Card key={item._id} className='w-[25rem] p-2'>
              <div className='flex justify-between items-center'>
                <h3 className='font-bold'>{item.title}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis className='w-5 h-5 stroke-[-25px] text-muted-foreground' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        document
                          .getElementById("trigger-edit-announce")
                          ?.click();
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        document
                          .getElementById("trigger-delete-announce")
                          ?.click();
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className='text-muted-foreground mt-2'>{item.description}</p>
              <div className='flex flex-col text-sm text-muted-foreground mt-3'>
                <span>Duration:</span>
                <span className='ml-2'>
                  From: {item.duration.from.toLocaleDateString()}
                </span>
                <span className='ml-2'>
                  To: {item.duration.to.toLocaleDateString()}
                </span>
              </div>
              <div className='text-sm text-muted-foreground flex justify-end'>
                <span>Status:</span>
                <p className=''>
                  {item.status === "active" ? (
                    <span className='text-green-500'>{item.status}</span>
                  ) : (
                    <span className='text-red-500'>{item.status}</span>
                  )}{" "}
                </p>
              </div>
              <AlertAnnouncementDelete announcementId={item._id} />
              <DialogEditAnnouncement announcementId={item._id} />
            </Card>
          ))}
      </div>
    </div>
  );
}

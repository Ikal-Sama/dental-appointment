"use client";

import { getNotifications, markNotificationAsRead } from "@/app/actions/admin";
import { BellIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Notifications({ userId }: { userId: any }) {
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      const fetchedNotifications = await getNotifications(userId);
      //@ts-ignore
      setNotifications(fetchedNotifications || []);
      //@ts-ignore
      setUnreadNotifications(fetchedNotifications?.length || 0);
    };
    fetchUnreadNotifications();
  }, [userId, getNotifications]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const fetchedNotifications = await getNotifications(userId);
      //@ts-ignore
      setNotifications(fetchedNotifications || []);
      setUnreadNotifications(fetchedNotifications?.length || 0);
    }, 5000); // Re-fetch notifications every 5 seconds

    return () => clearInterval(intervalId);
  }, [userId, getNotifications]);

  const handleNotificationClick = async (notificationId: string) => {
    await markNotificationAsRead(notificationId);
    //@ts-ignore
    setNotifications((prev) =>
      prev.map((notification) =>
        //@ts-ignore
        notification._id === notificationId
          ? //@ts-ignore
            { ...notification, read: true }
          : notification
      )
    );
    setUnreadNotifications((prev) => prev - 1);
  };

  return (
    <div className="flex relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-zinc-100 p-1 rounded-lg">
          <BellIcon className="w-5 h-5 mr-2 text-zinc-500" />
          {unreadNotifications > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 absolute top-0 left-4">
              {unreadNotifications}
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.length > 0 ? (
            notifications.map((notification: any) => (
              <DropdownMenuItem
                key={notification._id}
                onClick={() => handleNotificationClick(notification._id)}
                className={notification.read ? "text-gray-500" : "bg-red-50"}
              >
                <Link href="/myappointments">
                  <div>
                    <p className="text-xs flex flex-col gap-1">
                      <span className="font-bold">{notification.message}</span>
                    </p>
                    <small>Appointment ID: {notification.appointmentId}</small>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem>No notifications</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

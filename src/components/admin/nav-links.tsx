"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Badge,
  Bell,
  Calendar,
  CalendarCheck2,
  CalendarClock,
  CalendarX2,
  Home,
  Users,
} from "lucide-react";

export default function NavLinks({ user }: { user: any }) {
  // const loggedin = user.loggedInUser.role;
  // console.log(user.loggedInUser.role);

  const pathname = usePathname(); // Get the current path
  const isActive = (linkPath: string) => {
    return pathname === linkPath;
  };
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {user.loggedInUser?.role === "admin" ? (
        <>
          <div className="my-2">
            <span className="text-white p-1 px-2 rounded-full text-xs  bg-teal-400">
              General
            </span>
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2 ${
                isActive("/dashboard") ? "bg-muted text-primary" : ""
              }`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/users"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2 ${
                isActive("/users") ? "bg-muted text-primary" : ""
              }`}
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/staffs"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2 ${
                isActive("/users") ? "bg-muted text-primary" : ""
              }`}
            >
              <Users className="h-4 w-4" />
              Staffs
            </Link>
          </div>
          <div className="my-2">
            <span className="text-white p-1 px-2 rounded-full text-xs  bg-teal-400">
              Manage Appointments
            </span>
            <Link
              href="/appointments/new"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2 ${
                isActive("/appointments/new") ? "bg-muted text-primary" : ""
              }`}
            >
              <Calendar className="h-4 w-4" />
              Pending
            </Link>
            <Link
              href="/appointments/ongoing"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2 ${
                isActive("/appointments/ongoing") ? "bg-muted text-primary" : ""
              }`}
            >
              <CalendarClock className="h-4 w-4" />
              Proceeding
            </Link>
            <Link
              href="/appointments/completed"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2 ${
                isActive("/appointments/completed")
                  ? "bg-muted text-primary"
                  : ""
              }`}
            >
              <CalendarCheck2 className="h-4 w-4" />
              Completed
            </Link>
            <Link
              href="/appointments/canceled"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2 ${
                isActive("/appointments/canceled")
                  ? "bg-muted text-primary"
                  : ""
              }`}
            >
              <CalendarX2 className="h-4 w-4" />
              Canceled
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="my-2">
            <span className="text-white p-1 px-2 rounded-full text-xs  bg-teal-400">
              General
            </span>
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2 ${
                isActive("/dashboard") ? "bg-muted text-primary" : ""
              }`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
          </div>
          <div className="my-2">
            <span className="text-white p-1 px-2 rounded-full text-xs  bg-teal-400">
              Manage Appointments
            </span>
            <Link
              href="/appointments/new"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2 ${
                isActive("/appointments/new") ? "bg-muted text-primary" : ""
              }`}
            >
              <Calendar className="h-4 w-4" />
              Pending
            </Link>
            <Link
              href="/appointments/ongoing"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2 ${
                isActive("/appointments/ongoing") ? "bg-muted text-primary" : ""
              }`}
            >
              <CalendarClock className="h-4 w-4" />
              Proceeding
            </Link>
            <Link
              href="/appointments/completed"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2 ${
                isActive("/appointments/completed")
                  ? "bg-muted text-primary"
                  : ""
              }`}
            >
              <CalendarCheck2 className="h-4 w-4" />
              Completed
            </Link>
            <Link
              href="/appointments/canceled"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2 ${
                isActive("/appointments/canceled")
                  ? "bg-muted text-primary"
                  : ""
              }`}
            >
              <CalendarX2 className="h-4 w-4" />
              Canceled
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}

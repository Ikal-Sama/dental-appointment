import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Link from "next/link";
import {
  Calendar,
  CalendarCheck,
  CalendarCheck2,
  CalendarClock,
  CalendarX,
  CalendarX2,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ReceiptText,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logout from "../users/logout";
import Notifications from "./notif/notification";

export default async function Navbar() {
  const session = await auth();
  //@ts-ignore
  const role = session?.user?.role;
  const userId = session?.user?.id;
  // console.log(userId);

  const loggedIn = session?.user;

  if (!loggedIn) {
    redirect("/login");
  }
  if (
    loggedIn &&
    //@ts-ignore
    loggedIn.role !== "admin" &&
    //@ts-ignore
    loggedIn.role !== "secretary" &&
    //@ts-ignore
    loggedIn.role !== "frontdesk"
  ) {
    redirect("/");
  }

  return (
    <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='flex flex-col'>
          <nav className='grid gap-2 text-lg font-medium'>
            {
              //@ts-ignore
              loggedIn.role === "admin" ? (
                <>
                  <div className='my-2'>
                    <span className='text-white p-1 px-2 rounded-full text-xs  bg-violet-400'>
                      General
                    </span>
                    <Link
                      href='/dashboard'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <Home className='h-4 w-4' />
                      Dashboard
                    </Link>

                    <Link
                      href='/users'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <Users className='h-4 w-4' />
                      Users
                    </Link>

                    <Link
                      href='/staffs'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <Users className='h-4 w-4' />
                      Staffs
                    </Link>
                  </div>
                  <div className='my-2'>
                    <span className='text-white p-1 px-2 rounded-full text-xs  bg-violet-400'>
                      Manage Appointments
                    </span>
                    <Link
                      href='/appointments/new'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2'
                    >
                      <Calendar className='h-4 w-4' />
                      Pending
                    </Link>
                    <Link
                      href='/appointments/ongoing'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <CalendarClock className='h-4 w-4' />
                      Proceeding
                    </Link>
                    <Link
                      href='/appointments/completed'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <CalendarCheck2 className='h-4 w-4' />
                      Completed
                    </Link>
                    <Link
                      href='/appointments/canceled'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <CalendarX2 className='h-4 w-4' />
                      Canceled
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className='my-2'>
                    <span className='text-white p-1 px-2 rounded-full text-xs  bg-violet-400'>
                      General
                    </span>
                    <Link
                      href='/dashboard'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <Home className='h-4 w-4' />
                      Dashboard
                    </Link>
                  </div>
                  <div className='my-2'>
                    <span className='text-white p-1 px-2 rounded-full text-xs  bg-violet-400'>
                      Manage Appointments
                    </span>
                    <Link
                      href='/appointments/new'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2'
                    >
                      <Calendar className='h-4 w-4' />
                      Pending
                    </Link>
                    <Link
                      href='/appointments/ongoing'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <CalendarClock className='h-4 w-4' />
                      Proceeding
                    </Link>
                    <Link
                      href='/appointments/completed'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <CalendarCheck2 className='h-4 w-4' />
                      Completed
                    </Link>
                    <Link
                      href='/appointments/canceled'
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    >
                      <CalendarX2 className='h-4 w-4' />
                      Canceled
                    </Link>
                  </div>
                </>
              )
            }
          </nav>
        </SheetContent>
      </Sheet>
      <div className='w-full flex-1'></div>
      <div>
        {/* This is where i put the bell icon that has the notfication */}
        <Notifications role={role} userId={userId} />
      </div>
      <span className='text-muted-foreground'>{session?.user?.name}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' size='icon' className='rounded-full'>
            <CircleUser className='h-5 w-5' />
            <span className='sr-only'>Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/admin-profile/${loggedIn?.id}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Logout />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

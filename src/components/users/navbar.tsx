import { CircleUser, Menu, Package2, Search } from "lucide-react";
import Logo from "../../../public/assets/logo.jpg";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { auth } from "@/auth";
import Logout from "./logout";
import { redirect, useRouter } from "next/navigation";
import NavLinks from "./nav-links";
import { getUserById } from "@/app/actions/user";
import { getNotifications } from "@/app/actions/admin";
import Notifications from "./notif/notification";

export default async function Navbar() {
  const session = await auth();
  //@ts-ignore
  const loggedInUser = session?.user;
  const userId = loggedInUser?.id;

  const userData = await getUserById(userId);

  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 z-10">
      <div className="">
        <NavLinks />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">GDC</span>
              </Link>
              <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="/contactus"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact Us
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div>
          <Notifications userId={userId} />
        </div>
        {loggedInUser?.name ? (
          <>
            <span className="text-sm text-muted-foreground">
              {!userData?.user ? loggedInUser?.name : userData?.user.name}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  {!userData?.user && !loggedInUser ? (
                    //@ts-ignore

                    <CircleUser className="h-5 w-5" />
                  ) : (
                    <>
                      {!userData?.user?.image ? (
                        <CircleUser className="h-5 w-5" />
                      ) : (
                        <Image
                          src={
                            //@ts-ignore
                            userData?.user?.image
                          }
                          alt="User Image"
                          width={20}
                          height={20}
                          className="rounded-full w-full h-full"
                        />
                      )}
                    </>
                  )}
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={`/profile`}>Profile</Link>
                </DropdownMenuItem>
                {
                  //@ts-ignore
                  loggedInUser?.role === "admin" && (
                    <DropdownMenuItem>
                      <Link href={`/dashboard`}>Dashboard</Link>
                    </DropdownMenuItem>
                  )
                }
                <DropdownMenuItem>
                  <Link href={`/myappointments`}>Appointments</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-1">
                  <Logout />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button className="bg-teal-600 hover:bg-teal-700">Sign in</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

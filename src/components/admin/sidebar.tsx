"use client";

import {
  Badge,
  Bell,
  Calendar,
  CalendarCheck2,
  CalendarX2,
  Home,
  LineChart,
  Package,
  Package2,
  ReceiptText,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import NavLinks from "./nav-links";
import axios from "axios";
import Image from "next/image";
function SideBar() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserLoggedIn = async () => {
      const res = await axios.get("/api/user/loggedIn");
      setUser(res.data);
    };
    fetchUserLoggedIn();
  }, []);
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/assets/logo.jpg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="uppercase text-teal-500 text-xl">
              GDC |
              <span className="text-zinc-500 ml-2 text-xs">
                {
                  //@ts-ignore
                  user.loggedInUser?.role
                }
              </span>
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <NavLinks user={user} />
        </div>
      </div>
    </div>
  );
}

export default SideBar;

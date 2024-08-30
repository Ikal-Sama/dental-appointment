"use client";

import { Package2 } from "lucide-react";
import Logo from "../../../public/assets/logo.jpg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";

export default function NavLinks() {
  const pathname = usePathname();
  const isActive = (linkPath: string) => {
    return pathname === linkPath;
  };
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Image
          src={Logo}
          alt="Logo"
          height={40}
          width={40}
          className="rounded-full"
        />
        <span className="text-2xl text-teal-600 font-bold uppercase">
          G.D.C
        </span>
      </Link>
      <Link
        href="/"
        className={`text-muted-foreground transition-colors hover:text-teal-500 ${
          isActive("/") ? "text-teal-500 font-semibold" : ""
        }`}
      >
        Home
      </Link>
      <Link
        href="/services"
        className={`text-muted-foreground transition-colors hover:text-teal-500 ${
          isActive("/services") ? "text-teal-500 font-semibold" : ""
        }`}
      >
        Services
      </Link>
      <Link
        href="/about"
        className={`text-muted-foreground transition-colors hover:text-teal-500 ${
          isActive("/about") ? "text-teal-500 font-semibold" : ""
        }`}
      >
        About
      </Link>
      <Link
        href="/contactus"
        className={`text-muted-foreground transition-colors hover:text-teal-500 ${
          isActive("/contactus") ? "text-teal-500 font-semibold" : ""
        }`}
      >
        Contact Us
      </Link>
    </nav>
  );
}

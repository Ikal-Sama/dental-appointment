import { LandPlotIcon, MapPinIcon, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-black w-full">
      <div className="p-5 text-zinc-200 grid grid-cols-1 lg:grid-cols-2 gap-3 items-center">
        <div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-5">
            <Image
              src="/assets/logo.jpg"
              alt="Logo"
              height={60}
              width={60}
              className="rounded-full"
            />
            <div>
              <h1 className=" text-xl font-bold text-teal-500">
                Gonzales Dental Clinic.
              </h1>
              <p>Your smile is our passion! At Gonzales Dental Clinic</p>
            </div>
          </div>
          <div className="text-sm text-zinc-300 grid grid-cols-1 gap-3 mt-5  lg:mt-4 w-full ">
            <span className="flex gap-3 items-center">
              <Phone className="w-4 h-4" /> 09322523861 / 022321383
            </span>
            <span className="flex gap-3">
              <LandPlotIcon className="w-4 h-4" /> 2nd Floor Beside Alon Tattoo
              Studio
            </span>
            <span className="flex gap-3 items-center w-full ">
              <MapPinIcon className="w-5 h-5" /> Victorio Pacaldo Sr. Street,
              Sitio Katura, Poblacion, Cordova, Cebu City 6017
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 lg:mt-5 text-xl font-semibold">
          <Link
            href="/"
            className="hover:text-teal-500 duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-teal-500 duration-300 ease-in-out"
          >
            About
          </Link>
          <Link
            href="/services"
            className="hover:text-teal-500 duration-300 ease-in-out"
          >
            Services
          </Link>
          <Link
            href="/contactus"
            className="hover:text-teal-500 duration-300 ease-in-out"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

import HeroImage1 from "../../../public/assets/images/image1.jpg";
import HeroImage3 from "../../../public/assets/images/image3.jpg";

import services1 from "../../../public/assets/services-1.jpg";
import services2 from "../../../public/assets/services-2.jpg";
import services3 from "../../../public/assets/services-3.jpg";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useAnnouncementStore } from "@/lib/store/announcement";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getAllServices } from "../actions/services";
import CarouselCard from "@/components/users/CarouselCard";
import AnnouncementBanner from "@/components/users/announcement-banner";

export default async function HomePage() {
  const services = (await getAllServices()) as any;
  const limitedServices = services.slice(0, 3);

  return (
    <div className='mt-20'>
      <section className='flex flex-col gap-10 md:flex-col lg:flex-row'>
        <div className='w-full flex flex-col items-center md:items-start gap-5'>
          <h1 className='text-2xl md:text-4xl font-semibold text-zinc-700 leading-snug'>
            Your smile is our passion! At
            <span className='text-teal-600'> Gonzales Dental Clinic</span>
          </h1>
          <p className='text-md text-zinc-500'>
            we are dedicated to providing top-notch dental care for you and your
            family. From routine check-ups to advanced treatments, our skilled
            dentist is here to ensure your dental health is in the best hands.
          </p>
          <span className='text-teal-500 font-semibold'>
            **WE ARE OPEN EVERY DAY FROM 9AM TO 4PM**
          </span>
          <Link href='/appoint'>
            <Button className='w-[10rem] bg-teal-600 hover:bg-teal-700'>
              Book Now
            </Button>
          </Link>
        </div>

        <div className='w-full flex justify-center relative'>
          <Image
            src={HeroImage1}
            alt='Hero Image 1'
            height={400}
            width={400}
            className='rounded-lg shadow-lg object-cover'
          />
          <Image
            src={HeroImage3}
            alt='Hero Image 2'
            height={300}
            width={300}
            className='rounded-lg shadow-lg object-cover absolute top-36 right-0'
          />
        </div>
      </section>

      <AnnouncementBanner />

      <section className='mt-[10rem]'>
        <h1 className='text-4xl text-zinc-700 font-bold'>Popular Services</h1>
        <p className='text-sm text-zinc-500'>
          Top most selected services in clinic
        </p>

        <div>
          {limitedServices &&
            //@ts-ignore
            limitedServices.map((service: any) => (
              <div
                className='mt-16 flex flex-col md:flex-col lg:flex-row gap-12'
                key={service.id}
              >
                <Image
                  src={service.image}
                  alt='Services1'
                  height={500}
                  width={500}
                  className='object-cover rounded-md'
                />
                <div>
                  <h1 className='text-2xl uppercase tracking-wider font-semibold'>
                    {service.name}
                  </h1>
                  <div className=' flex flex-col gap-5'>
                    <p className='mt-5 text-zinc-500 text-sm leading-snug'>
                      {service.description}
                    </p>
                    <p className='flex gap-2 text-teal-500'>
                      <TimerIcon />: {service.duration} hr/hrs
                    </p>
                  </div>
                  <Link
                    href={{
                      pathname: "/appoint",
                      query: { service: service.name },
                    }}
                  >
                    <Button className='mt-5 bg-teal-600 hover:bg-teal-700'>
                      Book an appointment
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className='mt-[10rem]'>
        <CarouselCard />
      </section>
    </div>
  );
}

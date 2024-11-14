"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function page() {
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
            src='/assets/images/image1.jpg'
            alt='Hero Image'
            height={400}
            width={400}
            className='rounded-lg shadow-lg object-cover'
          />
          <Image
            src='/assets/images/image3.jpg'
            alt='Hero Image'
            height={300}
            width={300}
            className='rounded-lg shadow-lg object-cover absolute top-36 right-0'
          />
        </div>
      </section>

      <section className='mt-[10rem]'>
        <h1 className='text-4xl text-zinc-700 font-bold'>Popular Services</h1>
        <p className='text-sm text-zinc-500'>
          Top most selected services in clinic
        </p>

        <div className='mt-16 flex flex-col md:flex-col lg:flex-row gap-12'>
          <Image
            src='/assets/services-1.jpg'
            alt='Services'
            height={500}
            width={500}
            className='object-cover rounded-md'
          />
          <div>
            <h1 className='text-2xl uppercase tracking-wider font-semibold'>
              Dental Cleaning
            </h1>
            <div className=' flex flex-col gap-5'>
              <p className='mt-5 text-zinc-500 text-sm leading-snug'>
                Dental cleaning involves removing plaque, decay, and other
                dental debris from your teeth. We offer various types of
                cleanings, including root canal, root canal fillings, and dental
                extractions.
              </p>
              <p className='flex gap-2 text-teal-500'>
                <TimerIcon />: 2hrs
              </p>
            </div>
            <Link href='/appoint'>
              <Button className='mt-5 bg-teal-600 hover:bg-teal-700'>
                Book an appointment
              </Button>
            </Link>
          </div>
        </div>

        <div className='mt-24 flex flex-col md:flex-col lg:flex-row-reverse gap-12'>
          <Image
            src='/assets/services-2.jpg'
            alt='Services'
            height={500}
            width={500}
            className='object-cover rounded-md'
          />
          <div>
            <h1 className='text-2xl uppercase tracking-wider font-semibold'>
              Dental Filling
            </h1>
            <div className=' flex flex-col gap-5'>
              <p className='mt-5 text-zinc-500 text-sm leading-snug'>
                Dental filling helps restore your teeth to their natural shape
                and appearance. We offer various methods, including root canal,
                periodontal, and root canal fillings.
              </p>
              <p className='flex gap-2 text-teal-500'>
                <TimerIcon />: 3hrs
              </p>
            </div>
            <Link href='/appoint'>
              <Button className='mt-5 bg-teal-600 hover:bg-teal-700'>
                Book an appointment
              </Button>
            </Link>
          </div>
        </div>

        <div className='mt-24 flex flex-col md:flex-col lg:flex-row gap-12'>
          <Image
            src='/assets/services-3.jpg'
            alt='Services'
            height={500}
            width={500}
            className='object-cover rounded-md'
          />
          <div>
            <h1 className='text-2xl uppercase tracking-wider font-semibold'>
              Orthodontics
            </h1>
            <div className=' flex flex-col gap-5'>
              <p className='mt-5 text-zinc-500 text-sm leading-snug'>
                Orthodontics help protect your teeth and gums from injury. We
                offer various types, including bridge braces, interlocking
                braces, and dental crowns.
              </p>
              <p className='flex gap-2 text-teal-500'>
                <TimerIcon />: 2hrs
              </p>
            </div>
            <Link href='/appoint'>
              <Button className='mt-5 bg-teal-600 hover:bg-teal-700'>
                Book an appointment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className='mt-[10rem]'>
        <h1 className='text-4xl text-zinc-700 font-bold'>
          Satisfied Customers
        </h1>
        <p className='text-sm text-zinc-500'>Customers has smiled again</p>

        <div className='mt-24 p-10 '>
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className='z-0'
          >
            <CarouselContent>
              <CarouselItem className='md:basis-1/2 lg:basis-1/4'>
                <Image
                  src='/assets/images/customer1.jpg'
                  alt='Customer 1'
                  width={300}
                  height={300}
                  className='rounded-md h-full'
                />
              </CarouselItem>
              <CarouselItem className='md:basis-1/2 lg:basis-1/4'>
                <Image
                  src='/assets/images/customer2.jpg'
                  alt='Customer 1'
                  width={300}
                  height={300}
                  className='rounded-md h-full'
                />
              </CarouselItem>
              <CarouselItem className='md:basis-1/2 lg:basis-1/4'>
                <Image
                  src='/assets/images/customer3.jpg'
                  alt='Customer 1'
                  width={300}
                  height={300}
                  className='rounded-md h-full'
                />
              </CarouselItem>
              <CarouselItem className='md:basis-1/2 lg:basis-1/4'>
                <Image
                  src='/assets/images/customer4.jpg'
                  alt='Customer 1'
                  width={300}
                  height={300}
                  className='rounded-md h-full'
                />
              </CarouselItem>
              <CarouselItem className='md:basis-1/2 lg:basis-1/4'>
                <Image
                  src='/assets/images/customer5.jpg'
                  alt='Customer 1'
                  width={300}
                  height={300}
                  className='rounded-md h-full'
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
}

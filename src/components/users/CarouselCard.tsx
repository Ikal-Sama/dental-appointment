"use client";

import React from "react";
import customer1 from "../../../public/assets/images/customer1.jpg";
import customer2 from "../../../public/assets/images/customer2.jpg";
import customer3 from "../../../public/assets/images/customer3.jpg";
import customer4 from "../../../public/assets/images/customer4.jpg";
import customer5 from "../../../public/assets/images/customer5.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const CarouselCard = () => {
  return (
    <div>
      <h1 className='text-4xl text-zinc-700 font-bold'>Satisfied Customers</h1>
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
                src={customer1}
                alt='Customer 1'
                width={300}
                height={300}
                className='rounded-md h-full'
              />
            </CarouselItem>
            <CarouselItem className='md:basis-1/2 lg:basis-1/4'>
              <Image
                src={customer2}
                alt='Customer 2'
                width={300}
                height={300}
                className='rounded-md h-full'
              />
            </CarouselItem>
            <CarouselItem className='md:basis-1/2 lg:basis-1/4'>
              <Image
                src={customer3}
                alt='Customer 3'
                width={300}
                height={300}
                className='rounded-md h-full'
              />
            </CarouselItem>
            <CarouselItem className='md:basis-1/2 lg:basis-1/4'>
              <Image
                src={customer4}
                alt='Customer 4'
                width={300}
                height={300}
                className='rounded-md h-full'
              />
            </CarouselItem>
            <CarouselItem className='md:basis-1/2 lg:basis-1/4'>
              <Image
                src={customer5}
                alt='Customer 5'
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
    </div>
  );
};

export default CarouselCard;

import { getAllServices } from "@/app/actions/services";
import { Button } from "@/components/ui/button";
import { servicesData } from "@/data/services-data";
import { PhilippinePeso, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import background from "../../../../public/assets/images/servicebg.png";

export default async function ServicesPage() {
  const services = (await getAllServices()) as any;
  return (
    <div className=''>
      <div
        className='rounded-md h-[20rem] w-full p-12 text-white'
        style={{
          backgroundImage: `url("https://static.vecteezy.com/system/resources/thumbnails/022/814/155/small_2x/white-healthy-tooth-different-tools-for-dental-care-blue-background-generative-ai-photo.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className='p-10'>
          <h1 className='text-4xl font-bold'>Services</h1>
          <p>We offer a wide range of dental services at affordable prices.</p>
        </div>
      </div>

      <section className='mt-20'>
        {services.map((service: any) => (
          <div
            className='flex-col lg:flex-row flex gap-20 mt-10 items-center'
            key={service.id}
          >
            <div className='relative w-[400px] h-[300px]'>
              <Image
                src={service.image}
                alt='Services1'
                fill
                className='rounded-md w-full  max-w-[500px] h-full max-h-[500px]'
              />
            </div>
            <div>
              <h1 className='text-3xl lg:text-4xl font-bold text-teal-600 '>
                {service.name}
              </h1>
              <p className='w-[35rem] mt-3 '>{service.description}</p>

              <p className='my-3 text-teal-500 flex gap-3'>
                <strong>
                  <PhilippinePeso className='w-5 h-5' />
                </strong>
                {service.price}
              </p>

              <p className='my-3 text-teal-500 flex gap-3'>
                <strong>
                  <Timer className='w-5 h-5' />
                </strong>
                {service.duration} hr/hrs
              </p>

              <Link
                href={{
                  pathname: "/appoint",
                  query: { service: service.name },
                }}
              >
                <Button className='mt-3 bg-teal-600 hover:bg-teal-700'>
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

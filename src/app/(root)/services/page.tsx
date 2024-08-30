import { Button } from "@/components/ui/button";
import { PhilippinePeso } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div>
      <section
        className="rounded-md h-[20rem] w-full p-12 text-white"
        style={{
          backgroundImage: 'url("/assets/images/image4.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="p-10">
          <h1 className="text-4xl font-bold">Services</h1>
          <p>We offer a wide range of dental services at affordable prices.</p>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex-col lg:flex-row flex gap-20 items-center">
          <Image
            src="/assets/services-2.jpg"
            alt="Services1"
            width={500}
            height={500}
            className="rounded-md w-full  max-w-[500px] h-full max-h-[500px]"
          />
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-teal-600 ">
              Dental Cleaning
            </h1>
            <p className="w-[25rem] mt-3">
              Our dental cleaners are skilled and experienced. They clean your
              teeth, gums, and oral hygiene regularly.
            </p>
            <p className="my-3 text-teal-500">
              <strong>Duration: </strong> 2 - 3 hours
            </p>
            <p className="my-3 text-teal-500 flex gap-3">
              <strong>
                <PhilippinePeso className="w-5 h-5" />
              </strong>
              3,000 - 6,000
            </p>

            <Link href="/appoint">
              <Button className="mt-5 bg-teal-600 hover:bg-teal-700">
                Book Now
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-col lg:flex-row flex gap-20 items-center mt-20">
          <Image
            src="/assets/services-1.jpg"
            alt="Services1"
            width={500}
            height={500}
            className="rounded-md w-full max-w-[500px] h-full max-h-[500px]"
          />
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-teal-600 ">
              Dental Filling
            </h1>
            <p className="w-[25rem] mt-3">
              Dental filling allows you to replace damaged or missing teeth with
              healthy ones. We offer a variety of options, including root
              canals, fillings, and crowns.
            </p>
            <p className="my-3 text-teal-500">
              <strong>Duration: </strong> 1 - 2 hours
            </p>
            <p className="my-3 text-teal-500 flex gap-3">
              <strong>
                <PhilippinePeso className="w-5 h-5" />
              </strong>
              6,000 - 10,000
            </p>

            <Link href="/appoint">
              <Button className="mt-5 bg-teal-600 hover:bg-teal-700">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-20 flex-col lg:flex-row flex gap-20 items-center mb-10">
          <Image
            src="/assets/services-3.jpg"
            alt="Services1"
            width={500}
            height={500}
            className="rounded-md w-full max-w-[500px] h-full max-h-[500px]"
          />
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-teal-600">
              Dental Braces
            </h1>
            <p className="w-[25rem] mt-3">
              Dental braces help protect your teeth and gums from injury. We
              offer various types, including bridge braces, interlocking braces,
              and dental crowns, you can also choose a color you want.
            </p>
            <p className="my-3 text-teal-500">
              <strong>Duration: </strong> 1 - 2 hours
            </p>
            <p className="my-3 text-teal-500 flex gap-3">
              <strong>
                <PhilippinePeso className="w-5 h-5" />
              </strong>
              5,000 - 10,000
            </p>

            <Link href="/appoint">
              <Button className="mt-5 bg-teal-600 hover:bg-teal-700">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

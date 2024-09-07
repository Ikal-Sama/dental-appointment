import { Button } from "@/components/ui/button";
import { servicesData } from "@/data/services-data";
import { PhilippinePeso } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div>
      <div
        className="rounded-md h-[20rem] w-full p-12 text-white"
        style={{
          backgroundImage:
            'url("https://scontent.fmnl8-4.fna.fbcdn.net/v/t39.30808-6/447213525_122173709828018742_5555327902044451575_n.jpg?stp=cp6_dst-jpg_s600x600&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFv_DpY3nBRHYAx2cFGU8e8dlRzPQMJyht2VHM9AwnKG4KN0qb_LrKdXQ9ZjtXkdg39B1HIt69fBwd9Pu0HjnDp&_nc_ohc=3mwWuTVPJSYQ7kNvgFYYQYw&_nc_ht=scontent.fmnl8-4.fna&oh=00_AYCOpo8DwEqR8R-dCuVhEebCwzhi2aT1R5h-VfyjCj7ZCw&oe=66DF4CEE")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="p-10">
          <h1 className="text-4xl font-bold">Services</h1>
          <p>We offer a wide range of dental services at affordable prices.</p>
        </div>
      </div>

      <section className="mt-20">
        {servicesData.map((service) => (
          <div
            className="flex-col lg:flex-row flex gap-20 mt-10 items-center"
            key={service.id}
          >
            <div className="relative w-[400px] h-[300px]">
              <Image
                src={service.image}
                alt="Services1"
                fill
                className="rounded-md w-full  max-w-[500px] h-full max-h-[500px]"
              />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-teal-600 ">
                {service.name}
              </h1>
              <p className="w-[35rem] mt-3">{service.description}</p>

              <p className="my-3 text-teal-500 flex gap-3">
                <strong>
                  <PhilippinePeso className="w-5 h-5" />
                </strong>
                {service.price}
              </p>

              <Link href="/appoint">
                <Button className="mt-3 bg-teal-600 hover:bg-teal-700">
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

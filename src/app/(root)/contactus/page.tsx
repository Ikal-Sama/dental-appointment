import { Landmark, LandPlotIcon, Mail, Map, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ContactUsPage() {
  return (
    <div>
      <section className="w-full p-12 flex gap-8 items-center">
        <Image
          src="/assets/images/contact.png"
          alt="Contact Us"
          width={700}
          height={700}
        />
        <div>
          <h1 className="text-2xl font-semibold text-teal-500">Contact Us</h1>
          <p className="text-md text-zinc-600">We'd love to hear from you</p>
          <div className="mt-10 grid grid-cols-1 gap-5 items-center">
            <span className="flex items-center gap-3 text-md text-zinc-700">
              <Phone className="w-5 h-5 text-teal-500" />:
              <p>09322523861 / 022321383</p>
            </span>
            <span className="flex items-center gap-3 text-md text-zinc-700">
              <Map className="w-5 h-5 text-teal-500" />:
              <p>
                Victorio Pacaldo Sr. Street, Sitio Katura, Poblacion, Cordova,
                Cebu City 6017
              </p>
            </span>
            <span className="flex items-center gap-3 text-md text-zinc-700">
              <LandPlotIcon className="w-4 h-4 text-teal-500" />:
              <p>2nd Floor Beside Alon Tattoo Studio</p>
            </span>
            <span className="flex items-center gap-3 text-md text-zinc-700">
              <Mail className="w-4 h-4 text-teal-500" />:
              <p>gonzalesclinic@gmail.com</p>
            </span>
          </div>
        </div>
      </section>
      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.0924785186553!2d123.94000417409767!3d10.254125089864663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99a5809c1d5c1%3A0x7b1c9fc6b94cb29f!2sVictorio%20Pacaldo%20Sr.%20St%2C%20Cordova%2C%20Cebu!5e0!3m2!1sfil!2sph!4v1725013414989!5m2!1sfil!2sph"
          width="600"
          height="450"
          style={{ border: "0", width: "100%" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}

import Image from "next/image";

import logo from "../../../../public/assets/logo.jpg";
import drray from "../../../../public/assets/images/dr-ray.png";

export default function page() {
  return (
    <div>
      <section
        className='rounded-md h-[20rem] w-full p-12 text-white flex flex-col items-center justify-center '
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1643660527095-bfb19b49994a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className='text-2xl lg:text-3xl font-bold text-white text-center'>
          About Gonzales Dental Clinic
        </h1>
        <p className='text-sm lg:text-md text-center mt-2 w-full lg:w-[50rem]'>
          Gonzales Dental Clinic is dedicated to providing exceptional dental
          care to our patients. We offer a variety of services to help you
          maintain your oral health, including cleanings, fillings, and root
          canals. Our staff is skilled and experienced, and we always strive to
          provide the best possible dental experience for our patients.
        </p>
      </section>

      <section className='my-20'>
        <div className='flex flex-col justify-center items-center'>
          <Image
            src={logo}
            alt='Logo'
            width={200}
            height={200}
            className='rounded-full'
          />
          <h1 className='text-xl lg:text-3xl text-teal-500 mt-5 font-bold'>
            Gonzales Dental Clinic.
          </h1>
          <p className='text-center text-sm lg:text-lg w-[20rem] md:w-[40rem] lg:w-[50rem] mt-3'>
            We strive to provide the best possible dental care to our patients.
            Our staff is skilled and experienced, and we always strive to
            provide the best possible dental experience for our patients
          </p>
        </div>

        <div className='mt-20 flex flex-col md:flex-row lg:flex-row gap-10 items-center'>
          <Image
            src={drray}
            alt='Dr'
            width={300}
            height={300}
            className='rounded-md object-cover'
          />
          <div>
            <h1 className='text-2xl lg:text-3xl font-bold'>
              Dr. Raymundo M. Gonzales
            </h1>
            <h1 className='text-xl mb-5 font-semibold text-zinc-700'>
              CEO - Founder
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}

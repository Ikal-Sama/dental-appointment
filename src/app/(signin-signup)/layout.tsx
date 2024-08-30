import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/users/navbar";
import { dbConnect } from "@/lib/mongo-connect";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dental Appointment App",
  description: "Book an appointment anytime anywhere",
};

export default async function SignInSignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();
  return (
    <div>
      <main className="max-w-screen-2xl mx-auto p-12">
        <Link href="/" className="underline flex items-center text-sm mb-5">
          <ArrowLeft className="w-5 h-5 stroke-[1.25px] mr-2" /> Go Back
        </Link>
        {children}
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/users/navbar";
import Footer from "@/components/users/footer";
import { dbConnect } from "@/lib/mongo-connect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gonzales Dental Clinic",
  description: "Book an appointment with us",
};

export default async function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // await dbConnect();
  return (
    <>
      <Navbar />
      <main className='min-h-[calc(100vh_-_theme(spacing.16))] bg-muted/40 p-4 md:p-8'>
        {children}
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { dbConnect } from "@/lib/mongo-connect";
import Navbar from "@/components/admin/navbar";
import "../globals.css";
import SideBar from "@/components/admin/sidebar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GDC | Admin",
  description: "Admin Management",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <SideBar />
        <div className="flex flex-col">
          <Navbar />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

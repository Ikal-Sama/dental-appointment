import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { dbConnect } from "@/lib/mongo-connect";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gonzales Dental Clinic",
  description: "Book an appointment anytime anywhere",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}

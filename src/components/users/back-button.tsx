"use client";
import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  href: string;
  label: string;
  text: string;
}

export const BackButton = ({ href, label, text }: BackButtonProps) => {
  return (
    <div className="flex items-center text-sm">
      <p className="text-sm">{text}</p>
      <Button variant="link" className="" size="sm" asChild>
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
};

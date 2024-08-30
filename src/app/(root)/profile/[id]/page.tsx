import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ChangePassword from "@/components/users/change-password";
import MedicalHistory from "@/components/users/medical-history";
import EditProfileComponent from "@/components/users/profile/editprofile";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Profile</h1>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm hover:text-zinc-500"
        >
          <ArrowLeft className="w-5 h-5 stroke-[1.25px]" />
          Go Back
        </Link>
      </div>
      <Alert variant="default" className="mt-3 z-0">
        <AlertCircle className="h-5 w-5 text-white stroke-[1.25px]" />
        <AlertTitle>User Profile</AlertTitle>
        <AlertDescription>
          This Page will update your user profile Information and Security
        </AlertDescription>
      </Alert>
      <EditProfileComponent />
      <MedicalHistory />
      <ChangePassword />
    </div>
  );
}

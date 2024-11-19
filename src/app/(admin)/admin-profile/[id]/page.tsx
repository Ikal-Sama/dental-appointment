import ChangePassword from "@/components/users/change-password";
import EditProfileComponent from "@/components/users/profile/editprofile";
import { LockKeyhole } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div>
      <h1 className='my-5 text-xl font-semibold flex gap-2'>
        <LockKeyhole />
        Profile Settings
      </h1>
      <EditProfileComponent />
      <ChangePassword />
    </div>
  );
}

"use client";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DeactivateUser from "@/components/admin/deactivate-user";
import { BookOpen, BookUser } from "lucide-react";
export default function Page() {
  const params = useParams();

  const [userDetails, setUserDetails] = useState<any>({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await axios.get(`/api/user/${params.id}`);
      setUserDetails(response.data.user);
    };
    fetchUserDetails();
  }, []);
  return (
    <div>
      <h1 className="flex gap-2 items-center text-xl font-semibold">
        <BookUser />
        User Details
      </h1>
      <Card className="p-4 mt-5">
        <div>
          <h1 className="text-md font-semibold text-zinc-800">
            Basic Information
          </h1>
          <div className="flex gap-5 items-center">
            <Avatar className="w-[150px] h-[150px] mt-5">
              <img
                src={userDetails.image}
                alt="User Image"
                width={200}
                height={200}
                className="rounded-full object-cover"
              />
            </Avatar>
            <div className="flex flex-col text-zinc-600">
              <h2>
                <span className="font-semibold mr-2">Name:</span>
                <span>{userDetails.name}</span>
              </h2>
              <h2>
                <span className="font-semibold mr-2">Age:</span>
                <span>{userDetails.age}</span>
              </h2>
              <h2>
                <span className="font-semibold mr-2">Bio:</span>
                <span>{userDetails.bio}</span>
              </h2>
              <h2>
                <span className="font-semibold mr-2">Address:</span>
                <span>{userDetails.address}</span>
              </h2>
            </div>
          </div>
        </div>
      </Card>
      {userDetails.medicalHistory && (
        <Card className="mt-10 p-5">
          <h1 className="text-md font-semibold text-zinc-800">
            Medical History
          </h1>
          <div className="text-zinc-600">
            <h2 className="mt-5">
              <span className="font-semibold text-zinc-900">Physician:</span>
              <span className="ml-3">
                {userDetails.medicalHistory.physician}
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-3 mt-3 text-zinc-600">
              <div className="flex gap-4 items-center">
                <h2 className="font-semibold text-zinc-700">Allergies:</h2>
                <ul className="flex gap-2">
                  {userDetails.medicalHistory.allergies.map(
                    //@ts-ignore
                    (allergy, index) => (
                      <li key={index}>{`${allergy},`}</li>
                    )
                  )}
                </ul>
              </div>
              <div className="flex gap-4 items-center">
                <h2 className="font-semibold text-zinc-700">Conditions:</h2>
                <ul className="flex gap-2">
                  {userDetails.medicalHistory.conditions.map(
                    //@ts-ignore
                    (condition, index) => (
                      <li key={index}>{`${condition},`}</li>
                    )
                  )}
                </ul>
              </div>
              <div className="flex gap-4 items-center">
                <h2 className="font-semibold text-zinc-700">Past Surgeries:</h2>
                <ul className="flex gap-2">
                  {userDetails.medicalHistory.pastSurgeries.map(
                    //@ts-ignore
                    (surgeries, index) => (
                      <li key={index}>{`${surgeries},`}</li>
                    )
                  )}
                </ul>
              </div>
              <div className="flex gap-4 items-center">
                <h2 className="font-semibold text-zinc-700">Medications:</h2>
                <ul className="flex gap-2">
                  {userDetails.medicalHistory.medications.map(
                    //@ts-ignore
                    (medication, index) => (
                      <li key={index}>{`${medication},`}</li>
                    )
                  )}
                </ul>
              </div>
              <div className="flex gap-4 items-center">
                <h2 className="font-semibold text-zinc-700">Immunization:</h2>
                <ul className="flex gap-2">
                  {userDetails.medicalHistory.immunizations.map(
                    //@ts-ignore
                    (Immunization, index) => (
                      <li key={index}>{`${Immunization},`}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="flex items-start justify-start flex-col">
        <p className="text-sm w-[20rem] mt-5 text-left text-zinc-600">
          Deactivating a user. This will remove their access to the platform and
          all associated data. Please ensure you have considered all
          implications before proceeding.
        </p>
        <div className="flex items-center justify-end space-x-2 ">
          <DeactivateUser
            id={params.id as string}
            active={userDetails.status}
          />
        </div>
      </div>
    </div>
  );
}

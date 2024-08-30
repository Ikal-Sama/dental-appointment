"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card } from "../ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useToast } from "../ui/use-toast";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addMedicalHistory } from "@/app/actions/user";
import { medicalHistorySchema } from "@/lib/validateForm";
import axios from "axios";

export default function MedicalHistory() {
  const { toast } = useToast();
  const params = useParams();
  const [pendings, setPendings] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/${params.id}`);
        const userData = response.data.user;

        form.reset({
          physician: userData.medicalHistory.physician,
          allergies: userData.medicalHistory.allergies,
          conditions: userData.medicalHistory.conditions,
          pastSurgeries: userData.medicalHistory.pastSurgeries,
          medications: userData.medicalHistory.medications,
          immunizations: userData.medicalHistory.immunizations,

          // imageUrl: userData.image,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [params.id]);

  const form = useForm<z.infer<typeof medicalHistorySchema>>({
    resolver: zodResolver(medicalHistorySchema),
    defaultValues: {
      physician: "",
      allergies: [],
      conditions: [],
      pastSurgeries: [],
      medications: [],
      immunizations: [],
      allergy: "",
      condition: "",
      pastSurgerry: "",
      medication: "",
      immunization: "",
    },
  });

  async function onSubmit(values: z.infer<typeof medicalHistorySchema>) {
    setPendings(false);
    try {
      setPendings(true);
      const userId: any = params.id;
      const {
        physician,
        allergies,
        conditions,
        pastSurgeries,
        medications,
        immunizations,
      } = values;

      await addMedicalHistory({
        physician,
        allergies,
        conditions,
        pastSurgeries,
        medications,
        immunizations,
      }).then((data) => {
        if (data.success) {
          toast({
            title: "Update Successfull",
            description: "User medical history updated successfully",
          });
          setPendings(false);
        } else {
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: `${data.error}`,
          });
          setPendings(false);
        }
      });
    } catch (error) {
      console.log(error);
      setPendings(false);
    }
  }

  const handleItemSubmit = (inputName: string, arrayName: string) => {
    //@ts-ignore
    const input = form.getValues(inputName);
    //@ts-ignore
    if (input && input.trim() !== "") {
      //@ts-ignore
      const newItem = input.trim();
      //@ts-ignore
      form.setValue(arrayName, [...form.getValues(arrayName), newItem]);
      //@ts-ignore
      form.setValue(inputName, ""); // Clear the input field
    }
  };

  const handleItemDelete = (itemToDelete: string, arrayName: string) => {
    //@ts-ignore
    form.setValue(
      //@ts-ignore
      arrayName,
      //@ts-ignore
      form.getValues(arrayName).filter((item) => item !== itemToDelete)
    );
    form.trigger(); // Trigger a re-render
  };

  return (
    <Card className="mt-10 p-5">
      <h1 className="font-semibold">Medical History</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
          <FormField
            control={form.control}
            name="physician"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Physcician</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allergy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allergies</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {form.getValues("allergies").map((allergy, index) => (
                      <div
                        key={index}
                        className="bg-blue-400 p-1 px-2 text-white rounded-full text-sm"
                      >
                        {allergy}
                        <button
                          type="button"
                          className="ml-2 text-xs text-zinc-200"
                          onClick={() => handleItemDelete(allergy, "allergies")}
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <Input
                      placeholder="Enter allergies"
                      {...field}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault(); // Prevent form submission on Enter key press
                          handleItemSubmit("allergy", "allergies");
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormDescription>If don't have just enter N/A</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conditions</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {form.getValues("conditions").map((condition, index) => (
                      <div
                        key={index}
                        className="bg-primary text-white text-sm p-1 px-2 rounded-full"
                      >
                        {condition}
                        <button
                          type="button"
                          className="ml-2 text-xs text-zinc-200"
                          onClick={() =>
                            handleItemDelete(condition, "conditions")
                          }
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <Input
                      placeholder="Enter conditions"
                      {...field}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault(); // Prevent form submission on Enter key press
                          handleItemSubmit("condition", "conditions");
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormDescription>If don't have just enter N/A</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pastSurgerry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Past Surgeries</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {form
                      .getValues("pastSurgeries")
                      .map((pastSurgerry, index) => (
                        <div
                          key={index}
                          className="bg-emerald-400 p-1 px-2 rounded-full text-white"
                        >
                          {pastSurgerry}
                          <button
                            type="button"
                            className="ml-2 text-xs text-zinc-200"
                            onClick={() =>
                              handleItemDelete(pastSurgerry, "pastSurgeries")
                            }
                          >
                            X
                          </button>
                        </div>
                      ))}
                    <Input
                      placeholder="Enter past surgeries"
                      {...field}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault(); // Prevent form submission on Enter key press
                          handleItemSubmit("pastSurgerry", "pastSurgeries");
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="medication"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medications</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {form.getValues("medications").map((medication, index) => (
                      <div
                        key={index}
                        className="bg-teal-400 p-1 px-2 rounded-full text-white"
                      >
                        {medication}
                        <button
                          type="button"
                          className="ml-2 text-xs text-zinc-200"
                          onClick={() =>
                            handleItemDelete(medication, "medications")
                          }
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <Input
                      placeholder="Enter medications"
                      {...field}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault(); // Prevent form submission on Enter key press
                          handleItemSubmit("medication", "medications");
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormDescription>If don't have just enter N/A</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="immunization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Immunizations</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {form
                      .getValues("immunizations")
                      .map((immunization, index) => (
                        <div
                          key={index}
                          className="bg-cyan-400 p-1 px-2 rounded-full text-white"
                        >
                          {immunization}
                          <button
                            type="button"
                            className="ml-2 text-xs text-zinc-200"
                            onClick={() =>
                              handleItemDelete(immunization, "immunizations")
                            }
                          >
                            X
                          </button>
                        </div>
                      ))}
                    <Input
                      placeholder="Enter immunizations"
                      {...field}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault(); // Prevent form submission on Enter key press
                          handleItemSubmit("immunization", "immunizations");
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormDescription>If don't have just enter N/A</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!form.formState.isDirty || pendings}>
            Save Changes
          </Button>
        </form>
      </Form>
    </Card>
  );
}

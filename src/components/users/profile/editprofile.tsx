"use client";

import { EditProfile } from "@/lib/validateForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { UploadButton } from "@/utils/uploadthing";
// import "@uploadthing/react/styles.css";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import axios from "axios";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { editUserProfile } from "@/app/actions/user";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

export default function EditProfileComponent() {
  const { toast } = useToast();
  const params = useParams();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [pendings, setPendings] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/${params.id}`);
        const userData = response.data.user;
        setImageUrl(userData.image);

        form.reset({
          name: userData.name,
          address: userData.address,
          age: userData.age,
          bio: userData.bio,
          // imageUrl: userData.image,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [params.id]);

  const form = useForm<z.infer<typeof EditProfile>>({
    resolver: zodResolver(EditProfile),
    defaultValues: {
      name: "",
      address: "",
      age: "",
      bio: "",
    },
  });

  async function onSubmit(values: z.infer<typeof EditProfile>) {
    setPendings(false);
    try {
      setPendings(true);
      const userId: any = params.id;
      const imageData = imageUrl ? { image: imageUrl } : {};
      await editUserProfile(
        //@ts-ignore
        {
          id: userId,
          ...values,
          ...imageData,
        }
      ).then((data) => {
        if (data.success) {
          toast({
            title: "Update Successfull",
            description: "User details updated successfully",
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

  return (
    <Card className="p-5 mt-5">
      <h1 className="font-semibold">Basic Information</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex gap-5 items-center"
        >
          <div className="w-1/2 flex flex-col items-center gap-3">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Image"
                width={200}
                height={200}
                className="rounded-full object-cover h-[200px] w-[200px]"
              />
            ) : (
              <Image
                src="/assets/avatar.png"
                alt="Image"
                width={200}
                height={200}
                className="rounded-full"
              />
            )}

            <UploadButton
              className="bg-zinc-300 px-10 rounded-full text-primary"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                toast({
                  title: "Upload Successfull",
                  description: "User image uploaded successfully",
                });
                setImageUrl(res[0].url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                toast({
                  variant: "destructive",
                  title: "Something went wrong",
                  description: `${error}`,
                });
              }}
            />
          </div>
          <div className="grid grid-cols-1 w-full">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write your bio here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center gap-2">
              <Button
                disabled={!form.formState.isDirty || pendings}
                type="submit"
                className=" mt-5 "
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
}

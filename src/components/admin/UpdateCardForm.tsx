"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ServicesSchema } from "@/lib/validateForm";

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
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";
import { useToast } from "../ui/use-toast";
import { useParams } from "next/navigation";
import { updateService } from "@/app/actions/services";

const UpdateCardForm = ({ data }: { data: any }) => {
  const params = useParams();
  const serviceId = params.id as string;
  const { toast } = useToast();
  const form = useForm<z.infer<typeof ServicesSchema>>({
    resolver: zodResolver(ServicesSchema),
    defaultValues: {
      name: data.name || "",
      description: data.description || "",
      price: data.price || "",
      duration: data.duration || "",
      image: data.image || "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        duration: data.duration || "",
        image: data.image || "",
      });
    }
  }, [data, form]);

  async function onSubmit(values: z.infer<typeof ServicesSchema>) {
    try {
      const res = await updateService(serviceId, { ...values });
      if (res.success) {
        toast({
          title: "Service updated successfully",
          description: "Service updated successfully",
        });
      } else {
        console.log(res.error);

        toast({
          title: "Error updating service",
          description: "Error updating service",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Error updating service",
        variant: "destructive",
      });
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <div className='flex gap-5'>
          <div>
            <div className='relative w-[20rem] h-[20rem]'>
              <Image
                src={form.watch("image")}
                alt='Image'
                fill
                className='rounded-md'
              />
            </div>
            <UploadButton
              endpoint='imageUploader'
              className='mt-2 ut-button:bg-blue-300 hover:cursor-pointer '
              onClientUploadComplete={(res) => {
                // console.log("Uploaded image URL:", res[0].url);
                form.setValue("image", res[0].url);
                toast({
                  title: "Upload Successfull",
                  description: "User image uploaded successfully",
                });
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                toast({
                  title: "Something went wrong",
                  description: "Uploading image failed",
                  variant: "destructive",
                });
              }}
            />
          </div>
          <div className='w-full'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='my-2'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className='h-32' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-3 items-center my-2'>
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='duration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration/hrs</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className='w-full flex justify-end my-2'>
          <Button type='submit' className=' '>
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateCardForm;

"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ServicesSchema } from "@/lib/validateForm";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { PhilippinePeso } from "lucide-react";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { createServices } from "@/app/actions/services";
import { useToast } from "../ui/use-toast";

export default function ServicesForm() {
  const { toast } = useToast();
  // const [uploadUrl, setUploadUrl] = useState<string>("");
  // const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ServicesSchema>>({
    resolver: zodResolver(ServicesSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      duration: 0,
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ServicesSchema>) {
    if (!values.image) {
      toast({
        title: "Error image required.",
        description: `Please upload an image`,
        variant: "destructive",
      });
      return;
    }
    setFeedback(null);
    const serviceData = {
      ...values,
      price: Number(values.price),
      duration: Number(values.duration),
    };

    try {
      const response = await createServices(serviceData);

      if (response.success) {
        toast({
          title: "Created Successfull!",
          description: "Service created successfully",
        });
        form.reset(); // Reset the form on success
      } else {
        toast({
          title: "Failed to add service",
          description: `${response.error}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `Please try again`,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 w-full'>
        <div className=''>
          <UploadButton
            endpoint='imageUploader'
            className='mt-2 ut-button:bg-blue-300 hover:cursor-pointer '
            onClientUploadComplete={(res) => {
              // console.log("Uploaded image URL:", res[0].url);
              form.setValue("image", res[0].url);
              toast({
                title: "Upload Successfull",
                description: "Image uploaded successfully",
              });
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              toast({
                title: "Upload Successfull",
                description: "Something went wrong uploading the image",
                variant: "destructive",
              });
            }}
          />
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
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-3 items-center'>
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex'>
                      Price/
                      <PhilippinePeso className='w-3 h-3 text-muted-foreground' />
                    </FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='$0.00' {...field} />
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
                      <Input type='number' placeholder='hrs' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {feedback && <p className='text-sm mt-2'>{feedback}</p>}
        <Button type='submit' disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

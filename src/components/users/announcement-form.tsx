"use client";

import { AnnouncementSchema } from "@/lib/validateForm";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createAnnouncement } from "@/app/actions/announcement";
import { useToast } from "../ui/use-toast";

export default function AnnouncementForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof AnnouncementSchema>>({
    resolver: zodResolver(AnnouncementSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: {
        from: new Date(),
        to: new Date(),
      },
      type: "closed", // or any valid value from the union type "discount" | "closed" | "other"
      status: "active",
    },
  });

  async function onSubmit(values: z.infer<typeof AnnouncementSchema>) {
    const fromDate = new Date(values.duration.from);
    const toDate = new Date(values.duration.to);
    const res = await createAnnouncement({
      ...values,
      duration: {
        from: fromDate,
        to: toDate,
      },
    });
    if (res.success) {
      form.reset();
      toast({
        title: "Announcement created successfully",
        description: "Announcement created successfully",
      });
    } else {
      toast({
        title: "Creating announcement failed!",
        description: res.error,
        variant: "destructive",
      });
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
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
                <Textarea placeholder='Write here...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='discount'>Discount</SelectItem>
                  <SelectItem value='closed'>Closed</SelectItem>
                  <SelectItem value='other'>Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel className='text-muted-foreground'>Duration</FormLabel>
          <div className='grid grid-cols-2 gap-3'>
            <FormField
              control={form.control}
              name='duration.from'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='duration.to'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}

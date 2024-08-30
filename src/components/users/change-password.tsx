"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Card } from "../ui/card";
import { EditSecurity } from "@/lib/validateForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { changeSecurity } from "@/app/actions/user";
import { useToast } from "../ui/use-toast";

export default function ChangePassword() {
  const { toast } = useToast();
  const params = useParams();
  const [error, setError] = useState("");
  //   const [success, setSuccess] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/${params.id}`);
        const userData = response.data.user;
        // Set the default values of the form fields with user data
        form.reset({
          email: userData.email,
          //   password: userData.password,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [params.id]);

  const form = useForm<z.infer<typeof EditSecurity>>({
    resolver: zodResolver(EditSecurity),
    defaultValues: {
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof EditSecurity>) {
    try {
      if (values.newPassword !== values.confirmNewPassword) {
        setError("New password don't match");
        return;
      }
      if (!values.oldPassword) {
        setError("Please enter your old password");
        return;
      }
      const userId: any = params.id;
      setOpenDialog(true);
      await changeSecurity({
        //@ts-ignore
        id: userId,
        oldPassword: values.oldPassword,
        password: values.newPassword,
        email: values.email,
      })
        .then((data) => {
          if (data.success) {
            setOpenDialog(false);
            toast({
              title: "Update Successfull",
              description: "Password updated successfully",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Something went wrong",
              description: `${data.error}`,
            });
            setError(data.error);
          }
        })
        .catch((e) => {
          setError(e.message);
          setOpenDialog(false);
        });
    } catch (error: any) {
      console.log(error.message);
      setOpenDialog(false);
      setError("An error occurred while updating password");
    }
  }
  // const handleOpendialog = () => {
  //   setOpenDialog(true);
  // };
  // const handleContinue = async () => {
  //   form.handleSubmit(onSubmit)(); // Call the onSubmit function to submit the form
  //   setOpenDialog(false);
  // };
  return (
    <>
      <Card className="mt-10 p-5">
        <h1 className="font-semibold">Account Security</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-2 mt-5 items-center gap-10">
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-sm text-zinc-500">
                <ul className="list-disc flex flex-col gap-2">
                  <li>
                    To update new password you must provide the old password
                  </li>
                  <li>Password must contain at least 5 characters</li>
                  <li>Always remember your email and password</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-8 ">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        className="w-[16.5rem]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        className="w-[16.5rem]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col ">
              <span className="text-red-500 text-sm">{error}</span>
              <Button
                variant="destructive"
                type="submit"
                className="w-[8rem] mt-3"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </Card>
      <AlertDialog
        open={openDialog}
        onOpenChange={(open) => setOpenDialog(open)}
      >
        <AlertDialogTrigger>
          {/* <Button variant="outline">Show Dialog</Button> */}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will change your account
              credential.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => setOpenDialog(false)}
              className="mt-1.5"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CardWrapper } from "./card-wrapper";
import { LoginSchema } from "@/lib/validateForm";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { doCredentialLogin } from "@/app/actions/user";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

export const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState<string | undefined>();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    try {
      setIsPending(true);
      const formData = new FormData(event.currentTarget);
      const response = await doCredentialLogin(formData);
      if (!!response.error) {
        setError(response.error);
        console.log(response.error);

        setIsPending(false);
      } else {
        if (response.role === "admin" || response.role === "secretary") {
          toast({
            title: "Login Admin Successful",
            description: "Welcome back!",
          });
          router.push("/dashboard");
        } else {
          toast({
            title: "Login Successful",
            description: "Welcome back!",
          });
          router.push("/");
        }
        setIsPending(false);
      }
    } catch (error: any) {
      setError("Check your credentials or account might be deactivated");
      setIsPending(false);
    }
  };

  return (
    <CardWrapper
      headerTitle="Sign in"
      headerLabel="Welcome Back!"
      backButtonHref="/register"
      backButtonText="Don't have an account?"
      backButtonLabel="sign up"
      // socialLabel="Sign in with"
      // showSocial
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" name="password" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-red-500 text-sm">{error}</span>
        </div>
        <Button
          disabled={isPending}
          type="submit"
          className="w-full mt-5 bg-teal-500 hover:bg-teal-600"
          size="lg"
        >
          Login
        </Button>
      </form>
    </CardWrapper>
  );
};

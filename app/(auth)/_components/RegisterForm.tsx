"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { registerSchema, type RegisterForm } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";

function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<RegisterForm>({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  return (
    <div className='max-w-xs mx-auto space-y-3'>
      <h1 className='font-bold text-3xl text-center'>Create Your Account</h1>
      <p className='text-muted-foreground text-center'>
        Start using the site by first creating an account
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async ({ name, email, password }) => {
            try {
              setLoading(true);

              const response = await axios.post("/api/register", {
                name,
                email,
                password,
              });

              router.replace("/signin");

              router.refresh();
            } catch (error) {
              if (axios.isAxiosError(error)) {
                if (error.response?.data?.error) {
                  toast.error(error.response?.data?.error);
                }
              } else {
                toast.error("Server Error: Something went wrong");
              }
            } finally {
              setLoading(false);
            }
          })}
          className='space-y-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='youremail@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full' disabled={loading}>
            {loading ? <Spinner /> : "Register"}
          </Button>
        </form>
      </Form>
      <div className='py-4 relative'>
        <Separator />
        <span className='text-sm absolute top-2.5 left-1/2 -translate-y-1.5 -translate-x-1/2 px-1 bg-background'>
          or continue with
        </span>
      </div>
      <GoogleButton />
      <p className='text-sm text-center pt-4'>
        Already have an account?{" "}
        <Link href='/signin' className='font-medium text-primary'>
          Log In
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;

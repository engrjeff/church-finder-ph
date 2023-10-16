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
import { loginSchema, type LoginForm } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";

function SignInForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  return (
    <div className='max-w-xs mx-auto space-y-3'>
      <h1 className='font-bold text-3xl text-center'>
        Welcome to <span className='block'>Church Finder PH</span>
      </h1>
      <p className='text-muted-foreground text-center'>
        Log in to your account
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async ({ email, password }) => {
            setLoading(true);
            const response = await signIn("credentials", {
              email,
              password,
              redirect: false,
            });

            if (!response?.ok) {
              toast.error("No account found");
              setLoading(false);
              return;
            }

            toast.success("Welcome back!");

            router.replace("/me");
            router.refresh();
          })}
          className='space-y-4'
        >
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
            {loading ? <Spinner /> : "Sign In"}
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
        No account yet?{" "}
        <Link href='/register' className='font-medium text-primary'>
          Create an Account
        </Link>
      </p>
    </div>
  );
}

export default SignInForm;

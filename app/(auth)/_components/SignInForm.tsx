'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { loginSchema, type LoginForm } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Spinner from '@/components/spinner';

import GoogleButton from './GoogleButton';
import PasswordInput from './PasswordInput';

function SignInForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  return (
    <div className="mx-auto max-w-sm space-y-3">
      <h1 className="text-center text-3xl font-bold">
        Welcome to <span className="block">Church Finder PH</span>
      </h1>
      <p className="text-center text-muted-foreground">
        Log in to your account
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async ({ email, password }) => {
            setLoading(true);
            const response = await signIn('credentials', {
              email,
              password,
              redirect: false,
            });

            if (!response?.ok) {
              toast.error('No account found');
              setLoading(false);
              return;
            }

            toast.success('Welcome back!');

            router.replace('/me');
            router.refresh();
          })}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="youremail@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
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
          <div className="pt-6">
            <Button className="h-12 w-full" disabled={loading}>
              {loading ? <Spinner /> : 'Sign In'}
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative py-4">
        <Separator />
        <span className="absolute left-1/2 top-2.5 -translate-x-1/2 -translate-y-1.5 bg-background px-1 text-sm">
          or continue with
        </span>
      </div>
      <GoogleButton />

      <p className="pt-4 text-center text-sm">
        No account yet?{' '}
        <Link href="/register" className="font-medium text-primary">
          Create an Account
        </Link>
      </p>
    </div>
  );
}

export default SignInForm;

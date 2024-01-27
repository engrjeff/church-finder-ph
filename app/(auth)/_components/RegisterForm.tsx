'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { registerSchema, type RegisterForm } from '@/lib/validations/auth';
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

import PasswordInput from './PasswordInput';

function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<RegisterForm>({
    defaultValues: { name: '', email: '', password: '' },
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  return (
    <div className="mx-auto max-w-sm space-y-3">
      <h1 className="text-center text-3xl font-bold">Create Your Account</h1>
      <p className="text-center text-muted-foreground">
        Start using the site by first creating an account
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async ({ name, email, password }) => {
            try {
              setLoading(true);

              const response = await axios.post('/api/register', {
                name,
                email,
                password,
              });

              toast.success('You are now registered! Now log in your account.');

              router.replace('/signin');

              router.refresh();
            } catch (error) {
              if (axios.isAxiosError(error)) {
                if (error.response?.data?.error) {
                  toast.error(error.response?.data?.error);
                }
              } else {
                toast.error('Server Error: Something went wrong');
              }
            } finally {
              setLoading(false);
            }
          })}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              {loading ? <Spinner /> : 'Register'}
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative hidden py-4">
        <Separator />
        <span className="absolute left-1/2 top-2.5 -translate-x-1/2 -translate-y-1.5 bg-background px-1 text-sm">
          or continue with
        </span>
      </div>
      <p className="pt-4 text-center text-sm">
        Already have an account?{' '}
        <Link href="/signin" className="font-medium text-primary">
          Log In
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;

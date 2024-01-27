'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cross1Icon } from '@radix-ui/react-icons';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { churchApi } from '@/lib/apiClient';
import { cn, errorHandler } from '@/lib/utils';
import {
  churchContactSchema,
  type ChurchContactData,
} from '@/lib/validations/church';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const defaultValues: ChurchContactData = {
  email: '',
  website: null,
  contact_numbers: [{ value: '' }],
  social_links: [],
};

function ChurchContactForm({
  churchContactData,
  churchContactId,
}: {
  churchContactId?: string;
  churchContactData?: ChurchContactData;
}) {
  const form = useForm<ChurchContactData>({
    resolver: zodResolver(churchContactSchema),
    defaultValues: churchContactData ? churchContactData : defaultValues,
    mode: 'onChange',
  });

  const contactNumbers = useFieldArray({
    name: 'contact_numbers',
    control: form.control,
  });

  const socialLinks = useFieldArray({
    name: 'social_links',
    control: form.control,
  });

  const router = useRouter();

  const [savingStatus, setSavingStatus] = useState<
    'idle' | 'saving' | 'saving-exit'
  >('idle');

  const isLoading = savingStatus !== 'idle';

  const { id: church_id } = useParams<{ id: string }>();

  const handleSave = async (values: ChurchContactData) => {
    try {
      let result;
      if (churchContactId) {
        result = await churchApi.churchContact.update(church_id, {
          ...values,
          id: churchContactId,
        });
      } else {
        result = await churchApi.churchContact.create({
          ...values,
          church_id,
        });
      }

      if (result.data.status === 'success') {
        form.reset();

        toast.success('Church contact info was saved!');
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setSavingStatus('idle');
    }
  };

  const onSubmit: SubmitHandler<ChurchContactData> = async (values) => {
    setSavingStatus('saving');

    await handleSave(values);

    router.push(`/me/church/${church_id}/edit?step=pastor-profile`, {
      scroll: true,
    });

    router.refresh();
  };

  const handleSaveAndExit = async () => {
    const noError = await form.trigger();

    if (!noError) return;

    setSavingStatus('saving-exit');

    const values = form.getValues();
    await handleSave(values);

    router.push('/me/church');

    router.refresh();
  };

  const onError: SubmitErrorHandler<ChurchContactData> = (err) => {
    console.log(err);
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Church Contact Info</CardTitle>
        <CardDescription>
          Provide your church&apos;s contact info
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <fieldset disabled={isLoading} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        inputMode="email"
                        placeholder="contact@mychurch.org"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel optional>Website</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        inputMode="url"
                        placeholder="https://mylocalchurch.org"
                        {...field}
                        value={field.value === null ? '' : field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-3">
                <Label>Church Contact Numbers</Label>
                {contactNumbers.fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex flex-col gap-4 md:flex-row"
                  >
                    <FormField
                      control={form.control}
                      name={`contact_numbers.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="max-w-[300px] md:flex-1">
                          <FormDescription
                            className={cn(index !== 0 && 'sr-only')}
                          >
                            Contact Number
                          </FormDescription>
                          <FormControl>
                            <Input placeholder="+639XXXXXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {contactNumbers.fields.length > 1 && (
                      <Button
                        aria-label="delete contact number"
                        variant="outline"
                        size="icon"
                        className={cn(
                          index === 0 ? 'mt-7' : 'mt-2 self-start',
                          'h-10 w-10'
                        )}
                        type="button"
                        onClick={() => contactNumbers.remove(index)}
                      >
                        <Cross1Icon className="size-5 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => contactNumbers.append({ value: '' })}
                >
                  Add Contact Number
                </Button>
              </div>
              <div className="space-y-3">
                <Label className="block">Social Links</Label>
                {socialLinks.fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex flex-col gap-4 md:flex-row"
                  >
                    <FormField
                      control={form.control}
                      name={`social_links.${index}.platform`}
                      render={({ field }) => (
                        <FormItem>
                          <FormDescription
                            className={cn(index !== 0 && 'sr-only')}
                          >
                            Platform
                          </FormDescription>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={
                              field.value === '' ? undefined : field.value
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select social platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[
                                'Facebook',
                                'Instagram',
                                'YouTube',
                                'Tiktok',
                                'Pinterest',
                                'Twitter',
                              ].map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`social_links.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormDescription
                            className={cn(index !== 0 && 'sr-only')}
                          >
                            URL
                          </FormDescription>
                          <FormControl>
                            <Input
                              type="url"
                              inputMode="url"
                              placeholder="www.facebook.com/mychurch"
                              className="w-[320px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {socialLinks.fields.length > 1 && (
                      <Button
                        aria-label="delete social link"
                        variant="outline"
                        size="icon"
                        className={cn(
                          index === 0 ? 'mt-7' : 'mt-2 self-start',
                          'h-10 w-10'
                        )}
                        type="button"
                        onClick={() => socialLinks.remove(index)}
                      >
                        <Cross1Icon className="size-5 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => socialLinks.append({ platform: '', url: '' })}
                >
                  Add Social Link
                </Button>
              </div>
              <div className="space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="shadow-none"
                  onClick={handleSaveAndExit}
                >
                  {savingStatus === 'saving-exit'
                    ? 'Saving changes...'
                    : 'Save and Exit'}
                </Button>
                <Button type="submit" size="lg" className="ml-auto shadow-none">
                  {savingStatus === 'saving'
                    ? 'Saving changes...'
                    : 'Save and Continue'}
                </Button>
              </div>
            </fieldset>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ChurchContactForm;

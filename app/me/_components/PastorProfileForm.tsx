'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { churchApi } from '@/lib/apiClient';
import { errorHandler } from '@/lib/utils';
import {
  pastorProfileSchema,
  type PastorProfileData,
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
import { Textarea } from '@/components/ui/textarea';
import AvatarPicker from '@/components/avatar-picker';

const defaultValues: PastorProfileData = {
  name: '',
  bio: '',
  photo: '',
};

function PastorProfileForm({
  pastorProfileId,
  pastorData,
}: {
  pastorProfileId?: string;
  pastorData?: PastorProfileData;
}) {
  const form = useForm<PastorProfileData>({
    resolver: zodResolver(pastorProfileSchema),
    defaultValues: pastorData ? pastorData : defaultValues,
    mode: 'onChange',
  });

  const router = useRouter();

  const [savingStatus, setSavingStatus] = useState<
    'idle' | 'saving' | 'saving-exit'
  >('idle');

  const isLoading = savingStatus !== 'idle';

  const { id: church_id } = useParams<{ id: string }>();

  const handleSave = async (values: PastorProfileData) => {
    try {
      let result;
      if (pastorProfileId) {
        result = await churchApi.pastorProfile.update(church_id, {
          ...values,
          id: pastorProfileId,
        });
      } else {
        result = await churchApi.pastorProfile.create({
          ...values,
          church_id,
        });
      }

      if (result.data.status === 'success') {
        form.reset();

        toast.success('Pastor profile was saved!');
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setSavingStatus('idle');
    }
  };

  const onSubmit: SubmitHandler<PastorProfileData> = async (values) => {
    setSavingStatus('saving');

    await handleSave(values);

    router.push(`/me/church/${church_id}/edit?step=media`, {
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

  const onError: SubmitErrorHandler<PastorProfileData> = (err) => {
    console.log(err);
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Pastor&apos;s Profile</CardTitle>
        <CardDescription>
          Let potential visitors know your church pastor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <fieldset disabled={isLoading} className="space-y-6">
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AvatarPicker
                        src={field.value}
                        label="Photo"
                        desc="Upload a photo"
                        onAfterUpload={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pastor&apos; name</FormLabel>
                    <FormControl>
                      <Input placeholder="Pastor's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormDescription>
                      A short bio about the church&apos;s pastor.
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a short bio"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

export default PastorProfileForm;

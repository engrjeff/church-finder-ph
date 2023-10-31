'use client';

import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { churchApi } from '@/lib/apiClient';
import { errorHandler } from '@/lib/utils';
import {
  churchMediaSchema,
  type ChurchMediaData,
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
import FileDropZone from '@/components/file-drop-zone';

const defaultValues: ChurchMediaData = {
  gallery: [],
};

function ChurchMediaForm({
  churchMediaData,
  churchMediaId,
}: {
  churchMediaData?: ChurchMediaData;
  churchMediaId?: string;
}) {
  const form = useForm<ChurchMediaData>({
    resolver: zodResolver(churchMediaSchema),
    defaultValues: churchMediaData ? churchMediaData : defaultValues,
    mode: 'onChange',
  });

  const galleryValues = useFieldArray({
    name: 'gallery',
    control: form.control,
  });

  const { id: church_id } = useParams<{ id: string }>();

  const onSubmit: SubmitHandler<ChurchMediaData> = async (values) => {
    try {
      let result;
      if (churchMediaId) {
        result = await churchApi.churchMedia.update(church_id, {
          ...values,
          id: churchMediaId,
        });
      } else {
        result = await churchApi.churchMedia.create({
          ...values,
          church_id,
        });
      }

      if (result.data.status === 'success') {
        toast.success('Church media saved!');
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const onError: SubmitErrorHandler<ChurchMediaData> = (err) => {
    console.log(err);
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Church Media</CardTitle>
        <CardDescription>
          Add media assets to showcase your church
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="gallery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gallery</FormLabel>
                  <FormDescription>
                    Upload some photos for others to see.
                  </FormDescription>
                  <FormControl>
                    <FileDropZone
                      fileData={field.value}
                      onRemoveExisting={galleryValues.remove}
                      onClearAll={galleryValues.remove}
                      onSave={async (data) => {
                        form.setValue('gallery', data);

                        await onSubmit({ gallery: data });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="hidden space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="shadow-none"
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" className="ml-auto shadow-none">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ChurchMediaForm;

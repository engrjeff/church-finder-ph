'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';

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

function ChurchMediaForm() {
  const form = useForm<ChurchMediaData>({
    resolver: zodResolver(churchMediaSchema),
    defaultValues,
    mode: 'onChange',
  });

  const galleryValues = useFieldArray({
    name: 'gallery',
    control: form.control,
  });

  const onSubmit: SubmitHandler<ChurchMediaData> = (values) => {
    console.log(values);
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
                      onSave={(data) => {
                        form.setValue('gallery', data);
                      }}
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

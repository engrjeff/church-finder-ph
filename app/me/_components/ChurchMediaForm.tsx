'use client';

import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { churchApi } from '@/lib/apiClient';
import { errorHandler, getYoutubeVideoId } from '@/lib/utils';
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
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import FileDropZone from '@/components/file-drop-zone';
import YouTube from '@/app/_components/Youtube';

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
  const router = useRouter();

  const introVideoLinkValue = form.watch('intro_video_link');
  const introVideoId = introVideoLinkValue
    ? getYoutubeVideoId(introVideoLinkValue)
    : null;

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

      router.refresh();
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
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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
            <Separator />
            <div className="grid grid-cols-2 gap-6">
              <div className="flex-1 space-y-3">
                <FormField
                  control={form.control}
                  name="intro_video_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Intro Video Link</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          inputMode="url"
                          placeholder="A YouTube URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  size="lg"
                  className="ml-auto shadow-none"
                  onClick={async () => {
                    await onSubmit({ intro_video_link: introVideoLinkValue });
                  }}
                >
                  Save
                </Button>
              </div>

              {introVideoId ? (
                <YouTube videoId={introVideoId} />
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-xl bg-white/5 p-6 shadow">
                  <p className="text-center text-muted-foreground">
                    A preview will appear here.
                  </p>
                </div>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ChurchMediaForm;

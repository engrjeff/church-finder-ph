import Image from 'next/image';
import Link from 'next/link';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { getYoutubeVideoId } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import YouTube from '@/app/_components/Youtube';

import { getChurchMedia } from '../services/church';

async function ChurchMediaDetails({ churchId }: { churchId: string }) {
  const churchMedia = await getChurchMedia(churchId);

  if (!churchMedia) {
    return (
      <div className="py-4 text-center">
        <p className="mb-2 text-muted-foreground">No church media yet.</p>
        <Link
          href={`/me/church/${churchId}/edit?step=media`}
          className={buttonVariants()}
        >
          Add Church Media
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Church Media</h2>
        <Link
          href={`/me/church/${churchId}/edit?step=media`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <span className="sr-only">edit church media</span>
          <Pencil1Icon className="size-4" />
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-3">
            {churchMedia.gallery?.map((image, index) => (
              <li
                key={`church-media-gallery-${index + 1}`}
                className="relative aspect-video w-full"
              >
                <Image
                  className=""
                  fill
                  src={image.url}
                  alt={image.name}
                  blurDataURL={image.url}
                />
              </li>
            ))}
          </ul>
        </CardContent>

        {churchMedia.intro_video_link ? (
          <>
            <CardHeader>
              <CardTitle>YouTube Intro Video</CardTitle>
            </CardHeader>
            <CardContent>
              <YouTube
                videoId={getYoutubeVideoId(churchMedia.intro_video_link)!}
              />
            </CardContent>
          </>
        ) : null}
      </Card>
    </div>
  );
}

export default ChurchMediaDetails;

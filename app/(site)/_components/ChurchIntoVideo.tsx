'use client';

import { getYoutubeVideoId } from '@/lib/utils';
import YouTube from '@/app/_components/Youtube';

function ChurchIntoVideo({
  introVideoLink,
}: {
  introVideoLink: string | undefined;
}) {
  if (!introVideoLink) return null;

  const introVideoId = getYoutubeVideoId(introVideoLink);

  if (!introVideoId) return null;

  return <YouTube videoId={introVideoId} />;
}

export default ChurchIntoVideo;

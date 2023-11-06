import prisma from '@/prisma/client';

export async function getPublishedChurches() {
  const publishedChurches = await prisma.church.findMany({
    where: {
      status: 'PUBLISHED',
    },

    include: {
      profile: true,
      church_media: true,
    },
  });

  return publishedChurches;
}

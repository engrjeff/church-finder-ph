import prisma from '@/prisma/client';

export async function getChurchFormData(churchId: string) {
  const church = await prisma.church.findUnique({
    where: { id: churchId },
    include: {
      profile: true,
      contact_details: true,
      pastor_details: true,
      church_media: true,
      church_map: true,
    },
  });

  return church;
}

export type ChurchFormData = Awaited<ReturnType<typeof getChurchFormData>>;

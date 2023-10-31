import prisma from '@/prisma/client';

export async function getChurchFormData(churchId: string) {
  const church = await prisma.church.findUnique({
    where: { id: churchId },
    include: { profile: true },
  });

  return church;
}

export type ChurchFormData = Awaited<ReturnType<typeof getChurchFormData>>;

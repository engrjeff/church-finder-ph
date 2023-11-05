import prisma from '@/prisma/client';

import { ChurchContactData, ChurchProfileData } from '@/lib/validations/church';

export async function getChurchById(churchId: string) {
  const church = await prisma.church.findUnique({
    where: { id: churchId },
  });

  return church;
}

export async function getChurchProfile(churchId: string) {
  const churchProfile = await prisma.churchProfile.findFirst({
    where: { church_id: churchId },
  });
  return churchProfile as unknown as ChurchProfileData | null;
}

export async function getChurchContactInfo(churchId: string) {
  const churchContact = await prisma.churchContact.findFirst({
    where: { church_id: churchId },
  });
  return churchContact as unknown as ChurchContactData | null;
}

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

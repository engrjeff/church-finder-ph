import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';

import { getRegions } from '@/lib/address';
import {
  ChurchContactData,
  ChurchMediaData,
  ChurchProfileData,
  PastorProfileData,
} from '@/lib/validations/church';

interface ChurchParamsInput {
  region?: string | string[];
  province?: string | string[];
  sort?: string;
  page?: string;
}

const PAGE_SIZE = 20;

export async function getPublishedChurches(params?: ChurchParamsInput) {
  const sort = params?.sort?.split(':');

  const page = params?.page ? parseInt(params.page) : 1;

  const publishedChurches = await prisma.church.findMany({
    where: {
      status: 'PUBLISHED',
      province: {
        in:
          typeof params?.province === 'string'
            ? [params.province]
            : params?.province,
      },
      region: {
        in:
          typeof params?.region === 'string' ? [params.region] : params?.region,
      },
    },
    include: {
      profile: true,
      church_media: true,
    },
    take: PAGE_SIZE,
    skip: page ? (page - 1) * PAGE_SIZE : 0,
    orderBy: sort
      ? {
          [sort[0]]: sort[1],
        }
      : undefined,
  });

  return publishedChurches.map((church) => ({
    ...church,
    profile: church.profile as unknown as ChurchProfileData,
    church_media: church.church_media as unknown as ChurchMediaData,
  }));
}

export async function getChurchFilters() {
  const filters = await prisma.church.findMany({
    where: {
      status: 'PUBLISHED',
    },
    select: {
      region: true,
    },
    orderBy: {
      region: 'asc',
    },
  });

  const uniqueRegions = Array.from(new Set(filters.map((f) => f.region)));

  const regionsArr = await getRegions();

  const regionFilters = uniqueRegions.map(
    (region) => regionsArr.find((r) => region === r.region_code)!
  );

  return { region: regionFilters };
}

export async function getChurch(slug: string) {
  const churchId = slug.split('_')[1];

  const church = await prisma.church.findFirst({
    where: { id: churchId, status: 'PUBLISHED' },
    include: {
      profile: true,
      contact_details: true,
      church_media: true,
      pastor_details: true,
    },
  });

  if (!church) return notFound();

  return {
    ...church,
    profile: church.profile as unknown as ChurchProfileData,
    contact_details: church.contact_details as unknown as ChurchContactData,
    church_media: church.church_media as unknown as ChurchMediaData,
    pastor_details: church.pastor_details as unknown as PastorProfileData,
  };
}

export type ChurchItem = Awaited<
  ReturnType<typeof getPublishedChurches>
>[number];

export type ChurchFilters = Awaited<ReturnType<typeof getChurchFilters>>;

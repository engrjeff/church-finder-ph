import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { ChurchProfileData } from '@/lib/validations/church';
import { buttonVariants } from '@/components/ui/button';
import BackLink from '@/components/back-link';

import ChurchProfileDetails from '../../_components/ChurchProfileDetails';

async function ChurchDetailsPage({ params }: { params: { id: string } }) {
  const church = await prisma.church.findUnique({
    where: { id: params.id },
    include: { profile: true },
  });

  if (!church) return notFound();

  return (
    <>
      <div className="mb-6 flex items-center gap-3 border-b pb-6">
        <BackLink href="/me/church" aria-label="Back to church list" />
        <Image
          src={church.logo}
          alt={`${church.name} logo`}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
        />
        <h1 className="text-xl font-bold">{church.name}</h1>
        <Link
          href={`/me/church/${church.id}/edit`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <span className="sr-only">edit {church.name}</span>
          <Pencil1Icon className="h-4 w-4" />
        </Link>
      </div>
      <ChurchProfileDetails
        churchProfile={church.profile as unknown as ChurchProfileData}
      />
    </>
  );
}

export default ChurchDetailsPage;

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { buttonVariants } from '@/components/ui/button';
import BackLink from '@/components/back-link';

async function ChurchDetailsPage({ params }: { params: { id: string } }) {
  const church = await prisma.church.findUnique({ where: { id: params.id } });

  if (!church) return notFound();

  return (
    <section>
      <div className="mb-6 border-b py-4">
        <BackLink href="/me/church">Back to List</BackLink>
      </div>
      <div className="flex items-center gap-3">
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
    </section>
  );
}

export default ChurchDetailsPage;

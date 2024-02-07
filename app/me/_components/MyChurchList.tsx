import Link from 'next/link';
import prisma from '@/prisma/client';
import { PlusIcon } from '@radix-ui/react-icons';

import getSession from '@/lib/getServerSession';
import { buttonVariants } from '@/components/ui/button';

import ChurchCard from './ChurchCard';

async function MyChurchList() {
  const session = await getSession();
  const churchList = await prisma.church.findMany({
    where: { user_id: session?.user?.id },
  });

  if (churchList.length === 0)
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-center text-muted-foreground">
          There&apos;s no church added yet. Add one now.
        </p>

        <Link href="/me/church/new" className={buttonVariants()}>
          <PlusIcon className="mr-2" />
          Add a Church
        </Link>
      </div>
    );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Your Church Listings</h1>
        <Link href="/me/church/new" className={buttonVariants()}>
          <PlusIcon className="mr-2" />
          Add New
        </Link>
      </div>
      <ul className="grid grid-cols-4 gap-6">
        {churchList.map((church) => (
          <li key={`church::${church.id}`}>
            <ChurchCard church={church} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyChurchList;

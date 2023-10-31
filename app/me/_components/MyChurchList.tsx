import Link from 'next/link';
import prisma from '@/prisma/client';

import getSession from '@/lib/getServerSession';

import ChurchCard from './ChurchCard';

export const dynamic = 'force-dynamic';

async function MyChurchList() {
  const session = await getSession();
  const churchList = await prisma.church.findMany({
    where: { user_id: session?.user?.id },
  });

  if (churchList.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-center text-muted-foreground">
          There&apos;s no church added yet. Add one now.
        </p>
      </div>
    );

  return (
    <ul className="grid grid-cols-3 gap-4">
      {churchList.map((church) => (
        <li key={church.id}>
          <Link href={`/me/church/${church.id}`}>
            <ChurchCard church={church} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MyChurchList;

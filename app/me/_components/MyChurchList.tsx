import Link from 'next/link';
import prisma from '@/prisma/client';

import getSession from '@/lib/getServerSession';

import ChurchCard from './ChurchCard';

async function MyChurchList() {
  const session = await getSession();
  const churchList = await prisma.church.findMany({
    where: { user_id: session?.user?.id },
  });

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

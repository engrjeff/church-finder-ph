import prisma from '@/prisma/client';

import getSession from '@/lib/getServerSession';

import ChurchCard from './ChurchCard';

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
    <ul className="grid grid-cols-4 gap-6">
      {churchList.map((church) => (
        <li key={`church::${church.id}`}>
          <ChurchCard church={church} />
        </li>
      ))}
    </ul>
  );
}

export default MyChurchList;

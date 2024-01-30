import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

import { getPublishedChurches } from '../services/church';
import ChurchListItem from './ChurchListItem';

async function MiniChurchList() {
  const churches = await getPublishedChurches();

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {churches.map((church) => (
          <li key={`church::${church.id}`}>
            <ChurchListItem church={church} />
          </li>
        ))}
      </ul>
      <div className="my-8 text-center">
        <Link
          href="/churches"
          className={cn(buttonVariants(), 'h-12 w-[200px] rounded-full')}
        >
          See More
        </Link>
      </div>
    </>
  );
}

export default MiniChurchList;

import { Suspense } from 'react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import ChurchList from '../_components/ChurchList';
import ChurchListingFilters from '../_components/ChurchListingFilters';
import ChurchSortSelect from '../_components/ChurchSortSelect';
import { ChurchListPageProps } from '../_types';

export const metadata: Metadata = {
  title: 'Churches',
};

function ChurchesPage({ searchParams }: ChurchListPageProps) {
  return (
    <section className="container my-6 px-4 lg:my-20">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">List of Biblical Churches</h1>
        <p>
          Curated list of biblical churches. One of them can be your new home.
        </p>
      </div>
      <div className="my-6 flex items-center space-x-1.5 text-sm">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>
          <ChevronRight className="size-3" />
        </span>
        <span className="font-semibold">Church List</span>
      </div>

      <div className="flex flex-row-reverse gap-4">
        <div className="hidden w-[280px] shrink-0 space-y-4 border-l pl-4 lg:block">
          <Suspense fallback={<p>Loading...</p>}>
            <ChurchSortSelect />
            <ChurchListingFilters />
          </Suspense>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <ChurchList searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}

export default ChurchesPage;

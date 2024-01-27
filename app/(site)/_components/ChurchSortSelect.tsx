'use client';

import { FormEventHandler } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

function ChurchSortSelect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSortChange: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const sort = formData.get('sort');

    const queryParams = new URLSearchParams(searchParams);

    if (sort) {
      queryParams.set('sort', sort as string);
    } else {
      queryParams.delete('sort');
    }

    const paramsString = queryParams.toString();

    router.push(
      paramsString.length > 0 ? `${pathname}?${paramsString}` : pathname
    );
  };

  return (
    <form onChange={handleSortChange}>
      <div>
        <label htmlFor="church-sort" className="sr-only text-sm">
          Sort
        </label>

        <div className="relative w-full">
          <select
            defaultValue={searchParams.get('sort') ?? ''}
            name="sort"
            id="church-sort"
            className="h-9 w-full appearance-none rounded border border-transparent bg-white/5 px-2 py-1.5 text-sm outline-none ring-1 ring-transparent focus-visible:border-primary focus-visible:ring-primary"
          >
            <option value="">Default Order</option>
            <option value="name:desc">Name</option>
            <option value="createdAt:desc">Newest Listings</option>
            <option value="createdAt:asc">Oldest Listings</option>
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-2.5 size-4"
          />
        </div>
      </div>
    </form>
  );
}

export default ChurchSortSelect;

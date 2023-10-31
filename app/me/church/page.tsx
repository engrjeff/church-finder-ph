import Link from 'next/link';
import { PlusIcon } from '@radix-ui/react-icons';

import { buttonVariants } from '@/components/ui/button';

import MyChurchList from '../_components/MyChurchList';

export const dynamic = 'force-dynamic';

function MyChurchListingPage() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Your Church Listings</h1>
        <Link href="/me/church/new" className={buttonVariants()}>
          <PlusIcon className="mr-2" />
          Add New
        </Link>
      </div>
      <MyChurchList />
    </>
  );
}

export default MyChurchListingPage;

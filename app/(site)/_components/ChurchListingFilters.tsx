import ChurchFilterGroup from '@/app/me/_components/ChurchFilterGroup';

import { getChurchFilters } from '../services/church';

async function ChurchListingFilters() {
  const filters = await getChurchFilters();

  if (filters.region.length === 0) return null;

  return (
    <div className="w-full rounded-lg bg-white/5 p-4">
      <ChurchFilterGroup filters={filters} />
    </div>
  );
}

export default ChurchListingFilters;

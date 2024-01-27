import { useQuery } from '@tanstack/react-query';

import { getProvincesByRegion } from '@/lib/address';

export function useProvinceByRegion(regionCode?: string) {
  return useQuery({
    queryKey: ['province', regionCode],
    queryFn: () => (regionCode ? getProvincesByRegion(regionCode) : []),
  });
}

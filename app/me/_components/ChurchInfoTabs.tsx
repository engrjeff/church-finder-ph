'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Tabs } from '@/components/ui/tabs';

function ChurchInfoTabs({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTab = searchParams.get('tab') ?? 'church-profile';

  const createQueryParams = React.useCallback(
    (tab: string) => {
      const queryParams = new URLSearchParams();
      queryParams.set('tab', tab);

      return pathname + `?${queryParams.toString()}`;
    },
    [pathname]
  );

  return (
    <Tabs
      defaultValue={currentTab}
      onValueChange={(tab) => router.push(createQueryParams(tab))}
    >
      {children}
    </Tabs>
  );
}

export default ChurchInfoTabs;

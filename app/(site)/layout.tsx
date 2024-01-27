import { type ReactNode } from 'react';

import Gradients from '@/components/gradients';

function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Gradients />
      <main>{children}</main>
    </>
  );
}

export default SiteLayout;

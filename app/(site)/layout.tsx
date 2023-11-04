import { type ReactNode } from 'react';

import Gradients from '@/components/gradients';

function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Gradients />
      <div className="container py-20">{children}</div>
    </>
  );
}

export default SiteLayout;

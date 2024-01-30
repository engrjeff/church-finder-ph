import { type ReactNode } from 'react';

import Gradients from '@/components/gradients';

import Footer from '../_components/Footer';

function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Gradients />
      {children}
      <Footer />
    </>
  );
}

export default SiteLayout;

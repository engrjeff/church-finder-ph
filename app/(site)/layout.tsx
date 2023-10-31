import { type ReactNode } from 'react';

function SiteLayout({ children }: { children: ReactNode }) {
  return <div className="container py-20">{children}</div>;
}

export default SiteLayout;

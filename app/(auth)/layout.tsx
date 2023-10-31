import { redirect } from 'next/navigation';

import getSession from '@/lib/getServerSession';

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (session && session.user) {
    redirect('/me');
  }

  return <div className="container py-20">{children}</div>;
}

export default AuthLayout;

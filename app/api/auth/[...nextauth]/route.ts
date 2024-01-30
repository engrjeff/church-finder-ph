import NextAuth from 'next-auth/next';

import { nextAUthOptions } from '@/lib/auth-config';

const handler = NextAuth(nextAUthOptions);

export { handler as GET, handler as POST };

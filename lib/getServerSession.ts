import { getServerSession } from 'next-auth';

import { nextAUthOptions } from './auth-config';

export default async function getSession() {
  return await getServerSession(nextAUthOptions);
}

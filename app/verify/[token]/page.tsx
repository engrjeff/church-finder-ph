import Link from 'next/link';

import { verifyToken } from '@/lib/data/tokens';
import { buttonVariants } from '@/components/ui/button';
import StatusIcon from '@/components/status-icon';

async function VerifyPage({ params }: { params: { token: string } }) {
  const result = await verifyToken(params.token);

  if (result.status === 'error') {
    return (
      <div className="flex flex-col items-center justify-normal space-y-3 p-4 py-20">
        <StatusIcon status="error" />
        <h1 className="text-xl font-bold">Ooops!</h1>
        <p>{result.message}</p>
        <Link href="/signin" className={buttonVariants()}>
          Go to Sign In Page
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-normal space-y-3 p-4 py-20">
      <StatusIcon status="success" />
      <h1 className="text-xl font-bold">Success!</h1>
      <p>{result.message}</p>
      <Link href="/signin" className={buttonVariants()}>
        Go to Sign In Page
      </Link>
    </div>
  );
}

export default VerifyPage;

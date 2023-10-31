'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';

interface Props {
  step: string;
  label: string;
}

function ChurchFormStepItem({ step, label }: Props) {
  const searchParams = useSearchParams();
  const params = useParams();

  const currentStep = searchParams.get('step') || 'basic-info';

  return (
    <Link
      className={buttonVariants({
        variant: currentStep === step ? 'secondary' : 'ghost',
      })}
      href={{
        pathname: `/me/church/${params.id}/edit`,
        query: {
          step,
        },
      }}
    >
      {label}
    </Link>
  );
}

export default ChurchFormStepItem;

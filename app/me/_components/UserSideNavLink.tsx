'use client';

import { type ComponentProps } from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

function UserSideNavLink(props: ComponentProps<typeof Link>) {
  const segment = useSelectedLayoutSegment();

  const isActive = props.href.toString().includes(segment!);

  return (
    <Link
      {...props}
      className={cn(
        buttonVariants({ variant: isActive ? 'secondary' : 'ghost' }),
        'w-full justify-start'
      )}
    />
  );
}

export default UserSideNavLink;

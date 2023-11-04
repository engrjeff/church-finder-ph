'use client';

import { type ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

function NavItem(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();

  const isActive = pathname === props.href;

  return (
    <Link
      className={cn(
        buttonVariants({ variant: isActive ? 'default' : 'ghost' }),
        'rounded-full'
      )}
      {...props}
    />
  );
}

export default NavItem;

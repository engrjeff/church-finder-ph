'use client';

import { type ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';

function NavItem(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();

  const isActive = pathname === props.href;

  return (
    <Link
      className={buttonVariants({ variant: isActive ? 'default' : 'ghost' })}
      {...props}
    />
  );
}

export default NavItem;

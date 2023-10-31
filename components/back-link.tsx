import { type ComponentProps } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

function BackLink(props: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className="inline-flex items-center gap-3 hover:text-primary"
    >
      <span className="rounded-full p-2 hover:bg-muted hover:text-white">
        <ArrowLeftIcon className="h-5 w-5" />
      </span>{' '}
      {props.children}
    </Link>
  );
}

export default BackLink;

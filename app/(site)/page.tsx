import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

import SearchChurchField from './_components/SearchChurchField';

export default function Home() {
  return (
    <section className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center space-y-6 text-center">
      <span className="rounded-full rounded-bl-none bg-violet-900 p-3 text-sm font-medium text-white">
        Welcome!
      </span>
      <h1 className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-7xl font-bold text-transparent">
        Church Finder PH
      </h1>
      <p className="text-xl font-semibold text-muted-foreground">
        We believe that every believer should have a home - a biblical church
        where you can know Christ truly and serve Him fully.
      </p>

      <div className="space-y-4 pt-6">
        <SearchChurchField />
        <Link
          href="/churches"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-12 w-[80%] rounded-full text-base'
          )}
        >
          Browse Churches <ArrowTopRightIcon className="ml-3 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

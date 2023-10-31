import Link from 'next/link';
import { ArrowTopRightIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default function Home() {
  return (
    <section className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center space-y-6 text-center">
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-violet-700 to-violet-500 opacity-25 blur-[100px]"
      ></div>
      <div
        aria-hidden="true"
        className="absolute -right-60 -top-60 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-violet-700 to-violet-500 opacity-10 blur-[100px]"
      ></div>

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

      <div className="space-x-4 pt-6">
        <Link
          href="/churches"
          className={cn(buttonVariants({ size: 'lg' }), 'rounded-full w-60')}
        >
          Browse Churches <ArrowTopRightIcon className="ml-2 h-4 w-4" />
        </Link>

        <button
          className={cn(
            buttonVariants({ size: 'lg', variant: 'secondary' }),
            'rounded-full'
          )}
        >
          Find churches near me <MagnifyingGlassIcon className="ml-2 h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

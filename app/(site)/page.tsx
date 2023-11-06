import Link from 'next/link';
import { ArrowRightIcon, ComponentBooleanIcon } from '@radix-ui/react-icons';

import { Separator } from '@/components/ui/separator';

import Hero from './_components/Hero';

export default function Home() {
  return (
    <>
      <Hero />
      <section className="container max-w-screen-lg px-0 py-20">
        <Separator className="mb-20" />
        <h2 className="mb-6 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
          New Believer? <br />
          Had a home relocation?
        </h2>
        <p className="text-center text-xl text-muted-foreground">
          We can help you find a new home where you can be planted and grow.
        </p>

        <div className="grid gap-6 py-10 md:grid-cols-2">
          <div className="flex flex-col items-start gap-4 rounded-lg border bg-[rgba(255,255,255,0.1)] p-5">
            <span className="inline-flex items-center justify-center rounded-full bg-primary p-4">
              <ComponentBooleanIcon className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-semibold">Looking for a church?</h3>
            <p className="text-muted-foreground">
              This platform exists to help believers find a church where they
              can know Christ, serve Him full along with other saints.
            </p>
            <Link
              href="/churches"
              className="group ml-auto inline-flex items-center gap-2 font-medium text-violet-500"
            >
              Browse Churches
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="flex flex-col items-start gap-4 rounded-lg border bg-[rgba(255,255,255,0.1)] p-5">
            <span className="inline-flex items-center justify-center rounded-full bg-primary p-4">
              <ComponentBooleanIcon className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-semibold">Already have a church?</h3>
            <p className="text-muted-foreground">
              Add your church to the directory. Your church can be somebody
              else&apos;s new home.
            </p>
            <Link
              href="/me/church/new"
              className="group ml-auto mt-auto inline-flex items-center gap-2 font-medium text-violet-500"
            >
              Add My Church
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="flex flex-col items-start gap-4 rounded-lg border bg-[rgba(255,255,255,0.1)] p-5">
            <span className="inline-flex items-center justify-center rounded-full bg-primary p-4">
              <ComponentBooleanIcon className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-semibold">Share your Church</h3>
            <p className="text-muted-foreground">
              Easily share info about your church to others so they can have an
              overview of what to expect when they visit your church.
            </p>
            <Link
              href="/churches"
              className="group ml-auto inline-flex items-center gap-2 font-medium text-violet-500"
            >
              Learn More
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="flex flex-col items-start gap-4 rounded-lg border bg-[rgba(255,255,255,0.1)] p-5">
            <span className="inline-flex items-center justify-center rounded-full bg-primary p-4">
              <ComponentBooleanIcon className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-semibold">Manage Church Listing</h3>
            <p className="text-muted-foreground">
              Know man biblical churches? You may add them to a centralized
              listing. The more church you add, the greater the potential of
              others of finding a new home.
            </p>
            <Link
              href="/me/church/new"
              className="group ml-auto inline-flex items-center gap-2 font-medium text-violet-500"
            >
              Add Churches
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

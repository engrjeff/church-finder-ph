import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ChurchItem } from '../services/church';

function ChurchListItem({ church }: { church: ChurchItem }) {
  return (
    <article className="group relative h-full">
      <Card className="h-full border-none bg-white/5">
        <div className="p-4">
          <div className="relative aspect-square">
            <Image
              src={church.logo}
              alt={church.name}
              fill
              className="size-auto rounded-lg object-cover"
            />
          </div>
        </div>

        <CardHeader className="py-0">
          <CardTitle className="hover:text-primary hover:underline group-hover:text-primary group-hover:underline">
            {church.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative space-y-2 p-4">
          <div className="flex items-start gap-2">
            <MapPinIcon className="mt-0.5 size-4 shrink-0" />
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {church.full_address}
            </p>
          </div>

          <div className="flex items-start gap-2">
            <UsersIcon className="mt-0.5 size-4 shrink-0" />
            <p className="text-sm text-muted-foreground">
              About {church.profile?.church_size} people
            </p>
          </div>

          {church.profile?.services[0] ? (
            <div className="flex items-start gap-2">
              <CalendarIcon className="size-4 shrink-0" />
              <p className="text-sm text-muted-foreground">
                {church.profile?.services[0]?.title} at{' '}
                {church.profile?.services[0]?.time}
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Link
        href={`/churches/${church.slug}_${church.id}`}
        className="absolute inset-0"
      >
        <span className="sr-only">Click to check out {church.name}</span>
      </Link>
    </article>
  );
}

export default ChurchListItem;

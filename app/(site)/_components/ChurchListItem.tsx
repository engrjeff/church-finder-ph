import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ChurchItem } from '../services/church';

function ChurchListItem({ church }: { church: ChurchItem }) {
  return (
    <article className="group relative h-full">
      <Card className="flex h-full flex-row gap-4 border-none bg-white/5 p-3 transition-colors duration-300 group-hover:bg-white/10 lg:flex-col lg:p-4">
        <div className="relative size-16 group-hover:shadow lg:aspect-square lg:size-auto">
          <Image
            src={church.logo}
            alt={church.name}
            fill
            className="size-auto rounded-lg object-cover"
          />
        </div>

        <div>
          <CardHeader className="p-0">
            <CardTitle className="text-sm lg:text-base">
              {church.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 flex items-start gap-2 text-xs">
              <MapPinIcon className="mt-px size-3 shrink-0" />
              {church.full_address.split(', ').slice(2, 4).join(', ')}
            </CardDescription>
            <CardDescription className="text-xs">
              {church.full_address.split(', ').slice(4).join(', ')}
            </CardDescription>
          </CardHeader>

          <CardContent className="relative hidden space-y-2 p-0">
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
        </div>
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

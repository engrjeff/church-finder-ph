import Image from 'next/image';
import Link from 'next/link';
import { type Church } from '@prisma/client';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { MapPinIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function ChurchCard({ church }: { church: Church }) {
  return (
    <article className="relative h-full">
      <Link
        href={`/me/church/${church.id}/edit`}
        className={cn(
          buttonVariants({ size: 'icon', variant: 'secondary' }),
          'absolute top-2 right-2 z-10 rounded-full'
        )}
      >
        <span className="sr-only">edit {church.name}</span>
        <Pencil1Icon className="size-4" />
      </Link>

      <Card className="group relative h-full bg-white/5">
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

        <CardHeader className="items-start py-0">
          <CardTitle className="hover:text-primary hover:underline group-hover:text-primary group-hover:underline">
            {church.name}
          </CardTitle>

          <Badge
            className="w-auto capitalize"
            variant={church.status === 'PUBLISHED' ? 'success' : 'white'}
          >
            {church.status.toLowerCase()}
          </Badge>
        </CardHeader>

        <CardContent className="relative p-4">
          <div className="flex items-start gap-2">
            <MapPinIcon className="mt-0.5 size-4 shrink-0" />
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {church.full_address}
            </p>
          </div>
        </CardContent>
        <Link href={`/me/church/${church.id}`} className="absolute inset-0">
          <span className="sr-only">Click to view {church.name}</span>
        </Link>
      </Card>
    </article>
  );
}

export default ChurchCard;

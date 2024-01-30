import Link from 'next/link';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { getPastorDetails } from '../services/church';

async function PastorDetails({ churchId }: { churchId: string }) {
  const pastorDetails = await getPastorDetails(churchId);

  if (!pastorDetails)
    return (
      <div className="py-4 text-center">
        <p className="mb-2 text-muted-foreground">
          No Pastor&apos;s details yet.
        </p>
        <Link
          href={`/me/church/${churchId}/edit?step=pastor-profile`}
          className={buttonVariants()}
        >
          Add Pastor Details
        </Link>
      </div>
    );

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Pastor&apos;s Details</h2>
        <Link
          href={`/me/church/${churchId}/edit?step=pastor-profile`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <span className="sr-only">edit pastor details</span>
          <Pencil1Icon className="size-4" />
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Brief Pastor Profile</CardTitle>
          <CardDescription>
            A short profile of the church Pastor
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Avatar className="size-16">
            <AvatarImage src={pastorDetails.photo} alt={pastorDetails.name} />
          </Avatar>
          <div>
            <p className="text-xs text-muted-foreground">Name</p>
            <p className="mt-1 text-sm">{pastorDetails.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Short Bio</p>
            <p className="mt-1 text-sm">{pastorDetails.bio}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PastorDetails;

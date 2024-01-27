import Link from 'next/link';
import { BookmarkIcon, CalendarIcon, CheckIcon } from '@radix-ui/react-icons';

import { formatTime } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RenderIf from '@/components/render-if';

import { getChurchProfile } from '../services/church';

async function ChurchProfileDetails({ churchId }: { churchId: string }) {
  const churchProfile = await getChurchProfile(churchId);

  if (!churchProfile)
    return (
      <div className="py-4 text-center">
        <p className="mb-2 text-muted-foreground">No church profile yet.</p>
        <Link
          href={`/me/church/${churchId}/edit?step=church-profile`}
          className={buttonVariants()}
        >
          Create Church Profile
        </Link>
      </div>
    );

  return (
    <div className="space-y-4 py-4">
      <h2 className="text-lg font-semibold">
        <a href="#church-profile">Church Profile</a>
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{churchProfile.mission}</p>
        </CardContent>
        <CardHeader className="pt-0">
          <CardTitle>Vision</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{churchProfile.vision}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Schedule of Services</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {churchProfile.services.map((service, idx) => (
              <li key={`service-${idx}`}>
                <div className="flex items-start gap-x-4">
                  <CalendarIcon className="size-4" />
                  <div>
                    <p className="mb-1 text-sm leading-none">{service.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Every {service.day} at {formatTime(service.time)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ministries</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {churchProfile.ministries.map((ministry, idx) => (
              <li key={`ministry-${idx}`}>
                <div className="flex items-start gap-x-4">
                  <CheckIcon className="size-4" />
                  <p className="text-sm leading-none">{ministry.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Public Services</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {churchProfile.public_services.map((publicService, idx) => (
              <li key={`public-service-${idx}`}>
                <div className="flex items-start gap-x-4">
                  <CheckIcon className="size-4" />
                  <p className="text-sm leading-none">{publicService.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <RenderIf condition={Boolean(churchProfile.confessions)}>
        <Card>
          <CardHeader>
            <CardTitle>Confessions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {churchProfile.confessions?.map((confession, idx) => (
                <li key={`confessions-${idx}`}>
                  <div className="flex items-start gap-x-4">
                    <BookmarkIcon className="size-4" />
                    <p className="text-sm leading-none">{confession.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </RenderIf>
      <Card>
        <CardHeader>
          <CardTitle>Other Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-x-4">
              <CheckIcon className="size-4" />
              <div>
                <p className="text-sm">
                  About {churchProfile.church_size} people
                </p>
                <p className="text-xs text-muted-foreground">Church Size</p>
              </div>
            </li>
            <li className="flex items-start gap-x-4">
              <CheckIcon className="size-4" />
              <div>
                <p className="text-sm">{churchProfile.communion_frequency}</p>
                <p className="text-xs text-muted-foreground">
                  Communion Frequency
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChurchProfileDetails;

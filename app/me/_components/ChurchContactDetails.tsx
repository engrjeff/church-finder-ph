import Link from 'next/link';
import { GlobeIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { MailIcon, PhoneIcon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SocialIcon from '@/app/_components/SocialIcon';

import { getChurchContactInfo } from '../services/church';

async function ChurchContactDetails({ churchId }: { churchId: string }) {
  const churchContact = await getChurchContactInfo(churchId);

  if (!churchContact)
    return (
      <div className="py-4 text-center">
        <p className="mb-2 text-muted-foreground">
          No church contact info yet.
        </p>
        <Link
          href={`/me/church/${churchId}/edit?step=church-contact-info`}
          className={buttonVariants()}
        >
          Add Church Contact Info
        </Link>
      </div>
    );

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Church Contact Info</h2>
        <Link
          href={`/me/church/${churchId}/edit?step=church-contact-info`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <span className="sr-only">edit church contact info</span>
          <Pencil1Icon className="size-4" />
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
          <CardDescription>
            Connect to this church through the following
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li>
              <div className="flex items-start gap-x-4">
                <GlobeIcon className="size-4" />
                <div>
                  <a
                    href={churchContact.website!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-1 block text-sm leading-none hover:underline"
                  >
                    {churchContact.website}
                  </a>
                  <p className="text-xs text-muted-foreground">Website</p>
                </div>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-x-4">
                <MailIcon className="size-4" />
                <div>
                  <a
                    href={`mailto:${churchContact.email}`}
                    className="mb-1 block text-sm leading-none hover:underline"
                  >
                    {churchContact.email}
                  </a>
                  <p className="text-xs text-muted-foreground">Email</p>
                </div>
              </div>
            </li>
            <li aria-hidden="true">
              <hr />
            </li>
            {churchContact.contact_numbers?.map((contact, index) => (
              <li key={`church-contact-${contact.value}-${index + 1}`}>
                <div className="flex items-start gap-x-4">
                  <PhoneIcon className="size-4" />
                  <div>
                    <a
                      href={`tel:+${churchContact.email}`}
                      className="mb-1 block text-sm leading-none hover:underline"
                    >
                      {contact.value}
                    </a>
                    <p className="text-xs text-muted-foreground">Phone</p>
                  </div>
                </div>
              </li>
            ))}
            <li aria-hidden="true">
              <hr />
            </li>
            {churchContact.social_links?.map((socialLink, index) => (
              <li key={`social-link-${socialLink.platform}-${index + 1}`}>
                <div className="flex items-start gap-x-4">
                  <SocialIcon name={socialLink.platform} />
                  <div>
                    <a
                      href={socialLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-1 block text-sm leading-none hover:underline"
                    >
                      {socialLink.url}
                    </a>
                    <p className="text-xs text-muted-foreground">
                      {socialLink.platform}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChurchContactDetails;

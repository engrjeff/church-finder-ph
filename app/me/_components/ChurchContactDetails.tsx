import {
  EnvelopeClosedIcon,
  ExternalLinkIcon,
  GlobeIcon,
} from '@radix-ui/react-icons';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { getChurchContactInfo } from '../services/church';

async function ChurchContactDetails({ churchId }: { churchId: string }) {
  const churchContact = await getChurchContactInfo(churchId);

  if (!churchContact) return null;

  return (
    <div className="space-y-4 py-4">
      <h2 className="text-lg font-semibold">
        <a href="#church-contact-info">Church Contact Info</a>
      </h2>
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
              <h4 className="flex items-center gap-3 text-muted-foreground">
                <GlobeIcon /> Website
              </h4>
              <a
                href={churchContact.website!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:underline"
              >
                {churchContact.website}
              </a>
            </li>
            <li>
              <h4 className="flex items-center gap-3 text-muted-foreground">
                <EnvelopeClosedIcon /> Email
              </h4>
              <a
                href={`mailto:${churchContact.email}`}
                className="inline-flex items-center hover:underline"
                target="_blank"
              >
                {churchContact.email}
              </a>
            </li>
            <li>
              <h4 className="mb-2 flex items-center gap-3 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                Contact Numbers
              </h4>

              {churchContact.contact_numbers.map((contact, index) => (
                <a
                  key={`contact-info-${index}`}
                  href={`tel:+${contact.value}`}
                  className="mb-2 flex items-center text-sm hover:underline"
                  target="_blank"
                >
                  {contact.value}
                </a>
              ))}
            </li>
            <li>
              <h4 className="mb-2 flex items-center gap-3 text-muted-foreground">
                <ExternalLinkIcon />
                Social Links
              </h4>

              {churchContact.social_links?.map((social, index) => (
                <a
                  key={`social-link-${index}`}
                  href={social.url}
                  className="mb-2 flex items-center text-sm hover:underline"
                  target="_blank"
                >
                  {social.platform}
                </a>
              ))}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChurchContactDetails;

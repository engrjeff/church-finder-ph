/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GlobeIcon } from '@radix-ui/react-icons';
import {
  CheckIcon,
  ChevronRight,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from 'lucide-react';

import { formatTime } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import BackLink from '@/components/back-link';
import ShareLinkButton from '@/app/_components/ShareLinkButton';
import SocialIcon from '@/app/_components/SocialIcon';

import ChurchIntoVideo from '../../_components/ChurchIntoVideo';
import { getChurch } from '../../services/church';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const church = await getChurch(params.id);

  return {
    title: church.name,
    description: church.welcome_message,
  };
};

async function ChurchDetailPage({ params }: { params: { id: string } }) {
  const church = await getChurch(params.id);

  return (
    <>
      <section className="container my-20">
        <BackLink href="/churches">Back to List</BackLink>
        <div className="my-6 flex items-center space-x-1.5 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>
            <ChevronRight className="size-3" />
          </span>
          <Link href="/churches" className="hover:underline">
            Churches
          </Link>
          <span>
            <ChevronRight className="size-3" />
          </span>
          <span className="font-semibold">{church.name}</span>
        </div>
        <div className="my-6 flex items-center gap-6">
          <Image
            src={church.logo}
            alt={church.name}
            width={100}
            height={100}
            className="rounded-xl object-contain shadow"
          />
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{church.name}</h1>
            <p className="flex items-center gap-3 text-muted-foreground">
              <MapPinIcon className="size-4" /> {church.full_address}
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              {church.contact_details?.website ? (
                <a
                  href={church.contact_details?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm hover:text-foreground hover:underline"
                >
                  <GlobeIcon className="size-4" />{' '}
                  {church.contact_details?.website}
                </a>
              ) : null}
              <ShareLinkButton url={`/churches/${church.slug}_${church.id}`} />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="space-y-4">
            <ChurchIntoVideo
              introVideoLink={church.church_media?.intro_video_link}
            />

            <div className="rounded-xl bg-white/10 p-6 shadow">
              <p>{church.welcome_message}</p>
              <h3 className="my-2 text-lg font-bold">Mission</h3>
              <p className="mb-3 text-sm italic">{church.profile?.mission}</p>
              <h3 className="my-2 text-lg font-bold">Vision</h3>
              <p className="text-sm italic">{church.profile?.vision}</p>
            </div>

            <div className="rounded-xl bg-white/10 p-6 shadow">
              <h2 className="mb-1 text-xl font-bold">Ministries</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Our church is composed of different ministries that work
                together to serve our brethren in Christ to the glory of God.
              </p>

              <ul className="space-y-2">
                {church.profile?.ministries?.map((ministry, index) => (
                  <li
                    key={`ministry-${index + 1}-${ministry.title}`}
                    className="flex"
                  >
                    <CheckIcon className="mr-5 size-4" />
                    <div>
                      <p>{ministry.title}</p>
                      <span className="text-xs text-muted-foreground">
                        Ministry
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-white/10 p-6 shadow">
              <h2 className="mb-1 text-xl font-bold">Public Services</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Our church also serves the body of Christ by providing the
                following public services. Feel free to contact us for
                inquiries.
              </p>

              <ul className="space-y-2">
                {church.profile?.public_services?.map(
                  (publicService, index) => (
                    <li
                      key={`publicService-${index + 1}-${publicService.title}`}
                      className="flex"
                    >
                      <CheckIcon className="mr-5 size-4" />
                      <div>
                        <p>{publicService.title}</p>
                        <span className="text-xs text-muted-foreground">
                          Service
                        </span>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="rounded-xl bg-white/10 p-6 shadow">
              <h2 className="mb-1 text-xl font-bold">Confessions</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                As a church, we adhere to the following confessions of our
                faith.
              </p>

              <ul className="space-y-2">
                {church.profile?.confessions?.map((confession, index) => (
                  <li
                    key={`confession-${index + 1}-${confession.title}`}
                    className="flex"
                  >
                    <CheckIcon className="mr-5 size-4" />
                    <div>
                      <p>{confession.title}</p>
                      <span className="text-xs text-muted-foreground">
                        Confession
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-white/10 p-6 shadow">
              <h2 className="mb-1 text-xl font-bold">Other Details</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Other details for {church.name}
              </p>

              <ul className="space-y-2">
                <li className="flex">
                  <CheckIcon className="mr-5 size-4" />
                  <div>
                    <p>
                      We take the Holy Communion{' '}
                      <strong>{church.profile?.communion_frequency}</strong> as
                      a congregation.
                    </p>
                    <span className="text-xs text-muted-foreground">
                      Communion Frequency
                    </span>
                  </div>
                </li>
                <li className="flex">
                  <CheckIcon className="mr-5 size-4" />
                  <div>
                    <p>
                      We are joined by about {church.profile?.church_size}{' '}
                      people weekly.
                    </p>
                    <span className="text-xs text-muted-foreground">
                      Church Size
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            {church.church_media?.gallery && (
              <div>
                <h2 className="mb-1 text-xl font-bold">Gallery</h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  Here are some glimpses of what it is like being at{' '}
                  {church.name}
                </p>

                <div className="h-[300px]">
                  <Carousel
                    opts={{
                      align: 'start',
                    }}
                  >
                    <CarouselContent>
                      {church.church_media?.gallery?.map((image, index) => (
                        <CarouselItem
                          key={index}
                          className="md:basis-full lg:basis-1/2"
                        >
                          <div className="relative overflow-hidden rounded-xl bg-white/10">
                            <img
                              src={image.url}
                              alt={church.name}
                              height={320}
                              className="h-[320px] w-full rounded-xl object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </div>
            )}
          </div>

          <div className="w-[400px] shrink-0 space-y-4 self-start">
            <div className="rounded-xl bg-white/10 p-6 shadow">
              <h2 className="mb-1 text-xl font-bold">Services Schedule</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                We would love you to join us in our services during the
                following date and time.
              </p>

              <ul className="space-y-2">
                {church.profile?.services?.map((service, index) => (
                  <li key={`service-${index + 1}-${service.title}`}>
                    <p>{service.title}</p>
                    <span className="text-xs text-muted-foreground">
                      Every {service.day} at {formatTime(service.time)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-white/10 p-6 shadow">
              <h2 className="mb-1 text-xl font-bold">Contact Info</h2>
              <p className="text-sm text-muted-foreground">
                Reach us through the following contact information.
              </p>
              <div className="my-4 flex items-start gap-6">
                <MailIcon className="size-5" />
                <div>
                  <a
                    href={`mailto:${church.contact_details?.email}`}
                    className="block text-sm"
                  >
                    {church.contact_details?.email}
                  </a>
                  <span className="text-xs text-muted-foreground">Email</span>
                </div>
              </div>
              <div className="my-4 flex items-start gap-6">
                <PhoneIcon className="size-5" />
                <ul className="space-y-2">
                  {church.contact_details?.contact_numbers.map(
                    (phone, index) => (
                      <li key={`contact-number-${index + 1}-${phone.value}`}>
                        <p className="text-sm">{phone.value}</p>
                        <span className="text-xs text-muted-foreground">
                          Phone
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="my-4">
                <h2 className="mb-1 text-xl font-bold">Social Links</h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  Follow us online through the following platforms.
                </p>
                <ul className="space-y-2">
                  {church.contact_details?.social_links?.map(
                    (socialLink, index) => (
                      <li
                        key={`social-link-${index + 1}-${socialLink.platform}`}
                        className="flex items-start gap-6"
                      >
                        <SocialIcon
                          name={socialLink.platform}
                          className="size-6"
                        />
                        <div>
                          <a
                            href={socialLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm hover:underline"
                          >
                            {socialLink.url}
                          </a>
                          <span className="text-xs text-muted-foreground">
                            {socialLink.platform}
                          </span>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {church.pastor_details && (
              <div className="rounded-xl bg-white/10 p-6 shadow">
                <div className="mb-4 flex items-center gap-6">
                  <Image
                    src={church.pastor_details?.photo}
                    alt={church.pastor_details?.name}
                    width={64}
                    height={64}
                    className="rounded-full object-contain shadow"
                  />
                  <div>
                    <p className="text-lg font-semibold">
                      {church.pastor_details.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Pastor, <span className="italic">{church.name}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Short Bio
                  </p>
                  <p>{church.pastor_details.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ChurchDetailPage;

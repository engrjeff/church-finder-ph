import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { buttonVariants } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BackLink from '@/components/back-link';

import ChurchContactDetails from '../../_components/ChurchContactDetails';
import ChurchDeleteButton from '../../_components/ChurchDeleteButton';
import ChurchMediaDetails from '../../_components/ChurchMediaDetails';
import ChurchProfileDetails from '../../_components/ChurchProfileDetails';
import ChurchPublishButton from '../../_components/ChurchPublishButton';
import PastorDetails from '../../_components/PastorDetails';
import { getChurchById } from '../../services/church';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const church = await getChurchById(params.id);

  return {
    title: church?.name,
  };
}

async function ChurchDetailsPage({ params }: Props) {
  const church = await getChurchById(params.id);

  if (!church) return notFound();

  return (
    <>
      <div className="flex items-center gap-3 border-b pb-6">
        <BackLink href="/me/church" aria-label="Back to church list" />
        <Image
          src={church.logo}
          alt={`${church.name} logo`}
          width={40}
          height={40}
          className="size-10 rounded-full"
        />
        <h1 className="text-xl font-bold">{church.name}</h1>
        <Link
          href={`/me/church/${church.id}/edit`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <span className="sr-only">edit {church.name}</span>
          <Pencil1Icon className="size-4" />
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <ChurchPublishButton
            churchId={church.id}
            churchStatus={church.status}
            isPublishable={church.steps_completed.length > 2}
          />
          <ChurchDeleteButton name={church.name} id={church.id} />
        </div>
      </div>
      <Tabs defaultValue="church-profile">
        <TabsList>
          <TabsTrigger value="church-profile">Church Profile</TabsTrigger>
          <TabsTrigger value="church-contact-info">Contact Info</TabsTrigger>
          <TabsTrigger value="pastor-profile">
            Pastor&apos;s Profile
          </TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>
        <TabsContent value="church-profile">
          <ChurchProfileDetails churchId={church.id} />
        </TabsContent>
        <TabsContent value="church-contact-info">
          <ChurchContactDetails churchId={church.id} />
        </TabsContent>
        <TabsContent value="pastor-profile">
          <PastorDetails churchId={church.id} />
        </TabsContent>
        <TabsContent value="media">
          <ChurchMediaDetails churchId={church.id} />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default ChurchDetailsPage;

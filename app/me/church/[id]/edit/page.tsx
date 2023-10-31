import { notFound } from 'next/navigation';

import BackLink from '@/components/back-link';
import ChurchForm from '@/app/me/_components/ChurchForm';
import ChurchFormSteps from '@/app/me/_components/ChurchFormSteps';
import { getChurchFormData } from '@/app/me/services/church';

async function EditChurchPage({ params }: { params: { id: string } }) {
  const church = await getChurchFormData(params.id);

  if (!church) return notFound();

  return (
    <>
      <div className="flex items-center gap-3 border-b pb-6">
        <BackLink href="/me/church" aria-label="Back to church list" />
        <h1 className="text-xl font-bold">Update {church.name}</h1>
      </div>
      <ChurchFormSteps />
      <ChurchForm churchFormData={church} />
    </>
  );
}

export default EditChurchPage;

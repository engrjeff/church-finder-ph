import BackLink from '@/components/back-link';

import BasicInfoForm from '../../_components/BasicInfoForm';

function NewChurchPage() {
  return (
    <>
      <div className="flex items-center gap-3 border-b pb-6">
        <BackLink href="/me/church" aria-label="Back to church list" />
        <h1 className="text-xl font-bold">Let&apos;s add your Church!</h1>
      </div>
      <BasicInfoForm />
    </>
  );
}

export default NewChurchPage;

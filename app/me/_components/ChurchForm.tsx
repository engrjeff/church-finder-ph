'use client';

import { useSearchParams } from 'next/navigation';

import RenderIf from '@/components/render-if';

import { type ChurchFormData } from '../services/church';
import BasicInfoForm from './BasicInfoForm';
import ChurchContactForm from './ChurchContactForm';
import ChurchMediaForm from './ChurchMediaForm';
import ChurchProfileForm from './ChurchProfileForm';
import PastorProfileForm from './PastorProfileForm';

function ChurchForm({
  churchFormData,
}: {
  churchFormData: NonNullable<ChurchFormData>;
}) {
  const searchParams = useSearchParams();

  const currentStep = searchParams.get('step') || 'basic-info';

  const { profile, ...basicInfo } = churchFormData;

  return (
    <div>
      <RenderIf condition={currentStep === 'basic-info'}>
        <BasicInfoForm basicInfoData={basicInfo} />
      </RenderIf>
      <RenderIf condition={currentStep === 'church-profile'}>
        <ChurchProfileForm />
      </RenderIf>
      <RenderIf condition={currentStep === 'church-contact-info'}>
        <ChurchContactForm />
      </RenderIf>
      <RenderIf condition={currentStep === 'pastor-profile'}>
        <PastorProfileForm />
      </RenderIf>
      <RenderIf condition={currentStep === 'media'}>
        <ChurchMediaForm />
      </RenderIf>
    </div>
  );
}

export default ChurchForm;

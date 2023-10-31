'use client';

import { useSearchParams } from 'next/navigation';

import {
  ChurchContactData,
  ChurchMediaData,
  ChurchProfileData,
  PastorProfileData,
} from '@/lib/validations/church';
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

  const {
    profile,
    contact_details,
    pastor_details,
    church_media,
    ...basicInfo
  } = churchFormData;

  return (
    <div>
      <RenderIf condition={currentStep === 'basic-info'}>
        <BasicInfoForm basicInfoData={basicInfo} />
      </RenderIf>
      <RenderIf condition={currentStep === 'church-profile'}>
        <ChurchProfileForm
          churchProfileData={profile as unknown as ChurchProfileData}
          churchProfileId={profile?.id}
        />
      </RenderIf>
      <RenderIf condition={currentStep === 'church-contact-info'}>
        <ChurchContactForm
          churchContactData={contact_details as unknown as ChurchContactData}
          churchContactId={contact_details?.id}
        />
      </RenderIf>
      <RenderIf condition={currentStep === 'pastor-profile'}>
        <PastorProfileForm
          pastorData={pastor_details as unknown as PastorProfileData}
          pastorProfileId={pastor_details?.id}
        />
      </RenderIf>
      <RenderIf condition={currentStep === 'media'}>
        <ChurchMediaForm
          churchMediaData={church_media as unknown as ChurchMediaData}
          churchMediaId={church_media?.id}
        />
      </RenderIf>
    </div>
  );
}

export default ChurchForm;

'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { OnboardingPage } from '@/components/onboarding/onboarding-page';

export default function Onboarding() {
  return (
    <PageLayout module="onboarding">
      <OnboardingPage />
    </PageLayout>
  );
}

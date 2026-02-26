'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { MedicalClaimsPage } from '@/components/claims/medical-claims-page';

export default function BenefitsPage() {
  return (
    <PageLayout module="benefits">
      <MedicalClaimsPage />
    </PageLayout>
  );
}

'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { SmartClaimsPage } from '@/components/claims/smart-claims-page';

export default function ClaimsPage() {
  return (
    <PageLayout module="smart-claims">
      <SmartClaimsPage />
    </PageLayout>
  );
}

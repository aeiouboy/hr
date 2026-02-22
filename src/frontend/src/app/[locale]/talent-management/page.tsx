'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { TalentPage } from '@/components/talent/talent-page';

export default function TalentManagement() {
  return (
    <PageLayout module="talent-management">
      <TalentPage />
    </PageLayout>
  );
}

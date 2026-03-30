'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { SPDManagementPage } from '@/components/spd/spd-management-page';

export default function SPDManagementRoute() {
  return (
    <PageLayout module="spd-management">
      <SPDManagementPage />
    </PageLayout>
  );
}

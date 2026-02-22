'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { LocationPage } from '@/components/location/location-page';

export default function LocationManagement() {
  return (
    <PageLayout module="locations">
      <LocationPage />
    </PageLayout>
  );
}

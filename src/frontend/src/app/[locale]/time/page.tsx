'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { TimePage } from '@/components/time/time-page';

export default function TimeManagement() {
  return (
    <PageLayout module="time-management">
      <TimePage />
    </PageLayout>
  );
}

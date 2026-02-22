'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { PerformancePage } from '@/components/performance/performance-page';

export default function Performance() {
  return (
    <PageLayout module="performance">
      <PerformancePage />
    </PageLayout>
  );
}

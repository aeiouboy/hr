'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { ScreeningPage } from '@/components/recruitment/screening-page';

export default function Screening() {
  return (
    <PageLayout module="candidate-screening">
      <ScreeningPage />
    </PageLayout>
  );
}

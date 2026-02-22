'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { TrainingRecordsPage } from '@/components/training/training-records';

export default function TrainingRecords() {
  return (
    <PageLayout module="training-records">
      <TrainingRecordsPage />
    </PageLayout>
  );
}

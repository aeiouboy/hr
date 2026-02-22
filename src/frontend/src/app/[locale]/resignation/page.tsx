'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { ResignationPage } from '@/components/resignation/resignation-page';

export default function Resignation() {
  return (
    <PageLayout module="resignation">
      <ResignationPage />
    </PageLayout>
  );
}

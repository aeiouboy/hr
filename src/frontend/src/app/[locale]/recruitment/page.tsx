'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { RecruitmentPage } from '@/components/recruitment/recruitment-page';

export default function Recruitment() {
  return (
    <PageLayout module="recruitment">
      <RecruitmentPage />
    </PageLayout>
  );
}

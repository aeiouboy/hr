'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { QuickApprovePage } from '@/components/manager/quick-approve-page';

export default function QuickApprove() {
  return (
    <PageLayout module="quick-approve">
      <QuickApprovePage />
    </PageLayout>
  );
}

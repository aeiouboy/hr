'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { IdpPage } from '@/components/idp/idp-page';

export default function Idp() {
  return (
    <PageLayout module="idp">
      <IdpPage />
    </PageLayout>
  );
}

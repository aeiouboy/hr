'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { HRBPReportsPage } from '@/components/hrbp/hrbp-reports-page';

export default function HRBPReportsRoute() {
 return (
 <PageLayout module="hrbp-reports">
 <HRBPReportsPage />
 </PageLayout>
 );
}

'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { ManagerDashboardPage } from '@/components/manager/manager-dashboard-page';

export default function ManagerDashboard() {
  return (
    <PageLayout module="manager-dashboard">
      <ManagerDashboardPage />
    </PageLayout>
  );
}

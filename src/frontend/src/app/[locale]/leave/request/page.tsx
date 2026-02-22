'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { LeaveRequestForm } from '@/components/leave/leave-request-form';
import { useLeave } from '@/hooks/use-leave';
import { useToast } from '@/components/ui/toast';

export default function LeaveRequestPage() {
  const t = useTranslations('leave');
  const router = useRouter();
  const { toast } = useToast();
  const { balances, substituteEmployees, submitting, submitRequest } = useLeave();

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-cg-dark mb-6">{t('newRequest')}</h1>
            <LeaveRequestForm
              balances={balances}
              substituteEmployees={substituteEmployees}
              submitting={submitting}
              onSubmit={async (data) => {
                await submitRequest(data);
                router.push('../leave');
              }}
              onCancel={() => router.push('../leave')}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

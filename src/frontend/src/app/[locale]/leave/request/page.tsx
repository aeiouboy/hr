'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LeaveRequestForm } from '@/components/leave/leave-request-form';
import { useLeave } from '@/hooks/use-leave';
import { useToast } from '@/components/ui/toast';

export default function LeaveRequestPage() {
 const t = useTranslations('leave');
 const router = useRouter();
 const { toast } = useToast();
 const { balances, substituteEmployees, submitting, submitRequest } = useLeave();

 return (
 <div className="max-w-7xl mx-auto">
 <h1 className="text-2xl font-bold text-ink mb-6">{t('newRequest')}</h1>
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
 );
}

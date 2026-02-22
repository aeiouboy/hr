'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Gift, Users, FileText } from 'lucide-react';
import { SectionCard } from '../section-card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/date';
import { Skeleton } from '@/components/ui/skeleton';

interface BenefitsTabProps {
  employee: Record<string, unknown> | null;
  loading?: boolean;
}

export function BenefitsTab({ employee, loading }: BenefitsTabProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.startsWith('/th') ? 'th' : 'en';

  if (loading) {
    return (
      <div className="bg-white rounded-xl border p-6">
        <Skeleton className="h-6 w-40 mb-4" />
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full mb-3" />)}
      </div>
    );
  }

  if (!employee) return null;

  const benefits = employee.benefits as Record<string, unknown> | undefined;
  const enrollments = (benefits?.enrollments as Record<string, string>[]) || [];
  const dependents = (benefits?.dependents as Record<string, string>[]) || [];
  const planDetails = benefits?.planDetails as Record<string, unknown> | undefined;

  return (
    <div className="space-y-6">
      {/* Plan Details Summary */}
      {planDetails && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border p-6 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Plan Type</p>
            <p className="text-lg font-bold text-cg-dark mt-2">{planDetails.type as string || '-'}</p>
          </div>
          <div className="bg-white rounded-xl border p-6 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Annual Limit</p>
            <p className="text-lg font-bold text-cg-dark mt-2">{planDetails.annualLimit as string || '-'}</p>
          </div>
          <div className="bg-white rounded-xl border p-6 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Used / Remaining</p>
            <p className="text-lg font-bold text-cg-dark mt-2">{planDetails.used as string || '0'} / {planDetails.remaining as string || '-'}</p>
          </div>
        </div>
      )}

      <SectionCard title={t('benefits.activeEnrollments')} icon={<Gift className="h-5 w-5" />}>
        {enrollments.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">{t('common.noData')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase">{t('benefits.benefitPlan')}</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase">{t('benefits.coverage')}</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase">{t('benefits.effectiveDate')}</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase">{t('benefits.status')}</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((e) => (
                  <tr key={e.id} className="border-b last:border-0">
                    <td className="py-3 px-2 font-medium text-gray-900">{e.plan}</td>
                    <td className="py-3 px-2 text-gray-600">{e.coverage}</td>
                    <td className="py-3 px-2 text-gray-600">{formatDate(e.effectiveDate, 'medium', locale)}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        e.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {e.status === 'active' ? t('benefits.active') : t('benefits.inactive')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* Dependent Coverage */}
      <SectionCard title="Dependent Coverage" icon={<Users className="h-5 w-5" />}>
        {dependents.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">No dependents registered</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase">Name</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase">Relationship</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase">Coverage</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {dependents.map((dep) => (
                  <tr key={dep.id || dep.name} className="border-b last:border-0">
                    <td className="py-3 px-2 font-medium text-gray-900">{dep.name}</td>
                    <td className="py-3 px-2 text-gray-600">{dep.relationship}</td>
                    <td className="py-3 px-2 text-gray-600">{dep.coverage || 'Full'}</td>
                    <td className="py-3 px-2">
                      <Badge variant={dep.status === 'active' ? 'success' : 'neutral'}>{dep.status || 'active'}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  );
}

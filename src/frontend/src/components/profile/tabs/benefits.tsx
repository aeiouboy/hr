'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Gift, Users } from 'lucide-react';
import { FieldGroup } from '@/components/ui/field-group';
import { Badge } from '@/components/ui/badge';
import { EmptyValue } from '@/components/ui/empty-value';
import { formatDate } from '@/lib/date';
import { Skeleton } from '@/components/ui/skeleton';
import { StatChip } from '@/components/ui/stat-chip';
import { Card } from '@/components/ui/card';

interface BenefitsTabProps {
 employee: Record<string, unknown> | null;
 loading?: boolean;
}

export function BenefitsTab({ employee, loading }: BenefitsTabProps) {
 const t = useTranslations();
 const pathname = usePathname();
 const locale = pathname.startsWith('/th') ?'th' :'en';

 if (loading) {
 return (
 <div className="rounded-md bg-surface shadow-card p-6">
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
 {[
 { label:'Plan Type', value: planDetails.type as string },
 { label:'Annual Limit', value: planDetails.annualLimit as string },
 { label:'Used / Remaining', value: `${planDetails.used ||'0'} / ${planDetails.remaining ||'—'}` },
 ].map((item) => (
 <Card key={item.label} className="p-6 text-center">
 <p className="text-xs text-ink-muted">{item.label}</p>
 <p className="text-lg font-bold text-ink mt-2">{item.value ||'—'}</p>
 </Card>
 ))}
 </div>
 )}

 {/* สวัสดิการที่ลงทะเบียน */}
 <Card className="overflow-hidden">
 <div className="px-6 py-4 border-l-2 border-accent flex items-center gap-2">
 <Gift className="h-5 w-5 text-ink-muted" />
 <h3 className="text-sm font-semibold text-ink">{t('benefits.activeEnrollments')}</h3>
 </div>
 <div className="px-6 pb-4">
 {enrollments.length === 0 ? (
 <div className="text-center py-8">
 <EmptyValue kind="not-applicable" />
 </div>
 ) : (
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-hairline">
 <th className="text-left py-3 px-2 text-xs font-medium text-ink-muted">{t('benefits.benefitPlan')}</th>
 <th className="text-left py-3 px-2 text-xs font-medium text-ink-muted">{t('benefits.coverage')}</th>
 <th className="text-left py-3 px-2 text-xs font-medium text-ink-muted">{t('benefits.effectiveDate')}</th>
 <th className="text-left py-3 px-2 text-xs font-medium text-ink-muted">{t('benefits.status')}</th>
 </tr>
 </thead>
 <tbody>
 {enrollments.map((e) => (
 <tr key={e.id} className="border-b border-hairline last:border-0">
 <td className="py-3 px-2 font-medium text-ink">{e.plan}</td>
 <td className="py-3 px-2 text-ink-soft">{e.coverage}</td>
 <td className="py-3 px-2 text-ink-soft font-mono tabular-nums">{formatDate(e.effectiveDate,'medium', locale)}</td>
 <td className="py-3 px-2">
 <Badge variant={e.status ==='active' ?'success' :'neutral'}>
 {e.status ==='active' ? t('benefits.active') : t('benefits.inactive')}
 </Badge>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 )}
 </div>
 </Card>

 {/* Dependent Coverage */}
 <Card className="overflow-hidden">
 <div className="px-6 py-4 border-l-2 border-accent flex items-center gap-2">
 <Users className="h-5 w-5 text-ink-muted" />
 <h3 className="text-sm font-semibold text-ink">Dependent Coverage</h3>
 </div>
 <div className="px-6 pb-4">
 {dependents.length === 0 ? (
 <div className="text-center py-8">
 <EmptyValue kind="not-applicable" />
 </div>
 ) : (
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-hairline">
 <th className="text-left py-3 px-2 text-xs font-medium text-ink-muted">Name</th>
 <th className="text-left py-3 px-2 text-xs font-medium text-ink-muted">Relationship</th>
 <th className="text-left py-3 px-2 text-xs font-medium text-ink-muted">Coverage</th>
 <th className="text-left py-3 px-2 text-xs font-medium text-ink-muted">Status</th>
 </tr>
 </thead>
 <tbody>
 {dependents.map((dep) => (
 <tr key={dep.id || dep.name} className="border-b border-hairline last:border-0">
 <td className="py-3 px-2 font-medium text-ink">{dep.name}</td>
 <td className="py-3 px-2 text-ink-soft">{dep.relationship}</td>
 <td className="py-3 px-2 text-ink-soft">{dep.coverage ||'Full'}</td>
 <td className="py-3 px-2">
 <Badge variant={dep.status ==='active' ?'success' :'neutral'}>{dep.status ||'active'}</Badge>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 )}
 </div>
 </Card>
 </div>
 );
}

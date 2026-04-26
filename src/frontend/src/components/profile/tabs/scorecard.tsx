'use client';

import { useTranslations } from 'next-intl';
import { BarChart3, History } from 'lucide-react';
import { FieldGroup } from '@/components/ui/field-group';
import { Card } from '@/components/humi';
import { Badge } from '@/components/ui/badge';
import { EmptyValue } from '@/components/ui/empty-value';
import { Skeleton } from '@/components/ui/skeleton';

interface ScorecardTabProps {
 employee: Record<string, unknown> | null;
 loading?: boolean;
}

export function ScorecardTab({ employee, loading }: ScorecardTabProps) {
 const t = useTranslations();

 if (loading) {
 return (
 <div className="space-y-6">
 <div className="rounded-md bg-surface shadow-card p-6">
 <Skeleton className="h-6 w-40 mb-4" />
 <Skeleton className="h-40 w-full" />
 </div>
 </div>
 );
 }

 if (!employee) return null;

 const scorecard = employee.scorecard as Record<string, unknown> | undefined;
 const competencies = (scorecard?.competencies as Record<string, unknown>[]) || [];
 const overallRating = scorecard?.overallRating as string;
 const potentialRating = scorecard?.potentialRating as string;
 const nineBoxPosition = scorecard?.nineBoxPosition as string | undefined;
 const assessmentHistory = (scorecard?.assessmentHistory as Record<string, unknown>[]) || [];

 const maxRating = 5;

 return (
 <div className="space-y-6">
 {/* Overall Rating */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <Card>
 <div className="p-6 text-center">
 <p className="text-xs text-ink-muted">{t('scorecard.overallRating')}</p>
 <p className="text-2xl font-bold text-brand mt-2">{overallRating || <EmptyValue />}</p>
 </div>
 </Card>
 <Card>
 <div className="p-6 text-center">
 <p className="text-xs text-ink-muted">{t('scorecard.potentialRating')}</p>
 <p className="text-2xl font-bold text-info mt-2">{potentialRating || <EmptyValue />}</p>
 </div>
 </Card>
 <Card>
 <div className="p-6 text-center">
 <p className="text-xs text-ink-muted">9-Box Position</p>
 {nineBoxPosition ? (
 <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold bg-accent-tint text-accent">
 {nineBoxPosition}
 </span>
 ) : (
 <div className="mt-2"><EmptyValue /></div>
 )}
 </div>
 </Card>
 </div>

 {/* CG Competencies */}
 <FieldGroup title={t('scorecard.cgCompetency')} icon={<BarChart3 className="h-5 w-5" />} columns={1}>
 {competencies.length === 0 ? (
 <div className="text-center py-8"><EmptyValue kind="not-applicable" /></div>
 ) : (
 <div className="space-y-4">
 {competencies.map((comp, i) => {
 const rating = comp.rating as number;
 const pct = (rating / maxRating) * 100;
 return (
 <div key={i}>
 <div className="flex items-center justify-between mb-1">
 <span className="text-sm font-medium text-ink-soft">{comp.name as string}</span>
 <span className="text-sm font-bold text-ink">{rating}/{maxRating}</span>
 </div>
 <div className="w-full bg-surface-raised rounded-full h-2.5">
 <div
 className="bg-brand h-2.5 rounded-full transition-all"
 style={{ width: `${pct}%` }}
 />
 </div>
 </div>
 );
 })}
 </div>
 )}
 </FieldGroup>

 {/* Assessment History */}
 <FieldGroup title="Assessment History" icon={<History className="h-5 w-5" />} columns={1}>
 {assessmentHistory.length === 0 ? (
 <div className="text-center py-8"><EmptyValue kind="not-applicable" /></div>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-hairline">
 <th className="text-left py-2 px-2 text-xs font-medium text-ink-muted">Period</th>
 <th className="text-center py-2 px-2 text-xs font-medium text-ink-muted">Rating</th>
 <th className="text-center py-2 px-2 text-xs font-medium text-ink-muted">Potential</th>
 <th className="text-left py-2 px-2 text-xs font-medium text-ink-muted">Status</th>
 </tr>
 </thead>
 <tbody>
 {assessmentHistory.map((h, i) => (
 <tr key={i} className="border-b border-hairline last:border-0">
 <td className="py-2 px-2 font-medium">{h.period as string}</td>
 <td className="py-2 px-2 text-center">{h.rating as string}</td>
 <td className="py-2 px-2 text-center">{h.potential as string}</td>
 <td className="py-2 px-2"><Badge variant={(h.status as string) ==='completed' ?'success' :'info'}>{h.status as string}</Badge></td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </FieldGroup>
 </div>
 );
}

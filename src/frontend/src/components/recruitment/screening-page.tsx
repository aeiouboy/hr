'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, Button } from '@/components/humi';
import { Skeleton } from '@/components/ui/skeleton';
import { useRecruitment, type ApplicationStatus } from '@/hooks/use-recruitment';

const STAGES: ApplicationStatus[] = ['applied','screening','interview','offer','hired'];
const STAGE_COLORS: Record<ApplicationStatus, string> = {
 applied:'bg-surface-raised border-hairline border-hairline',
 screening:'bg-accent-tint border-blue-300 dark:bg-blue-900/20 dark:border-blue-700',
 interview:'bg-warning-tint border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-700',
 offer:'bg-accent-tint border-purple-300 dark:bg-purple-900/20 dark:border-purple-700',
 hired:'bg-success-tint border-green-300 dark:bg-green-900/20 dark:border-green-700',
 rejected:'bg-danger-tint border-red-300 dark:bg-red-900/20 dark:border-red-700',
};

export function ScreeningPage() {
 const t = useTranslations('recruitment');
 const { candidates, loading, updateCandidateStatus } = useRecruitment();

 if (loading) {
 return <div className="flex gap-4">{STAGES.map((s) => <Skeleton key={s} className="h-96 flex-1" />)}</div>;
 }

 const activeCandidates = candidates.filter((c) => c.status !=='rejected');

 return (
 <>
 <div className="mb-6">
 <h1 className="text-2xl font-bold text-ink">Candidate Screening</h1>
 <p className="text-ink-muted mt-1">Pipeline view of all candidates</p>
 </div>

 <div className="flex gap-4 overflow-x-auto pb-4">
 {STAGES.map((stage) => {
 const stageCandidates = activeCandidates.filter((c) => c.status === stage);
 return (
 <div key={stage} className={`min-w-[260px] flex-1 rounded-md border-2 ${STAGE_COLORS[stage]} p-3`}>
 <div className="flex items-center justify-between mb-3">
 <h3 className="font-semibold text-sm text-ink capitalize">{stage}</h3>
 <Badge variant="neutral">{stageCandidates.length}</Badge>
 </div>
 <div className="space-y-2">
 {stageCandidates.map((candidate) => {
 const nextStageIdx = STAGES.indexOf(stage) + 1;
 const nextStage = nextStageIdx < STAGES.length ? STAGES[nextStageIdx] : null;
 return (
 <Card key={candidate.id}>
 <div className="cursor-pointer hover:shadow-1 transition-shadow p-4 lg:p-5">
 <div className="flex items-center gap-2 mb-2">
 {candidate.photo && <img src={candidate.photo} alt="" className="w-7 h-7 rounded-full" />}
 <div className="min-w-0">
 <p className="text-sm font-medium truncate">{candidate.name}</p>
 <p className="text-xs text-ink-muted truncate">{candidate.position}</p>
 </div>
 </div>
 <div className="flex flex-wrap gap-1 mb-2">
 {candidate.skills.slice(0, 2).map((s) => <Badge key={s} variant="neutral" className="text-[10px]">{s}</Badge>)}
 </div>
 <div className="flex gap-1">
 {nextStage && (
 <Button size="sm" variant="secondary" className="text-xs flex-1" onClick={() => updateCandidateStatus(candidate.id, nextStage)}>
 <ArrowRight className="h-3 w-3" /> {nextStage}
 </Button>
 )}
 {stage !=='hired' && (
 <Button size="sm" variant="ghost" className="text-xs text-danger" onClick={() => updateCandidateStatus(candidate.id,'rejected')}>
 <X className="h-3 w-3" />
 </Button>
 )}
 </div>
 </div>
 </Card>
 );
 })}
 {stageCandidates.length === 0 && <p className="text-xs text-ink-muted text-center py-4">No candidates</p>}
 </div>
 </div>
 );
 })}
 </div>
 </>
 );
}

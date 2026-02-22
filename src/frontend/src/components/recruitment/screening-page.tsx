'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRecruitment, type ApplicationStatus } from '@/hooks/use-recruitment';

const STAGES: ApplicationStatus[] = ['applied', 'screening', 'interview', 'offer', 'hired'];
const STAGE_COLORS: Record<ApplicationStatus, string> = {
  applied: 'bg-gray-100 border-gray-300',
  screening: 'bg-blue-50 border-blue-300',
  interview: 'bg-yellow-50 border-yellow-300',
  offer: 'bg-purple-50 border-purple-300',
  hired: 'bg-green-50 border-green-300',
  rejected: 'bg-red-50 border-red-300',
};

export function ScreeningPage() {
  const t = useTranslations('recruitment');
  const { candidates, loading, updateCandidateStatus } = useRecruitment();

  if (loading) {
    return <div className="flex gap-4">{STAGES.map((s) => <Skeleton key={s} className="h-96 flex-1" />)}</div>;
  }

  const activeCandidates = candidates.filter((c) => c.status !== 'rejected');

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-cg-dark">Candidate Screening</h1>
        <p className="text-gray-500 mt-1">Pipeline view of all candidates</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageCandidates = activeCandidates.filter((c) => c.status === stage);
          return (
            <div key={stage} className={`min-w-[260px] flex-1 rounded-lg border-2 ${STAGE_COLORS[stage]} p-3`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm text-cg-dark capitalize">{stage}</h3>
                <Badge variant="neutral">{stageCandidates.length}</Badge>
              </div>
              <div className="space-y-2">
                {stageCandidates.map((candidate) => {
                  const nextStageIdx = STAGES.indexOf(stage) + 1;
                  const nextStage = nextStageIdx < STAGES.length ? STAGES[nextStageIdx] : null;
                  return (
                    <Card key={candidate.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          {candidate.photo && <img src={candidate.photo} alt="" className="w-7 h-7 rounded-full" />}
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{candidate.name}</p>
                            <p className="text-xs text-gray-500 truncate">{candidate.position}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {candidate.skills.slice(0, 2).map((s) => <Badge key={s} variant="neutral" className="text-[10px]">{s}</Badge>)}
                        </div>
                        <div className="flex gap-1">
                          {nextStage && (
                            <Button size="sm" variant="outline" className="text-xs flex-1" onClick={() => updateCandidateStatus(candidate.id, nextStage)}>
                              → {nextStage}
                            </Button>
                          )}
                          {stage !== 'hired' && (
                            <Button size="sm" variant="ghost" className="text-xs text-red-500" onClick={() => updateCandidateStatus(candidate.id, 'rejected')}>
                              ✕
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                {stageCandidates.length === 0 && <p className="text-xs text-gray-400 text-center py-4">No candidates</p>}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { BookOpen, Plus, CheckCircle, Clock, Circle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useIdp, type ActionStatus } from '@/hooks/use-idp';

const ACTION_ICON: Record<ActionStatus, React.ReactNode> = {
  completed: <CheckCircle className="h-4 w-4 text-green-500" />,
  in_progress: <Clock className="h-4 w-4 text-yellow-500" />,
  not_started: <Circle className="h-4 w-4 text-gray-300" />,
};

export function IdpPage() {
  const t = useTranslations('idp');
  const { plan, gaps, loading, updateActionStatus } = useIdp();
  const [activeTab, setActiveTab] = useState('gap');

  const tabs = [
    { key: 'gap', label: t('gapAnalysis') },
    { key: 'actions', label: t('developmentActions') },
    { key: 'progress', label: t('progressTracking') },
  ];

  if (loading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full" />)}</div>;
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
        <p className="text-gray-500 mt-1">{t('subtitle')}</p>
      </div>

      {plan && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-cg-dark">{plan.overallProgress}%</p><p className="text-xs text-gray-400">{t('overallProgress')}</p></CardContent></Card>
          <Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-green-600">{plan.actions.filter((a) => a.status === 'completed').length}/{plan.actions.length}</p><p className="text-xs text-gray-400">{t('completedActions')}</p></CardContent></Card>
          <Card><CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2">
              {plan.employeeSignOff ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Circle className="h-4 w-4 text-gray-300" />}
              <span className="text-xs">{t('employeeSignOff')}</span>
              {plan.managerSignOff ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Circle className="h-4 w-4 text-gray-300" />}
              <span className="text-xs">{t('managerSignOff')}</span>
            </div>
          </CardContent></Card>
        </div>
      )}

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

      {activeTab === 'gap' && (
        <Card>
          <CardHeader><CardTitle>{t('competencyGapDetails')}</CardTitle></CardHeader>
          <CardContent>
            {gaps.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">{t('noCompetencyData')}</p>
            ) : (
              <div className="space-y-4">
                {gaps.map((gap) => (
                  <div key={gap.name} className="flex items-center gap-4">
                    <div className="w-40 text-sm font-medium text-gray-700 truncate">{gap.name}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400">{t('currentLevel')}: {gap.currentLevel}</span>
                        <span className="text-xs text-gray-400">{t('requiredLevel')}: {gap.requiredLevel}</span>
                        {gap.gap > 0 && <Badge variant={gap.priority === 'high' ? 'error' : gap.priority === 'medium' ? 'warning' : 'success'}>{t('gap')}: {gap.gap}</Badge>}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 relative">
                        <div className="bg-cg-red h-2 rounded-full" style={{ width: `${(gap.currentLevel / 5) * 100}%` }} />
                        <div className="absolute top-0 h-2 border-r-2 border-dashed border-blue-400" style={{ left: `${(gap.requiredLevel / 5) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'actions' && plan && (
        <div className="space-y-3">
          {plan.actions.map((action) => (
            <Card key={action.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {ACTION_ICON[action.status]}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-cg-dark">{action.title}</h4>
                      <Badge variant="neutral">{action.actionType}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>{action.targetCompetency}</span>
                      <span>{action.startDate} - {action.endDate}</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-cg-red h-1.5 rounded-full transition-all" style={{ width: `${action.progress}%` }} />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {action.status === 'not_started' && (
                      <Button size="sm" variant="outline" onClick={() => updateActionStatus(action.id, 'in_progress')}>Start</Button>
                    )}
                    {action.status === 'in_progress' && (
                      <Button size="sm" variant="outline" onClick={() => updateActionStatus(action.id, 'completed')}>Complete</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'progress' && plan && (
        <Card>
          <CardHeader><CardTitle>{t('progressByArea')}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[...new Set(plan.actions.map((a) => a.targetCompetency))].map((comp) => {
                const actions = plan.actions.filter((a) => a.targetCompetency === comp);
                const avgProgress = Math.round(actions.reduce((sum, a) => sum + a.progress, 0) / actions.length);
                return (
                  <div key={comp}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{comp}</span>
                      <span className="text-sm text-gray-500">{avgProgress}% ({actions.filter((a) => a.status === 'completed').length}/{actions.length} {t('completed')})</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-cg-red h-2.5 rounded-full transition-all" style={{ width: `${avgProgress}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

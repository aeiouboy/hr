'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Flag, Plus, TrendingUp, Target, ClipboardCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Modal } from '@/components/ui/modal';
import { FormField } from '@/components/ui/form-field';
import { usePerformance, type Goal, type GoalCategory, type GoalStatus } from '@/hooks/use-performance';

const STATUS_VARIANT: Record<GoalStatus, 'neutral' | 'info' | 'success' | 'warning' | 'error'> = {
  draft: 'neutral', submitted: 'info', approved: 'info', in_progress: 'warning', completed: 'success', sent_back: 'error',
};

export function PerformancePage() {
  const t = useTranslations('performance');
  const tEval = useTranslations('evaluation');
  const tCommon = useTranslations('common');
  const { goals, evaluations, loading, createGoal, updateGoal, deleteGoal } = usePerformance();
  const [activeTab, setActiveTab] = useState('goals');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ nameEn: '', descriptionEn: '', category: 'kpi' as GoalCategory, weight: 0, targetValue: 0 });

  const tabs = [
    { key: 'goals', label: t('goalsTab') },
    { key: 'evaluation', label: tEval('tab') },
    { key: 'history', label: t('historyTab') },
  ];

  const handleCreate = async () => {
    await createGoal({
      ...newGoal, nameTh: newGoal.nameEn, descriptionTh: newGoal.descriptionEn,
      metricType: 'number', actualValue: 0, status: 'draft',
      startDate: '2026-01-01', endDate: '2026-12-31', reviewPeriod: 'Annual', year: 2026,
    });
    setShowCreateModal(false);
    setNewGoal({ nameEn: '', descriptionEn: '', category: 'kpi', weight: 0, targetValue: 0 });
  };

  if (loading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full" />)}</div>;
  }

  const totalWeight = goals.reduce((sum, g) => sum + g.weight, 0);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
          <p className="text-gray-500 mt-1">{t('weightCurrentTotal')}: {totalWeight}% / 100%</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />{t('createGoal')}
        </Button>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

      {activeTab === 'goals' && (
        <div className="space-y-4">
          {goals.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-gray-500">{t('noGoals')}</CardContent></Card>
          ) : (
            goals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-cg-dark">{goal.nameEn}</h3>
                        <Badge variant={STATUS_VARIANT[goal.status]}>{t(`status${goal.status.charAt(0).toUpperCase() + goal.status.slice(1).replace('_', '')}` as never)}</Badge>
                        <Badge variant="neutral">{t(`category${goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}` as never)}</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{goal.descriptionEn}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div><span className="text-gray-400">{t('weight')}</span><p className="font-medium">{goal.weight}%</p></div>
                        <div><span className="text-gray-400">{t('target')}</span><p className="font-medium">{goal.targetValue}</p></div>
                        <div><span className="text-gray-400">{t('actual')}</span><p className="font-medium">{goal.actualValue}</p></div>
                        <div><span className="text-gray-400">{t('progress')}</span><p className="font-medium">{goal.targetValue > 0 ? Math.round((goal.actualValue / goal.targetValue) * 100) : 0}%</p></div>
                      </div>
                      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-cg-red h-2 rounded-full transition-all" style={{ width: `${Math.min(100, goal.targetValue > 0 ? (goal.actualValue / goal.targetValue) * 100 : 0)}%` }} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {goal.status === 'draft' && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => updateGoal(goal.id, { status: 'submitted' })}>{t('submitForReview')}</Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteGoal(goal.id)}>{t('deleteGoal')}</Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === 'evaluation' && (
        <div className="space-y-4">
          {evaluations.map((eval_) => (
            <Card key={eval_.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-cg-dark">{eval_.period} {eval_.year}</h3>
                    <Badge variant={eval_.status === 'acknowledged' ? 'success' : 'info'}>
                      {tEval(`status.${eval_.status}` as never)}
                    </Badge>
                  </div>
                  {eval_.finalRating && (
                    <div className="text-center">
                      <p className="text-xs text-gray-400">{tEval('rating.finalRating')}</p>
                      <p className="text-2xl font-bold text-cg-red">{eval_.finalRating}</p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">{tEval(`statusDescription.${eval_.status}` as never)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          {[
            {
              period: 'Annual Review 2025',
              rating: 4.2,
              reviewer: 'Rungrote Amnuaysopon',
              summary: 'Exceeded expectations in project delivery and team collaboration. Consistently met KPIs with strong initiative.',
              date: '2025-12-15',
            },
            {
              period: 'Mid-Year Review 2025',
              rating: 3.8,
              reviewer: 'Rungrote Amnuaysopon',
              summary: 'Solid performance across all areas. Recommended to focus on leadership development and cross-functional skills.',
              date: '2025-06-30',
            },
            {
              period: 'Annual Review 2024',
              rating: 3.5,
              reviewer: 'Kamolwan Srisuk',
              summary: 'Met expectations consistently. Showed improvement in technical skills and stakeholder communication.',
              date: '2024-12-20',
            },
            {
              period: 'Mid-Year Review 2024',
              rating: 3.2,
              reviewer: 'Kamolwan Srisuk',
              summary: 'Good progress on assigned goals. Areas for improvement include time management and documentation.',
              date: '2024-06-28',
            },
          ].map((review, idx) => (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-cg-dark">{review.period}</h3>
                      <Badge variant={review.rating >= 4 ? 'success' : review.rating >= 3 ? 'info' : 'warning'}>
                        {review.rating.toFixed(1)} / 5.0
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{review.summary}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>Reviewer: {review.reviewer}</span>
                      <span>Date: {review.date}</span>
                    </div>
                  </div>
                  <div className="text-center shrink-0">
                    <div className="w-14 h-14 rounded-full bg-cg-red/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-cg-red">{review.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal open={showCreateModal} onClose={() => setShowCreateModal(false)} title={t('createGoal')}>
        <div className="space-y-4">
          <FormField label={t('goalName')} name="goalName" value={newGoal.nameEn} onChange={(v) => setNewGoal((p) => ({ ...p, nameEn: v }))} required />
          <FormField label={t('description')} name="goalDesc" type="textarea" value={newGoal.descriptionEn} onChange={(v) => setNewGoal((p) => ({ ...p, descriptionEn: v }))} />
          <FormField label={t('category')} name="category" type="select" value={newGoal.category} onChange={(v) => setNewGoal((p) => ({ ...p, category: v as GoalCategory }))}
            options={[{ value: 'kpi', label: t('categoryKpi') }, { value: 'gbest', label: t('categoryGbest') }, { value: 'development', label: t('categoryDevelopment') }]} />
          <div className="grid grid-cols-2 gap-4">
            <FormField label={t('weight')} name="weight" value={String(newGoal.weight)} onChange={(v) => setNewGoal((p) => ({ ...p, weight: Number(v) || 0 }))} />
            <FormField label={t('targetValue')} name="target" value={String(newGoal.targetValue)} onChange={(v) => setNewGoal((p) => ({ ...p, targetValue: Number(v) || 0 }))} required />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setShowCreateModal(false)}>{tCommon('cancel')}</Button>
          <Button onClick={handleCreate} disabled={!newGoal.nameEn}>{t('saveAsDraft')}</Button>
        </div>
      </Modal>
    </>
  );
}

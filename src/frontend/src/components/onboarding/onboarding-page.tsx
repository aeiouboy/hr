'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { UserCheck, CheckCircle, Clock, Circle } from 'lucide-react';
import { Card, CardTitle, Button } from '@/components/humi';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useOnboarding, type ItemStatus } from '@/hooks/use-onboarding';

const STATUS_ICON: Record<ItemStatus, React.ReactNode> = {
 completed: <CheckCircle className="h-4 w-4 text-success" />,
 in_progress: <Clock className="h-4 w-4 text-yellow-500" />,
 pending: <Circle className="h-4 w-4 text-gray-300" />,
 not_applicable: <Circle className="h-4 w-4 text-gray-200" />,
};

export function OnboardingPage() {
 const t = useTranslations('onboarding');
 const { records, loading, markItemComplete } = useOnboarding();
 const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

 if (loading) {
 return <div className="space-y-4">{[1, 2].map((i) => <Skeleton key={i} className="h-60 w-full" />)}</div>;
 }

 const selectedRecord = records.find((r) => r.id === selectedRecordId) || records[0];

 return (
 <>
 <div className="mb-6">
 <h1 className="text-2xl font-bold text-ink">{t('title')}</h1>
 <p className="text-ink-muted mt-1">{t('subtitle')}</p>
 </div>

 {/* Record selector */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
 {records.map((rec) => (
 <Card
 key={rec.id}
 className={`cursor-pointer transition-shadow hover:shadow-1 ${selectedRecord?.id === rec.id ?'ring-2 ring-brand' :''}`}
 onClick={() => setSelectedRecordId(rec.id)}
 >
 <div className="p-5 sm:p-6 lg:p-8">
 <div className="flex items-center gap-3 mb-2">
 {rec.photo && <img src={rec.photo} alt="" className="w-10 h-10 rounded-full" />}
 <div>
 <p className="font-semibold text-ink">{rec.employeeName}</p>
 <p className="text-xs text-ink-muted">{rec.position} - {rec.department}</p>
 </div>
 </div>
 <div className="flex items-center justify-between mt-3">
 <Badge variant={rec.phase ==='completed' ?'success' :'info'}>{t(`status.${rec.phase}` as never)}</Badge>
 <div className="text-right">
 <p className="text-sm font-bold text-ink">{rec.overallProgress}%</p>
 <div className="w-20 bg-surface-raised rounded-full h-1.5 mt-1">
 <div className="bg-brand h-1.5 rounded-full" style={{ width: `${rec.overallProgress}%` }} />
 </div>
 </div>
 </div>
 </div>
 </Card>
 ))}
 </div>

 {/* Selected record details */}
 {selectedRecord && (
 <Card header={<><CardTitle>{selectedRecord.employeeName} - Checklist</CardTitle><div className="text-sm text-ink-muted">{t('startDate')}: {selectedRecord.startDate} | {t('hrCoordinator')}: {selectedRecord.hrCoordinator}</div></>}>
 <div className="mb-4">
 <div className="flex items-center justify-between mb-1">
 <span className="text-sm text-ink-muted">{t('overallProgress')}</span>
 <span className="text-sm font-bold">{selectedRecord.overallProgress}%</span>
 </div>
 <div className="w-full bg-surface-raised rounded-full h-2.5">
 <div className="bg-brand h-2.5 rounded-full transition-all" style={{ width: `${selectedRecord.overallProgress}%` }} />
 </div>
 </div>

 {(['pre_boarding','day_one','orientation','probation'] as const).map((phase) => {
 const items = selectedRecord.checklist.filter((i) => i.phase === phase);
 if (items.length === 0) return null;
 return (
 <div key={phase} className="mb-6">
 <h4 className="text-sm font-semibold text-ink-soft mb-3 uppercase">{t(`status.${phase}` as never)}</h4>
 <div className="space-y-2">
 {items.map((item) => (
 <div key={item.id} className="flex items-center gap-3 p-3 bg-surface-raised rounded-md">
 {STATUS_ICON[item.status]}
 <div className="flex-1 min-w-0">
 <p className="text-sm font-medium">{item.title}</p>
 <p className="text-xs text-ink-muted">{item.description}</p>
 <p className="text-xs text-ink-muted mt-0.5">{t('assignedTo')}: {item.assignedTo} | {t('dueDate')}: {item.dueDate}</p>
 </div>
 {item.status ==='completed' && item.completedDate && (
 <span className="text-xs text-success">{t('completedOn')} {item.completedDate}</span>
 )}
 {item.status !=='completed' && item.status !=='not_applicable' && (
 <Button size="sm" variant="secondary" onClick={() => markItemComplete(selectedRecord.id, item.id)}>
 {t('markComplete')}
 </Button>
 )}
 </div>
 ))}
 </div>
 </div>
 );
 })}
 </Card>
 )}
 </>
 );
}

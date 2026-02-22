'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FileX, CheckCircle, Clock, Circle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useResignation } from '@/hooks/use-resignation';
import { formatCurrency } from '@/lib/date';

export function ResignationPage() {
  const t = useTranslations('resignation');
  const { record, loading, updateClearanceItem, clearanceProgress } = useResignation();
  const [activeTab, setActiveTab] = useState('recording');

  const tabs = [
    { key: 'recording', label: t('tabRecording') },
    { key: 'clearance', label: t('tabClearance') },
    { key: 'settlement', label: t('tabSettlement') },
  ];

  if (loading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-40 w-full" />)}</div>;
  }

  if (!record) {
    return (
      <>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
        </div>
        <Card>
          <CardContent className="py-16 text-center">
            <FileX className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-cg-dark mb-2">{t('noResignation')}</h2>
            <p className="text-gray-500 mb-4">{t('noResignationDesc')}</p>
            <Button>{t('startResignation')}</Button>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
        <p className="text-gray-500 mt-1">{t('subtitle')}</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

      {activeTab === 'recording' && (
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>{t('resignationDetails')}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-400">{t('resignationDate')}</span><p className="font-medium">{record.resignationDate}</p></div>
                <div><span className="text-gray-400">{t('lastWorkingDate')}</span><p className="font-medium">{record.lastWorkingDate}</p></div>
                <div><span className="text-gray-400">{t('reasonType')}</span><p className="font-medium capitalize">{record.reasonType}</p></div>
                <div><span className="text-gray-400">{t('noticePeriod')}</span><p className="font-medium">{record.noticePeriod} {t('days')}</p></div>
                <div><span className="text-gray-400">{t('status')}</span><Badge variant={record.status === 'completed' ? 'success' : 'warning'}>{record.status}</Badge></div>
                <div><span className="text-gray-400">{t('exitInterview')}</span><p className="font-medium">{record.exitInterviewDate || t('notScheduled')}</p></div>
              </div>
              {record.reasonDetails && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">{record.reasonDetails}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status timeline */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {['submitted', 'in_progress', 'completed'].map((step, i) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      ['submitted', 'in_progress', 'completed'].indexOf(record.status) >= i ? 'bg-cg-red text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {i + 1}
                    </div>
                    <span className="text-xs ml-2 capitalize">{step.replace('_', ' ')}</span>
                    {i < 2 && <div className={`flex-1 h-0.5 mx-2 ${['submitted', 'in_progress', 'completed'].indexOf(record.status) > i ? 'bg-cg-red' : 'bg-gray-200'}`} />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'clearance' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t('clearanceProgress')}</CardTitle>
              <span className="text-sm font-bold text-cg-dark">{clearanceProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-cg-red h-2.5 rounded-full transition-all" style={{ width: `${clearanceProgress}%` }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {record.clearanceItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {item.status === 'completed' ? <CheckCircle className="h-5 w-5 text-green-500" /> : item.status === 'in_progress' ? <Clock className="h-5 w-5 text-yellow-500" /> : <Circle className="h-5 w-5 text-gray-300" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">{t('responsibleParty')}: {item.responsibleParty}</p>
                    {item.signedOffDate && <p className="text-xs text-green-600">{t('signedOffOn')} {item.signedOffDate}</p>}
                  </div>
                  {item.status !== 'completed' && (
                    <Button size="sm" variant="outline" onClick={() => updateClearanceItem(item.id, 'completed')}>{t('updateStatus')}</Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'settlement' && record.settlement && (
        <Card>
          <CardHeader><CardTitle>{t('finalSettlementSummary')}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('earnings')}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>{t('outstandingSalary')}</span><span>{formatCurrency(record.settlement.outstandingSalary)}</span></div>
                  <div className="flex justify-between"><span>{t('leaveEncashment')}</span><span>{formatCurrency(record.settlement.leaveEncashment)}</span></div>
                  <div className="flex justify-between"><span>{t('bonus')}</span><span>{formatCurrency(record.settlement.bonus)}</span></div>
                  <div className="flex justify-between font-semibold border-t pt-1">
                    <span>{t('grossTotal')}</span>
                    <span>{formatCurrency(record.settlement.outstandingSalary + record.settlement.leaveEncashment + record.settlement.bonus)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('deductions')}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>{t('loansAdvances')}</span><span className="text-red-600">-{formatCurrency(record.settlement.loanDeductions)}</span></div>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold text-cg-dark">
                  <span>{t('netPayable')}</span>
                  <span>{formatCurrency(record.settlement.netPayable)}</span>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
                <p className="font-medium">{t('providentFund')}</p>
                <p>{t('pfBalance')}: {formatCurrency(record.settlement.pfBalance)}</p>
                <p className="text-xs mt-1">{t('pfNote')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

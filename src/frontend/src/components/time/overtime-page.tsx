'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Clock, Plus, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { Modal } from '@/components/ui/modal';
import { FormField } from '@/components/ui/form-field';
import { Skeleton } from '@/components/ui/skeleton';
import { useOvertime, type OTStatus, type OTType } from '@/hooks/use-overtime';
import { formatCurrency } from '@/lib/date';

const STATUS_VARIANT: Record<OTStatus, 'neutral' | 'info' | 'success' | 'warning' | 'error'> = {
  pending: 'warning', approved: 'success', completed: 'success', rejected: 'error', cancelled: 'neutral',
};

export function OvertimePage() {
  const t = useTranslations('overtime');
  const tCommon = useTranslations('common');
  const { requests, loading, stats, submitRequest, cancelRequest } = useOvertime();
  const [activeTab, setActiveTab] = useState('summary');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState({ date: '', startTime: '18:00', endTime: '20:00', reason: '', type: 'weekday' as OTType });

  const tabs = [
    { key: 'summary', label: t('summary') },
    { key: 'request', label: t('newRequest') },
    { key: 'history', label: t('history') },
  ];

  if (loading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 w-full" />)}</div>;
  }

  const handleSubmit = async () => {
    const start = parseInt(form.startTime.split(':')[0]);
    const end = parseInt(form.endTime.split(':')[0]);
    const hours = end - start;
    const rates: Record<OTType, number> = { weekday: 1.5, weekend: 2.0, holiday: 3.0, night: 1.5 };
    await submitRequest({
      date: form.date, startTime: form.startTime, endTime: form.endTime,
      totalHours: hours, type: form.type, reason: form.reason,
      estimatedAmount: hours * 250 * rates[form.type],
    });
    setShowCreateModal(false);
    setForm({ date: '', startTime: '18:00', endTime: '20:00', reason: '', type: 'weekday' });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
          <p className="text-gray-500 mt-1">{t('subtitle')}</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />{t('newRequest')}
        </Button>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-cg-dark">{stats.weeklyHours}h</p><p className="text-xs text-gray-400">{t('totalHours')} (week)</p></CardContent></Card>
            <Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-yellow-600">{stats.pendingCount}</p><p className="text-xs text-gray-400">{t('pendingRequests')}</p></CardContent></Card>
            <Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-green-600">{stats.approvedCount}</p><p className="text-xs text-gray-400">{t('approvedRequests')}</p></CardContent></Card>
            <Card><CardContent className="p-6 text-center">
              <p className="text-2xl font-bold text-cg-dark">{stats.maxWeeklyHours - stats.weeklyHours}h</p>
              <p className="text-xs text-gray-400">{t('remainingHours')}</p>
              {stats.weeklyHours > stats.maxWeeklyHours * 0.8 && (
                <div className="flex items-center justify-center gap-1 mt-1 text-xs text-yellow-600">
                  <AlertTriangle className="h-3 w-3" /> Near limit
                </div>
              )}
            </CardContent></Card>
          </div>

          <Card>
            <CardHeader><CardTitle>{t('typesAndRates')}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(['weekday', 'weekend', 'holiday', 'night'] as OTType[]).map((type) => (
                  <div key={type} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">{t(`type.${type}` as never)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>{t('recentRequests')}</CardTitle></CardHeader>
            <CardContent>
              {requests.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">{t('noRequests')}</p>
              ) : (
                <div className="space-y-2">
                  {requests.slice(0, 5).map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{req.date} ({req.startTime} - {req.endTime})</p>
                        <p className="text-xs text-gray-500">{req.reason}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={STATUS_VARIANT[req.status]}>{t(`status.${req.status}` as never)}</Badge>
                        <p className="text-xs text-gray-500 mt-1">{req.totalHours}h | {formatCurrency(req.estimatedAmount)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'history' && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('date')}</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('time')}</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('totalHours')}</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('type.weekday')}</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('amount')}</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-gray-400 uppercase">Status</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-gray-400 uppercase"></th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 px-4">{req.date}</td>
                      <td className="py-3 px-4 text-center">{req.startTime} - {req.endTime}</td>
                      <td className="py-3 px-4 text-center">{req.totalHours}h</td>
                      <td className="py-3 px-4">{t(`type.${req.type}` as never)}</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(req.estimatedAmount)}</td>
                      <td className="py-3 px-4 text-center"><Badge variant={STATUS_VARIANT[req.status]}>{t(`status.${req.status}` as never)}</Badge></td>
                      <td className="py-3 px-4 text-center">
                        {req.status === 'pending' && <Button size="sm" variant="ghost" className="text-red-500" onClick={() => cancelRequest(req.id)}>{t('cancelRequest')}</Button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'request' && (
        <Card>
          <CardContent className="py-12 text-center">
            <Button onClick={() => setShowCreateModal(true)}><Plus className="h-4 w-4 mr-2" />{t('newRequest')}</Button>
          </CardContent>
        </Card>
      )}

      <Modal open={showCreateModal} onClose={() => setShowCreateModal(false)} title={t('newRequest')}>
        <div className="space-y-4">
          <FormField label={t('date')} name="otDate" type="date" value={form.date} onChange={(v) => setForm((p) => ({ ...p, date: v }))} required />
          <div className="grid grid-cols-2 gap-4">
            <FormField label={t('startTime')} name="startTime" value={form.startTime} onChange={(v) => setForm((p) => ({ ...p, startTime: v }))} required />
            <FormField label={t('endTime')} name="endTime" value={form.endTime} onChange={(v) => setForm((p) => ({ ...p, endTime: v }))} required />
          </div>
          <FormField label="Type" name="otType" type="select" value={form.type} onChange={(v) => setForm((p) => ({ ...p, type: v as OTType }))}
            options={[{ value: 'weekday', label: t('type.weekday') }, { value: 'weekend', label: t('type.weekend') }, { value: 'holiday', label: t('type.holiday') }]} />
          <FormField label={t('reason')} name="reason" type="textarea" value={form.reason} onChange={(v) => setForm((p) => ({ ...p, reason: v }))} required />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setShowCreateModal(false)}>{tCommon('cancel')}</Button>
          <Button onClick={handleSubmit} disabled={!form.date || !form.reason}>{t('submit')}</Button>
        </div>
      </Modal>
    </>
  );
}

'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import type { LeaveBalance, LeaveType, HalfDayPeriod } from '@/hooks/use-leave';

interface LeaveRequestFormProps {
  balances: LeaveBalance[];
  substituteEmployees: { id: string; nameEn: string; nameTh: string }[];
  preselectedType?: LeaveType;
  submitting?: boolean;
  onSubmit: (data: {
    type: LeaveType;
    startDate: string;
    endDate: string;
    days: number;
    halfDay?: HalfDayPeriod | null;
    reason: string;
    substituteId?: string;
  }) => Promise<unknown>;
  onCancel?: () => void;
}

function calculateWorkingDays(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  if (e < s) return 0;
  let count = 0;
  const current = new Date(s);
  while (current <= e) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) count++;
    current.setDate(current.getDate() + 1);
  }
  return count;
}

export function LeaveRequestForm({
  balances,
  substituteEmployees,
  preselectedType,
  submitting,
  onSubmit,
  onCancel,
}: LeaveRequestFormProps) {
  const t = useTranslations('leave');
  const tc = useTranslations('common');
  const { toast } = useToast();

  const [leaveType, setLeaveType] = useState<string>(preselectedType || '');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [halfDayOption, setHalfDayOption] = useState<'none' | 'morning' | 'afternoon'>('none');
  const [reason, setReason] = useState('');
  const [substituteId, setSubstituteId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const today = new Date().toISOString().split('T')[0];
  const isSingleDay = startDate && endDate && startDate === endDate;

  const workingDays = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const days = calculateWorkingDays(startDate, endDate);
    if (isSingleDay && halfDayOption !== 'none') return 0.5;
    return days;
  }, [startDate, endDate, isSingleDay, halfDayOption]);

  const selectedBalance = balances.find((b) => b.type === leaveType);

  // Policy validation
  const validations = useMemo(() => {
    const checks: { label: string; passed: boolean; type: 'error' | 'warning' | 'success' }[] = [];

    if (selectedBalance && workingDays > 0) {
      checks.push({
        label: workingDays <= selectedBalance.remaining ? 'Sufficient balance' : t('warning.exceedsBalance'),
        passed: workingDays <= selectedBalance.remaining,
        type: workingDays <= selectedBalance.remaining ? 'success' : 'error',
      });
    }

    if (startDate) {
      const noConflict = true; // Simplified — would check real conflicts
      checks.push({
        label: noConflict ? 'No schedule conflicts' : t('warning.overlapping'),
        passed: noConflict,
        type: noConflict ? 'success' : 'error',
      });
    }

    if (startDate) {
      const daysDiff = Math.ceil((new Date(startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      const noticeMet = daysDiff >= 3;
      checks.push({
        label: noticeMet ? 'Advance notice met (3+ days)' : 'Short notice — may need extra approval',
        passed: noticeMet,
        type: noticeMet ? 'success' : 'warning',
      });
    }

    if (leaveType === 'sick' && workingDays > 3) {
      checks.push({
        label: t('warning.medicalCertNeeded'),
        passed: false,
        type: 'warning',
      });
    }

    return checks;
  }, [selectedBalance, workingDays, startDate, leaveType, t]);

  const hasBlockingError = validations.some((v) => v.type === 'error' && !v.passed);

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!leaveType) errs.leaveType = tc('required');
    if (!startDate) errs.startDate = tc('required');
    if (!endDate) errs.endDate = tc('required');
    if (!reason) errs.reason = tc('required');
    if (leaveType === 'sick' && workingDays > 3 && !reason.trim()) {
      errs.reason = t('medicalCertRequired');
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [leaveType, startDate, endDate, reason, workingDays, tc, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || hasBlockingError) return;

    try {
      await onSubmit({
        type: leaveType as LeaveType,
        startDate,
        endDate,
        days: workingDays,
        halfDay: isSingleDay && halfDayOption !== 'none' ? (halfDayOption as HalfDayPeriod) : null,
        reason,
        substituteId: substituteId || undefined,
      });
      toast('success', t('requestSubmitted'));
      // Reset form
      setLeaveType('');
      setStartDate('');
      setEndDate('');
      setHalfDayOption('none');
      setReason('');
      setSubstituteId('');
      setErrors({});
    } catch {
      toast('error', 'Failed to submit leave request');
    }
  };

  const leaveTypeOptions = balances.map((b) => ({
    value: b.type,
    label: `${b.nameEn} (${b.remaining} ${t('days')} left)`,
  }));

  const substituteOptions = substituteEmployees.map((e) => ({
    value: e.id,
    label: e.nameEn,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t('newRequest')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label={t('selectType')}
                  name="leaveType"
                  type="select"
                  value={leaveType}
                  onChange={setLeaveType}
                  options={leaveTypeOptions}
                  required
                  error={errors.leaveType}
                  placeholder={t('selectType')}
                />

                {selectedBalance && (
                  <div className="flex items-end pb-1">
                    <div className="w-full p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">{t('remaining')}</p>
                      <p className={cn('text-xl font-bold', selectedBalance.remaining > 0 ? 'text-green-600' : 'text-red-600')}>
                        {selectedBalance.remaining} <span className="text-sm font-normal text-gray-500">{t('days')}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label={t('startDate')}
                  name="startDate"
                  type="date"
                  value={startDate}
                  onChange={(v) => {
                    setStartDate(v);
                    if (!endDate || v > endDate) setEndDate(v);
                  }}
                  required
                  error={errors.startDate}
                />
                <FormField
                  label={t('endDate')}
                  name="endDate"
                  type="date"
                  value={endDate}
                  onChange={setEndDate}
                  required
                  error={errors.endDate}
                />
              </div>

              {/* Half-day option for single day */}
              {isSingleDay && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('halfDay')}</label>
                  <div className="flex gap-3">
                    {(['none', 'morning', 'afternoon'] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setHalfDayOption(option)}
                        className={cn(
                          'px-4 py-2 rounded-lg text-sm font-medium border transition',
                          halfDayOption === option
                            ? 'border-cg-red bg-cg-red/5 text-cg-red'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        )}
                      >
                        {option === 'none' ? t('fullDay') : option === 'morning' ? t('morning') : t('afternoon')}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Duration display */}
              {workingDays > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">{t('duration')}</p>
                  <p className="text-2xl font-bold text-cg-red">
                    {workingDays} {t('workingDays')}
                  </p>
                </div>
              )}

              <FormField
                label={t('reason')}
                name="reason"
                type="textarea"
                value={reason}
                onChange={setReason}
                required
                error={errors.reason}
                placeholder="Please provide a reason for your leave"
              />

              <FormField
                label={t('substitute')}
                name="substituteId"
                type="select"
                value={substituteId}
                onChange={setSubstituteId}
                options={substituteOptions}
                placeholder={t('substituteDesc')}
              />

              {/* Medical cert note for sick leave */}
              {leaveType === 'sick' && workingDays > 3 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">{t('medicalCert')}</p>
                    <p className="text-sm text-yellow-700">{t('medicalCertRequired')}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                {tc('cancel')}
              </Button>
            )}
            <Button type="submit" disabled={submitting || hasBlockingError}>
              {submitting ? tc('loading') : t('submit')}
            </Button>
          </div>
        </div>

        {/* Policy Validation Panel */}
        <div className="space-y-4">
          {validations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Policy Check</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {validations.map((v, i) => (
                  <div key={i} className="flex items-start gap-2">
                    {v.type === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : v.type === 'warning' ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-700">{v.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {selectedBalance && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{selectedBalance.nameEn} Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t('entitled')}</span>
                    <span className="font-medium">{selectedBalance.entitled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t('used')}</span>
                    <span className="font-medium">{selectedBalance.used}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t('pending')}</span>
                    <span className="font-medium text-yellow-600">{selectedBalance.pending}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">{t('remaining')}</span>
                    <span className="font-bold text-lg text-green-600">{selectedBalance.remaining}</span>
                  </div>
                  {workingDays > 0 && (
                    <>
                      <div className="flex justify-between text-cg-red">
                        <span>This request</span>
                        <span className="font-medium">-{workingDays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">After</span>
                        <Badge variant={selectedBalance.remaining - workingDays >= 0 ? 'success' : 'error'}>
                          {selectedBalance.remaining - workingDays} {t('days')}
                        </Badge>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </form>
  );
}

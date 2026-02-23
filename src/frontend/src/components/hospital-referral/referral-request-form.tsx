'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { useToast } from '@/components/ui/toast';
import type { Hospital } from '@/hooks/use-hospital-referral';

interface ReferralRequestFormProps {
  hospitals: Hospital[];
  submitting?: boolean;
  onSubmit: (data: {
    hospitalName: string;
    hospitalBranch?: string;
    reason: string;
    preferredDate: string;
    notes?: string;
  }) => Promise<unknown>;
  onCancel?: () => void;
}

export function ReferralRequestForm({
  hospitals,
  submitting,
  onSubmit,
  onCancel,
}: ReferralRequestFormProps) {
  const t = useTranslations('hospitalReferral');
  const tc = useTranslations('common');
  const { toast } = useToast();

  const [hospitalId, setHospitalId] = useState('');
  const [hospitalBranch, setHospitalBranch] = useState('');
  const [reason, setReason] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const today = new Date().toISOString().split('T')[0];

  const hospitalOptions = hospitals.map((h) => ({
    value: h.id,
    label: h.nameEn,
  }));

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!hospitalId) errs.hospitalId = tc('required');
    if (!reason) {
      errs.reason = tc('required');
    } else if (reason.trim().length < 10) {
      errs.reason = t('reasonMinLength');
    }
    if (!preferredDate) {
      errs.preferredDate = tc('required');
    } else if (preferredDate <= today) {
      errs.preferredDate = t('dateMustBeFuture');
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [hospitalId, reason, preferredDate, today, tc, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedHospital = hospitals.find((h) => h.id === hospitalId);
    if (!selectedHospital) return;

    try {
      await onSubmit({
        hospitalName: selectedHospital.nameEn,
        hospitalBranch: hospitalBranch || selectedHospital.branch,
        reason,
        preferredDate,
        notes: notes || undefined,
      });
      toast('success', t('submitSuccess'));
      setHospitalId('');
      setHospitalBranch('');
      setReason('');
      setPreferredDate('');
      setNotes('');
      setErrors({});
    } catch {
      toast('error', 'Failed to submit referral request');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('newRequest')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              label={t('selectHospital')}
              name="hospitalId"
              type="select"
              value={hospitalId}
              onChange={setHospitalId}
              options={hospitalOptions}
              required
              error={errors.hospitalId}
              placeholder={t('selectHospital')}
            />

            <FormField
              label={t('hospitalBranch')}
              name="hospitalBranch"
              type="text"
              value={hospitalBranch}
              onChange={setHospitalBranch}
              placeholder="e.g. Sukhumvit Branch (optional)"
            />

            <FormField
              label={t('preferredDate')}
              name="preferredDate"
              type="date"
              value={preferredDate}
              onChange={setPreferredDate}
              required
              error={errors.preferredDate}
            />

            <FormField
              label={t('reason')}
              name="reason"
              type="textarea"
              value={reason}
              onChange={setReason}
              required
              error={errors.reason}
              placeholder="Please describe the medical reason for this referral (min. 10 characters)"
            />

            <FormField
              label={t('notes')}
              name="notes"
              type="textarea"
              value={notes}
              onChange={setNotes}
              placeholder="Any additional notes or information (optional)"
            />
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              {tc('cancel')}
            </Button>
          )}
          <Button type="submit" disabled={submitting}>
            {submitting ? tc('loading') : t('createRequest')}
          </Button>
        </div>
      </div>
    </form>
  );
}

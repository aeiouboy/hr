'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { useToast } from '@/components/ui/toast';
import type { Hospital, Province } from '@/hooks/use-hospital-referral';

interface ReferralRequestFormProps {
 hospitals: Hospital[];
 provinces: Province[];
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
 provinces,
 submitting,
 onSubmit,
 onCancel,
}: ReferralRequestFormProps) {
 const t = useTranslations('hospitalReferral');
 const tc = useTranslations('common');
 const { toast } = useToast();

 const [provinceId, setProvinceId] = useState('');
 const [hospitalId, setHospitalId] = useState('');
 const [reason, setReason] = useState('');
 const [preferredDate, setPreferredDate] = useState('');
 const [notes, setNotes] = useState('');
 const [errors, setErrors] = useState<Record<string, string>>({});

 const today = new Date().toISOString().split('T')[0];

 const provinceOptions = provinces.map((p) => ({
 value: p.id,
 label: p.nameEn,
 }));

 const filteredHospitals = provinceId
 ? hospitals.filter((h) => h.province === provinceId)
 : hospitals;

 const hospitalOptions = filteredHospitals.map((h) => ({
 value: h.id,
 label: h.branch ? `${h.nameEn} (${h.branch})` : h.nameEn,
 searchLabel: h.branch ? `${h.nameTh} (${h.branch})` : h.nameTh,
 }));

 const handleProvinceChange = (val: string) => {
 setProvinceId(val);
 setHospitalId('');
 };

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
 hospitalBranch: selectedHospital.branch,
 reason,
 preferredDate,
 notes: notes || undefined,
 });
 toast('success', t('submitSuccess'));
 setProvinceId('');
 setHospitalId('');
 setReason('');
 setPreferredDate('');
 setNotes('');
 setErrors({});
 } catch {
 toast('error','Failed to submit referral request');
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
 label={t('province')}
 name="provinceId"
 type="select"
 value={provinceId}
 onChange={handleProvinceChange}
 options={provinceOptions}
 required
 error={errors.provinceId}
 placeholder={t('selectProvince')}
 />

 <FormField
 label={t('selectHospital')}
 name="hospitalId"
 type="combobox"
 value={hospitalId}
 onChange={setHospitalId}
 options={hospitalOptions}
 required
 error={errors.hospitalId}
 placeholder={t('selectHospital')}
 disabled={!provinceId}
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

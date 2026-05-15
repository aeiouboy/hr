'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Button, Card, CardEyebrow, CardTitle, FormField, FormInput } from '@/components/humi';
import { FileUploadField } from '@/components/humi/FileUploadField';
import { Capability } from '@/components/humi';
import type { BenefitTemplateProps } from './SimpleClaimForm';

export interface RecordsFlatFormValues {
  employeeId: string;
  eventDate: string;
  notes: string;
  attachmentName: string;
}

// ── RecordsFlatForm ───────────────────────────────────────────────────────────
// Template: records-flat
// Use cases: funeral assistance (employee), wreath (employee), gifts (patient/ordination/wedding/childbirth)
// Admin-only logging form: event date, narrative notes, supporting docs.
// No employee submit, no approval chain — recorded directly by HR.

export function RecordsFlatForm({
  plan,
  onSubmitted,
  defaultEmployeeId,
  className,
}: Omit<BenefitTemplateProps, 'onSubmitted'> & {
  onSubmitted?: (wfId: string, formValues: RecordsFlatFormValues) => void;
}) {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const planName = isTh ? plan.nameTh : plan.nameEn;
  const requiredDocs = isTh ? plan.requiredDocsTh : plan.requiredDocsEn;

  const [form, setForm] = useState({
    employeeId: defaultEmployeeId ?? '',
    eventDate: '',
    notes: '',
    attachmentName: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [lastWorkflowId, setLastWorkflowId] = useState<string | null>(null);

  const setField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors.length > 0) setErrors([]);
    if (lastWorkflowId) setLastWorkflowId(null);
  };

  const save = () => {
    const nextErrors: string[] = [];
    if (!form.employeeId.trim()) {
      nextErrors.push(isTh ? 'กรุณาระบุรหัสพนักงาน' : 'Employee ID is required');
    }
    if (!form.eventDate) {
      nextErrors.push(isTh ? 'กรุณาระบุวันที่เหตุการณ์' : 'Event date is required');
    }
    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return;
    }
    const wfId = `WF-${Date.now()}`;
    const submittedValues: RecordsFlatFormValues = { ...form };
    setLastWorkflowId(wfId);
    setForm({ employeeId: defaultEmployeeId ?? '', eventDate: '', notes: '', attachmentName: '' });
    setErrors([]);
    onSubmitted?.(wfId, submittedValues);
  };

  return (
    <Card variant="raised" size="lg" className={className}>
      <CardEyebrow>{isTh ? 'บันทึกสวัสดิการ · HR เท่านั้น' : 'Benefit record · HR only'}</CardEyebrow>
      <CardTitle>{planName}</CardTitle>
      <p className="mt-2 text-small text-ink-muted">{plan.eligibilityTh}</p>

      {/* "Recorded by HR" indicator — no approval chain */}
      <div className="mt-3 inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-ink-muted" aria-hidden />
        <span className="text-small text-ink-muted">
          {isTh ? 'บันทึกโดย HR' : 'Recorded by HR'}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <FormField id={`${plan.id}-employee-id`} label={isTh ? 'รหัสพนักงาน' : 'Employee ID'} required>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              value={form.employeeId}
              onChange={(e) => setField('employeeId', e.target.value)}
              placeholder="EMP001"
            />
          )}
        </FormField>

        <FormField id={`${plan.id}-event-date`} label={isTh ? 'วันที่เหตุการณ์' : 'Event date'} required>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              type="date"
              value={form.eventDate}
              onChange={(e) => setField('eventDate', e.target.value)}
            />
          )}
        </FormField>

        <FormField
          id={`${plan.id}-notes`}
          label={isTh ? 'บันทึก / หมายเหตุ' : 'Notes'}
          className="sm:col-span-2"
        >
          {(controlProps) => (
            <textarea
              {...controlProps}
              rows={3}
              value={form.notes}
              onChange={(e) => setField('notes', e.target.value)}
              className="w-full rounded-[var(--radius-md)] border border-hairline bg-surface px-3 py-2 text-body text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-[var(--dur-fast)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas resize-none"
              placeholder={isTh ? 'รายละเอียดเพิ่มเติม…' : 'Additional details…'}
            />
          )}
        </FormField>

        <FileUploadField
          label={isTh ? 'เอกสารสนับสนุน' : 'Supporting documents'}
          helperText={requiredDocs.length > 0 ? requiredDocs.join(' · ') : undefined}
          className="sm:col-span-2"
          onUpload={(_, file) => setField('attachmentName', file?.filename ?? '')}
          onRemove={() => setField('attachmentName', '')}
        />
      </div>

      {errors.length > 0 && (
        <div role="alert" className="mt-4 rounded-[var(--radius-md)] bg-danger-soft p-3 text-small text-ink">
          <ul className="list-disc pl-5">{errors.map((e) => <li key={e}>{e}</li>)}</ul>
        </div>
      )}
      {lastWorkflowId && (
        <div role="status" className="mt-4 rounded-[var(--radius-md)] bg-success-soft p-3 text-small font-medium text-ink">
          {isTh ? `บันทึก ${lastWorkflowId} แล้ว` : `Record ${lastWorkflowId} saved`}
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <Capability
          action="edit"
          fallback={
            <Button variant="primary" disabled>
              {isTh ? 'บันทึก' : 'Save record'}
            </Button>
          }
        >
          <Button variant="primary" onClick={save}>
            {isTh ? 'บันทึก' : 'Save record'}
          </Button>
        </Capability>
      </div>
    </Card>
  );
}

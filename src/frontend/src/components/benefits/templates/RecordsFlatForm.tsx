'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Button, Card, CardEyebrow, CardTitle, FormField, FormInput } from '@/components/humi';
import { FileUploadField } from '@/components/humi/molecules/FileUploadField';
import { Capability } from '@/components/humi';
import type { BenefitTemplateProps } from './SimpleClaimForm';

// ── RecordsFlatForm ───────────────────────────────────────────────────────────
// Template: records-flat
// Use cases: funeral assistance (employee), wreath (employee), gifts (patient/ordination/wedding/childbirth)
// Admin-only logging form: event date, narrative notes, supporting docs.
// No employee submit, no approval chain — recorded directly by HR.
//
// mode='exception' (STA-26 PR-B): renders borrow-forward paired-entry layout
//   Left: reversal row (negative, prefilled from exceptionSource, read-only)
//   Right: new-entry row (positive, editable)

export interface RecordsFlatFormExceptionSource {
  claimId: string;
  amount: number;
  planKey: string;
}

export interface RecordsFlatFormOwnProps {
  /** 'normal' (default): standard single-entry layout. 'exception': paired reversal + new entry. */
  mode?: 'normal' | 'exception';
  /** Source claim to reverse. Only used when mode='exception'. */
  exceptionSource?: RecordsFlatFormExceptionSource | null;
}

export type RecordsFlatFormProps = BenefitTemplateProps & RecordsFlatFormOwnProps;

export function RecordsFlatForm({
  plan,
  onSubmitted,
  defaultEmployeeId,
  className,
  mode = 'normal',
  exceptionSource = null,
}: RecordsFlatFormProps) {
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

  // exception-mode new-entry fields
  const [newEntry, setNewEntry] = useState({
    amount: '',
    eventDate: '',
    notes: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [lastWorkflowId, setLastWorkflowId] = useState<string | null>(null);

  const setField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors.length > 0) setErrors([]);
    if (lastWorkflowId) setLastWorkflowId(null);
  };

  const setNewEntryField = (field: keyof typeof newEntry, value: string) => {
    setNewEntry((prev) => ({ ...prev, [field]: value }));
    if (errors.length > 0) setErrors([]);
    if (lastWorkflowId) setLastWorkflowId(null);
  };

  const save = () => {
    const nextErrors: string[] = [];
    if (mode === 'exception') {
      if (!newEntry.amount || Number(newEntry.amount) <= 0) {
        nextErrors.push(isTh ? 'กรุณาระบุจำนวนเงินรายการใหม่' : 'New entry amount is required');
      }
      if (!newEntry.eventDate) {
        nextErrors.push(isTh ? 'กรุณาระบุวันที่รายการใหม่' : 'New entry date is required');
      }
    } else {
      if (!form.employeeId.trim()) {
        nextErrors.push(isTh ? 'กรุณาระบุรหัสพนักงาน' : 'Employee ID is required');
      }
      if (!form.eventDate) {
        nextErrors.push(isTh ? 'กรุณาระบุวันที่เหตุการณ์' : 'Event date is required');
      }
    }
    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return;
    }
    const wfId = `WF-${Date.now()}`;
    setLastWorkflowId(wfId);
    setForm({ employeeId: defaultEmployeeId ?? '', eventDate: '', notes: '', attachmentName: '' });
    setNewEntry({ amount: '', eventDate: '', notes: '' });
    setErrors([]);
    onSubmitted?.(wfId);
  };

  // ── Exception mode render ─────────────────────────────────────────────────
  if (mode === 'exception') {
    return (
      <Card variant="raised" size="lg" className={className}>
        <CardEyebrow>
          {isTh ? 'รายการพิเศษ (Borrow-forward) · HR เท่านั้น' : 'Benefits Exception (Borrow-forward) · HR only'}
        </CardEyebrow>
        <CardTitle>
          {isTh ? 'เครดิตคืน + รายการใหม่' : 'Reversal + New entry'}
        </CardTitle>
        <p className="mt-2 text-small text-ink-muted">
          {isTh
            ? 'เคลมต้นทางจะถูกหักกลับ (เครดิตคืน) และบันทึกรายการใหม่ในรอบถัดไป'
            : 'The source claim is reversed (credit back) and a new entry is recorded for the next period.'}
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {/* Left: Reversal entry — read-only, prefilled from exceptionSource */}
          <div className="rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-4">
            <p className="mb-3 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {isTh ? 'เครดิตคืน (ติดลบ)' : 'Reversal (negative)'}
            </p>
            <div className="space-y-2">
              <div>
                <span className="text-small text-ink-muted">{isTh ? 'รหัสเคลม' : 'Claim ID'}</span>
                <p className="font-medium text-ink">{exceptionSource?.claimId ?? '—'}</p>
              </div>
              <div>
                <span className="text-small text-ink-muted">{isTh ? 'แผนสวัสดิการ' : 'Plan'}</span>
                <p className="font-medium text-ink">{exceptionSource?.planKey ?? '—'}</p>
              </div>
              <div>
                <span className="text-small text-ink-muted">{isTh ? 'จำนวนเงิน (บาท)' : 'Amount (THB)'}</span>
                <p className="font-semibold text-danger">
                  {exceptionSource
                    ? `−${exceptionSource.amount.toLocaleString('th-TH')}`
                    : '—'}
                </p>
              </div>
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-danger-soft px-2.5 py-0.5 text-[length:var(--text-eyebrow)] font-medium uppercase tracking-[0.14em] text-danger">
              <span className="h-1.5 w-1.5 rounded-full bg-danger" aria-hidden />
              {isTh ? 'อ่านอย่างเดียว' : 'Read-only'}
            </div>
          </div>

          {/* Right: New entry — editable */}
          <div className="rounded-[var(--radius-md)] border border-hairline bg-surface p-4">
            <p className="mb-3 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {isTh ? 'รายการใหม่ (บวก)' : 'New entry (positive)'}
            </p>
            <div className="space-y-3">
              <FormField id="exc-new-amount" label={isTh ? 'จำนวนเงิน (บาท)' : 'Amount (THB)'} required>
                {(controlProps) => (
                  <FormInput
                    {...controlProps}
                    inputMode="numeric"
                    value={newEntry.amount}
                    onChange={(e) => setNewEntryField('amount', e.target.value)}
                    placeholder="0"
                  />
                )}
              </FormField>
              <FormField id="exc-new-date" label={isTh ? 'วันที่รายการ' : 'Entry date'} required>
                {(controlProps) => (
                  <FormInput
                    {...controlProps}
                    type="date"
                    value={newEntry.eventDate}
                    onChange={(e) => setNewEntryField('eventDate', e.target.value)}
                  />
                )}
              </FormField>
              <FormField id="exc-new-notes" label={isTh ? 'หมายเหตุ' : 'Notes'}>
                {(controlProps) => (
                  <textarea
                    {...controlProps}
                    rows={2}
                    value={newEntry.notes}
                    onChange={(e) => setNewEntryField('notes', e.target.value)}
                    className="w-full rounded-[var(--radius-md)] border border-hairline bg-surface px-3 py-2 text-body text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-[var(--dur-fast)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas resize-none"
                    placeholder={isTh ? 'เหตุผลรายการใหม่…' : 'Reason for new entry…'}
                  />
                )}
              </FormField>
            </div>
          </div>
        </div>

        {errors.length > 0 && (
          <div role="alert" className="mt-4 rounded-[var(--radius-md)] bg-danger-soft p-3 text-small text-ink">
            <ul className="list-disc pl-5">{errors.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        )}
        {lastWorkflowId && (
          <div role="status" className="mt-4 rounded-[var(--radius-md)] bg-success-soft p-3 text-small font-medium text-ink">
            {isTh ? `บันทึกรายการพิเศษ ${lastWorkflowId} แล้ว` : `Exception ${lastWorkflowId} saved`}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Capability
            action="edit"
            fallback={
              <Button variant="primary" disabled>
                {isTh ? 'บันทึกรายการพิเศษ' : 'Save Exception'}
              </Button>
            }
          >
            <Button variant="primary" onClick={save}>
              {isTh ? 'บันทึกรายการพิเศษ' : 'Save Exception'}
            </Button>
          </Capability>
        </div>
      </Card>
    );
  }

  // ── Normal mode render (unchanged) ───────────────────────────────────────
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

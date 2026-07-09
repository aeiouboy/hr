'use client';

import { useMemo, useState } from 'react';
import { Button, Card, CardEyebrow, CardTitle, FormField, FormInput } from '@/components/humi';
import { FileUploadField } from '@/components/humi/molecules/FileUploadField';
import {
  BENEFIT_CODE_BY_TYPE,
  BENEFIT_TYPE_LABEL,
  useBenefitClaimsStore,
  validateBenefitAttachmentRules,
  type BenefitClaimType,
} from '@/stores/benefit-claims';

const benefitTypeOptions: BenefitClaimType[] = [
  'medical',
  'gasoline',
  'mobile',
  'physical_checkup',
  'dependent',
];

const selectClassName =
  'h-10 w-full rounded-md border border-hairline bg-surface px-3 text-body text-ink transition-[border-color,box-shadow] duration-[var(--dur-fast)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas';

export function ReimbursementRequestPanel({
  onSubmitted,
}: {
  onSubmitted?: (workflowRequestId: string) => void;
}) {
  const submitClaim = useBenefitClaimsStore((state) => state.submitClaim);
  const hasDuplicateReceipt = useBenefitClaimsStore((state) => state.hasDuplicateReceipt);
  const [form, setForm] = useState({
    benefitType: 'medical' as BenefitClaimType,
    receiptNo: '',
    receiptDate: '',
    receiptAmount: '',
    totalClaimAmount: '',
    hospitalName: '',
    dependentName: '',
    gasolineClaimType: 'actual',
    attachmentName: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [lastWorkflowId, setLastWorkflowId] = useState<string | null>(null);

  const benefitCode = BENEFIT_CODE_BY_TYPE[form.benefitType];
  const receiptAmount = Number(form.receiptAmount || 0);
  const claimAmount = Number(form.totalClaimAmount || form.receiptAmount || 0);
  const attachments = useMemo(
    () => form.attachmentName ? [{
      id: 'attachment-1',
      filename: form.attachmentName,
      sizeMb: 1,
      mimeType: 'application/pdf',
    }] : [],
    [form.attachmentName],
  );

  const setField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors.length > 0) setErrors([]);
    if (lastWorkflowId) setLastWorkflowId(null);
  };

  const submit = () => {
    const nextErrors: string[] = [];
    if (!form.receiptNo.trim()) nextErrors.push('กรุณาระบุเลขที่ใบเสร็จ/เอกสาร');
    if (!form.receiptDate) nextErrors.push('กรุณาระบุวันที่ใบเสร็จ/เอกสาร');
    if (!Number.isFinite(receiptAmount) || receiptAmount <= 0) nextErrors.push('กรุณาระบุจำนวนเงินตามใบเสร็จ');
    if (!Number.isFinite(claimAmount) || claimAmount <= 0) nextErrors.push('กรุณาระบุจำนวนเงินที่ขอเบิก');
    if (hasDuplicateReceipt('EMP001', benefitCode, form.receiptNo)) {
      nextErrors.push('พบเลขที่ใบเสร็จ/เอกสารซ้ำสำหรับสวัสดิการนี้');
    }
    nextErrors.push(...validateBenefitAttachmentRules({
      benefitType: form.benefitType,
      attachments,
    }));

    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return;
    }

    const claim = submitClaim({
      employeeId: 'EMP001',
      employeeName: 'จงรักษ์ ทานากะ',
      businessUnit: 'People Operations',
      benefitType: form.benefitType,
      benefitCode,
      benefitName: BENEFIT_TYPE_LABEL[form.benefitType],
      receiptNo: form.receiptNo.trim(),
      receiptDate: form.receiptDate,
      receiptAmount,
      totalClaimAmount: claimAmount,
      hospitalName: form.hospitalName,
      dependentName: form.dependentName,
      dependentRelationship: form.dependentName ? 'ครอบครัว' : undefined,
      gasolineClaimType: form.gasolineClaimType,
      attachments,
    });

    setForm((prev) => ({
      ...prev,
      receiptNo: '',
      receiptDate: '',
      receiptAmount: '',
      totalClaimAmount: '',
      hospitalName: '',
      dependentName: '',
    }));
    setLastWorkflowId(claim.workflowRequestId);
    setErrors([]);
    onSubmitted?.(claim.workflowRequestId);
  };

  return (
    <Card variant="raised" size="lg">
      <CardEyebrow>Benefit reimbursement · receipt-based claim</CardEyebrow>
      <CardTitle>เบิกสวัสดิการ</CardTitle>
      <p className="mt-2 text-small text-ink-muted">
        ส่งคำขอเบิกย้อนหลังตามใบเสร็จและวงเงินสวัสดิการ แยกจากใบส่งตัวโรงพยาบาลและการวางแผนภาษี
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <FormField id="claim-benefit-type" label="ประเภทสวัสดิการ" required>
          {(controlProps) => (
            <select
              {...controlProps}
              className={selectClassName}
              value={form.benefitType}
              onChange={(event) => setField('benefitType', event.target.value as BenefitClaimType)}
            >
              {benefitTypeOptions.map((type) => (
                <option key={type} value={type}>{BENEFIT_TYPE_LABEL[type]}</option>
              ))}
            </select>
          )}
        </FormField>
        <FormField id="claim-receipt-no" label="เลขที่ใบเสร็จ/เอกสาร" required>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              value={form.receiptNo}
              onChange={(event) => setField('receiptNo', event.target.value)}
              placeholder="เช่น RC-2026-0001"
            />
          )}
        </FormField>
        <FormField id="claim-receipt-date" label="วันที่ใบเสร็จ/เอกสาร" required>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              type="date"
              value={form.receiptDate}
              onChange={(event) => setField('receiptDate', event.target.value)}
            />
          )}
        </FormField>
        <FormField id="claim-receipt-amount" label="จำนวนเงินตามใบเสร็จ" required>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              inputMode="numeric"
              value={form.receiptAmount}
              onChange={(event) => setField('receiptAmount', event.target.value)}
            />
          )}
        </FormField>
        <FormField id="claim-total-amount" label="จำนวนเงินที่ขอเบิก" help="เว้นว่างเพื่อใช้ยอดตามใบเสร็จ">
          {(controlProps) => (
            <FormInput
              {...controlProps}
              inputMode="numeric"
              value={form.totalClaimAmount}
              onChange={(event) => setField('totalClaimAmount', event.target.value)}
            />
          )}
        </FormField>
        <FormField id="claim-hospital-name" label="โรงพยาบาล/ร้านค้า" help="ใช้กับการเบิกย้อนหลังเท่านั้น ไม่ใช่ใบส่งตัว">
          {(controlProps) => (
            <FormInput
              {...controlProps}
              value={form.hospitalName}
              onChange={(event) => setField('hospitalName', event.target.value)}
            />
          )}
        </FormField>
        <FormField id="claim-dependent-name" label="ผู้รับสิทธิ์ในใบเสร็จ" help="ระบุเมื่อเป็นสวัสดิการครอบครัว">
          {(controlProps) => (
            <FormInput
              {...controlProps}
              value={form.dependentName}
              onChange={(event) => setField('dependentName', event.target.value)}
            />
          )}
        </FormField>
        <FileUploadField
          label="เอกสารแนบเบิกย้อนหลัง"
          required
          helperText="แนบใบเสร็จหรือเอกสารประกอบตาม Humi file upload pattern — PDF, JPG, PNG สูงสุด 5 MB"
          className="sm:col-span-2"
          onUpload={(_, file) => setField('attachmentName', file?.filename ?? '')}
          onRemove={() => setField('attachmentName', '')}
        />
      </div>

      {errors.length > 0 && (
        <div role="alert" className="mt-4 rounded-md bg-danger-soft p-3 text-small text-ink">
          <ul className="list-disc pl-5">{errors.map((error) => <li key={error}>{error}</li>)}</ul>
        </div>
      )}
      {lastWorkflowId && (
        <div role="status" className="mt-4 rounded-md bg-success-soft p-3 text-small font-medium text-ink">
          ส่งคำขอ {lastWorkflowId} แล้ว · ติดตามได้ที่ /requests
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <Button variant="primary" onClick={submit}>ส่งคำขอเบิกสวัสดิการ</Button>
      </div>
    </Card>
  );
}

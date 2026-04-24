'use client';

// T2a-v2: BankDetailsEditor — bankCode dropdown + digits-only accountNo + holderName + attachment.
// Attachment: using FileUploadField (existing repo convention in /profile/me/page.tsx lines 391-410)
// because FileUploadField is already wired to useHumiProfileStore.addAttachment + preview list
// out of the box. AttachmentDropzone requires manual store wiring — cost > threshold for v2.
// Note: consolidate to AttachmentDropzone in follow-on task (global FileUploadField → Dropzone sweep).

import { useTranslations } from 'next-intl';
import { FormField } from '@/components/humi';
import { FileUploadField } from '@/components/humi/FileUploadField';
import { cn } from '@/lib/utils';
import type { BankDetails } from '@/stores/humi-profile-slice';

// ── Bank list (inlined — picklist pipeline task is separate) ──────────────────

const BANK_LIST = [
  { code: 'KBANK', th: 'กสิกรไทย' },
  { code: 'SCB',   th: 'ไทยพาณิชย์' },
  { code: 'BBL',   th: 'กรุงเทพ' },
  { code: 'KTB',   th: 'กรุงไทย' },
  { code: 'BAY',   th: 'กรุงศรีอยุธยา' },
  { code: 'TTB',   th: 'ทีเอ็มบีธนชาต' },
  { code: 'CIMB',  th: 'ซีไอเอ็มบี' },
] as const;

// ── Validation helper (exported for /profile/me save-button enable) ────────────

const ACCOUNT_NO_REGEX = /^\d{10,12}$/;

export function isBankValid(v: BankDetails): boolean {
  return (
    v.bankCode !== '' &&
    ACCOUNT_NO_REGEX.test(v.accountNo) &&
    v.holderName.trim() !== ''
  );
}

// ── Props ──────────────────────────────────────────────────────────────────────

interface BankDetailsEditorProps {
  value: BankDetails;
  onChange: (v: BankDetails) => void;
  disabled?: boolean;
  onAttach?: (attachmentId: string) => void;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function BankDetailsEditor({
  value,
  onChange,
  disabled = false,
  onAttach,
}: BankDetailsEditorProps) {
  // All hooks declared before any conditional returns (hooks-order guard)
  const t = useTranslations('ess');

  const handleAccountNoChange = (raw: string) => {
    // Strip non-digits on change
    const digitsOnly = raw.replace(/\D/g, '');
    onChange({ ...value, accountNo: digitsOnly });
  };

  const accountNoCount = `${value.accountNo.length}/12`;
  const accountNoError =
    value.accountNo.length > 0 && !ACCOUNT_NO_REGEX.test(value.accountNo)
      ? t('validation.accountNo')
      : undefined;

  return (
    <div className="flex flex-col gap-4">
      {/* Bank code dropdown */}
      <FormField label={t('bank.code')} required>
        {(controlProps) => (
          <select
            {...controlProps}
            value={value.bankCode}
            onChange={(e) => onChange({ ...value, bankCode: e.target.value })}
            disabled={disabled}
            className={cn(
              'w-full rounded-md border px-3 py-2 text-body text-ink',
              'bg-surface',
              'transition-[border-color,box-shadow] duration-[var(--dur-fast)]',
              'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'border-hairline hover:border-accent'
            )}
          >
            <option value="">— {t('bank.code')} —</option>
            {BANK_LIST.map(({ code, th }) => (
              <option key={code} value={code}>
                {th}
              </option>
            ))}
          </select>
        )}
      </FormField>

      {/* Account number — digits only, 10-12 chars */}
      <FormField
        label={t('bank.accountNo')}
        required
        error={accountNoError}
      >
        {(controlProps) => (
          <div className="relative">
            <input
              {...controlProps}
              type="text"
              inputMode="numeric"
              value={value.accountNo}
              onChange={(e) => handleAccountNoChange(e.target.value)}
              disabled={disabled}
              maxLength={12}
              className={cn(
                'w-full rounded-md border px-3 py-2 pr-16 text-body text-ink',
                'bg-surface placeholder:text-ink-muted',
                'transition-[border-color,box-shadow] duration-[var(--dur-fast)]',
                'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas',
                'disabled:cursor-not-allowed disabled:opacity-50',
                accountNoError ? 'border-danger' : 'border-hairline hover:border-accent'
              )}
            />
            {/* Character count */}
            <span
              aria-hidden
              className="absolute right-3 top-1/2 -translate-y-1/2 text-small text-ink-muted pointer-events-none"
            >
              {accountNoCount}
            </span>
          </div>
        )}
      </FormField>

      {/* Holder name */}
      <FormField label={t('bank.holder')} required>
        {(controlProps) => (
          <input
            {...controlProps}
            type="text"
            value={value.holderName}
            onChange={(e) => onChange({ ...value, holderName: e.target.value })}
            disabled={disabled}
            className={cn(
              'w-full rounded-md border px-3 py-2 text-body text-ink',
              'bg-surface placeholder:text-ink-muted',
              'transition-[border-color,box-shadow] duration-[var(--dur-fast)]',
              'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'border-hairline hover:border-accent'
            )}
          />
        )}
      </FormField>

      {/* Bank book attachment — FileUploadField (see file header for choice rationale) */}
      {!disabled && (
        <FileUploadField
          label={t('bank.book')}
          onUpload={(id: string) => {
            onChange({ ...value, bookAttachmentId: id });
            onAttach?.(id);
          }}
          onRemove={() => {
            onChange({ ...value, bookAttachmentId: null });
          }}
        />
      )}
    </div>
  );
}

BankDetailsEditor.displayName = 'BankDetailsEditor';

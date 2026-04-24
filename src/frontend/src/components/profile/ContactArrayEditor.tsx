'use client';

// T2a-v2: ContactArrayEditor — shared multi-value editor for Phone[] and Email[].
// Handles primary-flag invariant: exactly one primary at all times.
// Used by EmergencyContactList (phones sub-list) and /profile/me ContactInfo section.

import { useTranslations } from 'next-intl';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/humi';
import { FormField } from '@/components/humi';
import { cn } from '@/lib/utils';
import type { PhoneEntry, EmailEntry } from '@/stores/humi-profile-slice';

// ── Validation helpers ─────────────────────────────────────────────────────────

const PHONE_REGEX = /^\+?\d{9,10}$/;
const EMAIL_REGEX = /.+@.+\..+/;

export function isContactArrayValid(
  rows: PhoneEntry[] | EmailEntry[],
  kind: 'phone' | 'email'
): boolean {
  if (rows.length === 0) return false;
  const hasPrimary = rows.some((r) => r.primary);
  if (!hasPrimary) return false;
  return rows.every((r) =>
    kind === 'phone' ? PHONE_REGEX.test(r.value) : EMAIL_REGEX.test(r.value)
  );
}

// ── Props ──────────────────────────────────────────────────────────────────────

interface ContactArrayEditorProps {
  kind: 'phone' | 'email';
  value: PhoneEntry[] | EmailEntry[];
  onChange: (v: PhoneEntry[] | EmailEntry[]) => void;
  disabled?: boolean;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ContactArrayEditor({
  kind,
  value,
  onChange,
  disabled = false,
}: ContactArrayEditorProps) {
  const t = useTranslations('ess');

  // All hooks declared before any conditional returns (hooks-order guard)
  const rows = value as Array<{ value: string; primary: boolean }>;

  const addRow = () => {
    const updated = [...rows, { value: '', primary: false }];
    onChange(updated);
  };

  const removeRow = (idx: number) => {
    const updated = rows.filter((_, i) => i !== idx);
    onChange(updated);
  };

  const updateValue = (idx: number, val: string) => {
    const updated = rows.map((r, i) => (i === idx ? { ...r, value: val } : r));
    onChange(updated);
  };

  const setPrimary = (idx: number) => {
    // Unset all primaries, then set idx
    const updated = rows.map((r, i) => ({ ...r, primary: i === idx }));
    onChange(updated);
  };

  const isRemoveDisabled = (idx: number): boolean => {
    // Can't remove if only one row
    if (rows.length <= 1) return true;
    // Can't remove the last primary
    const isPrimary = rows[idx].primary;
    const primaryCount = rows.filter((r) => r.primary).length;
    return isPrimary && primaryCount <= 1;
  };

  const validateRow = (val: string): string | undefined => {
    if (!val) return t('validation.required');
    if (kind === 'phone' && !PHONE_REGEX.test(val)) return t('validation.invalidPhone');
    if (kind === 'email' && !EMAIL_REGEX.test(val)) return t('validation.invalidEmail');
    return undefined;
  };

  const addLabel = kind === 'phone' ? t('contact.addPhone') : t('contact.addEmail');
  const inputType = kind === 'email' ? 'email' : 'tel';

  return (
    <div className="flex flex-col gap-3">
      {rows.map((row, idx) => {
        const rowError = row.value ? validateRow(row.value) : undefined;
        return (
          <div
            key={idx}
            className="flex items-start gap-2"
          >
            {/* Primary radio */}
            <div className="flex flex-col items-center gap-1 pt-6 shrink-0">
              <input
                type="radio"
                name={`${kind}-primary-group-${idx}`}
                aria-label={t('contact.primary')}
                checked={row.primary}
                onChange={() => setPrimary(idx)}
                disabled={disabled}
                className="h-4 w-4 accent-[var(--color-accent)] cursor-pointer disabled:cursor-not-allowed"
              />
            </div>

            {/* Value input */}
            <div className="flex-1 min-w-0">
              <FormField
                label={
                  <>
                    {kind === 'phone' ? t('contact.addPhone').replace('เพิ่ม', '') : t('contact.addEmail').replace('เพิ่ม', '')}
                    {row.primary && (
                      <span className="ml-2 text-xs text-accent font-medium">
                        ({t('contact.primary')})
                      </span>
                    )}
                  </>
                }
                error={rowError}
              >
                {(controlProps) => (
                  <input
                    {...controlProps}
                    type={inputType}
                    value={row.value}
                    onChange={(e) => updateValue(idx, e.target.value)}
                    disabled={disabled}
                    className={cn(
                      'w-full rounded-md border px-3 py-2 text-body text-ink',
                      'bg-canvas-soft placeholder:text-ink-muted',
                      'transition-[border-color,box-shadow] duration-[var(--dur-fast)]',
                      'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      rowError ? 'border-danger' : 'border-hairline hover:border-accent'
                    )}
                  />
                )}
              </FormField>
            </div>

            {/* Remove button */}
            <div className="pt-6 shrink-0">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label={`ลบรายการที่ ${idx + 1}`}
                disabled={disabled || isRemoveDisabled(idx)}
                onClick={() => removeRow(idx)}
                className="text-danger hover:text-danger hover:bg-danger/10"
              >
                <Trash2 size={16} aria-hidden />
              </Button>
            </div>
          </div>
        );
      })}

      {/* Add button */}
      {!disabled && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={addRow}
          className="self-start"
        >
          <Plus size={16} aria-hidden />
          {addLabel}
        </Button>
      )}
    </div>
  );
}

ContactArrayEditor.displayName = 'ContactArrayEditor';

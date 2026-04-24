'use client';

// T2a-v2: EmergencyContactList — multi-row emergency contact editor.
// Each row: name + relation dropdown + phones[] (via ContactArrayEditor) + remove button.
// Stable row id via crypto.randomUUID() on add.

import { useTranslations } from 'next-intl';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/humi';
import { FormField } from '@/components/humi';
import { cn } from '@/lib/utils';
import { ContactArrayEditor } from './ContactArrayEditor';
import type { EmergencyContactRow, PhoneEntry } from '@/stores/humi-profile-slice';

// ── Relation options ───────────────────────────────────────────────────────────

const RELATION_OPTIONS = [
  'บิดา',
  'มารดา',
  'คู่สมรส',
  'บุตร',
  'พี่น้อง',
  'อื่นๆ',
] as const;

// ── Validation helpers (exported for /profile/me save-button enable) ───────────

export function isRowValid(row: EmergencyContactRow): boolean {
  if (!row.name.trim()) return false;
  if (!row.relation) return false;
  if (row.phones.length === 0) return false;
  return row.phones.every((p) => /^\+?\d{9,10}$/.test(p));
}

export function areAllRowsValid(rows: EmergencyContactRow[]): boolean {
  if (rows.length === 0) return true; // no rows = optional section, valid
  return rows.every(isRowValid);
}

// ── Props ──────────────────────────────────────────────────────────────────────

interface EmergencyContactListProps {
  value: EmergencyContactRow[];
  onChange: (rows: EmergencyContactRow[]) => void;
  disabled?: boolean;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function EmergencyContactList({
  value,
  onChange,
  disabled = false,
}: EmergencyContactListProps) {
  // All hooks declared before any conditional returns (hooks-order guard)
  const t = useTranslations('ess');

  const addRow = () => {
    const newRow: EmergencyContactRow = {
      id: crypto.randomUUID(),
      name: '',
      relation: '',
      phones: [],
    };
    onChange([...value, newRow]);
  };

  const removeRow = (id: string) => {
    onChange(value.filter((r) => r.id !== id));
  };

  const updateRow = (id: string, patch: Partial<EmergencyContactRow>) => {
    onChange(value.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const updatePhones = (id: string, phones: PhoneEntry[]) => {
    updateRow(id, { phones: phones.map((p) => p.value) });
  };

  // Convert flat string[] phones → PhoneEntry[] for ContactArrayEditor
  const toPhoneEntries = (phones: string[]): PhoneEntry[] => {
    if (phones.length === 0) return [{ value: '', primary: true }];
    return phones.map((p, i) => ({ value: p, primary: i === 0 }));
  };

  return (
    <div className="flex flex-col gap-4">
      {value.length === 0 && (
        <p className="text-small text-ink-muted py-2">
          {/* No rows yet — handled gracefully */}
          {disabled ? '—' : ''}
        </p>
      )}

      {value.map((row, rowIdx) => (
        <div
          key={row.id}
          className={cn(
            'rounded-[var(--radius-md)] border border-hairline bg-canvas-soft',
            'p-4 flex flex-col gap-4'
          )}
        >
          {/* Row header */}
          <div className="flex items-center justify-between">
            <span className="text-small font-semibold text-ink">
              {`${t('emergencyContact.add').replace('เพิ่ม', 'ผู้ติดต่อ')} ${rowIdx + 1}`}
            </span>
            {!disabled && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label={`ลบผู้ติดต่อที่ ${rowIdx + 1}`}
                onClick={() => removeRow(row.id)}
                className="text-danger hover:text-danger hover:bg-danger/10"
              >
                <Trash2 size={16} aria-hidden />
              </Button>
            )}
          </div>

          {/* Name + Relation row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Name */}
            <FormField
              label={t('emergencyContact.name')}
              required
              error={!row.name.trim() && row.name !== '' ? t('validation.required') : undefined}
            >
              {(controlProps) => (
                <input
                  {...controlProps}
                  type="text"
                  value={row.name}
                  onChange={(e) => updateRow(row.id, { name: e.target.value })}
                  disabled={disabled}
                  placeholder={t('emergencyContact.name')}
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

            {/* Relation dropdown */}
            <FormField
              label={t('emergencyContact.relation')}
              required
            >
              {(controlProps) => (
                <select
                  {...controlProps}
                  value={row.relation}
                  onChange={(e) => updateRow(row.id, { relation: e.target.value })}
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
                  <option value="">— เลือกความสัมพันธ์ —</option>
                  {RELATION_OPTIONS.map((rel) => (
                    <option key={rel} value={rel}>
                      {rel}
                    </option>
                  ))}
                </select>
              )}
            </FormField>
          </div>

          {/* Phones sub-list via ContactArrayEditor */}
          <ContactArrayEditor
            kind="phone"
            value={toPhoneEntries(row.phones)}
            onChange={(entries) => updatePhones(row.id, entries as PhoneEntry[])}
            disabled={disabled}
          />
        </div>
      ))}

      {/* Add row button */}
      {!disabled && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={addRow}
          className="self-start"
        >
          <Plus size={16} aria-hidden />
          + {t('emergencyContact.add')}
        </Button>
      )}
    </div>
  );
}

EmergencyContactList.displayName = 'EmergencyContactList';

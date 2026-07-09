// STA-26 PR-A — consumed by PR-B (Exception), PR-D (Import), PR-G (Beneficiaries v2)
'use client';

import { useState } from 'react';
import { FormField, FormInput } from '@/components/humi/molecules/FormField';

export interface AsOfDatePickerProps {
  value: string;               // ISO yyyy-mm-dd
  onChange: (iso: string) => void;
  isTh: boolean;
  label?: string;              // override default
  helperText?: string;
  showBuddhistToggle?: boolean; // default true
}

/** Convert CE year to BE year (Thai Buddhist Era = CE + 543). */
function toBuddhistYear(iso: string): number | null {
  const match = iso.match(/^(\d{4})-/);
  if (!match) return null;
  return parseInt(match[1], 10) + 543;
}

/** Format ISO date for display in BE mode: "วันที่ 15 พฤษภาคม 2569" */
function beHelperText(iso: string, isTh: boolean): string {
  const beYear = toBuddhistYear(iso);
  if (!beYear) return '';
  const parts = iso.split('-');
  const ceYear = parts[0];
  if (isTh) {
    return `ปี พ.ศ. ${beYear} (ค.ศ. ${ceYear})`;
  }
  return `BE ${beYear} (CE ${ceYear})`;
}

export function AsOfDatePicker({
  value,
  onChange,
  isTh,
  label,
  helperText,
  showBuddhistToggle = true,
}: AsOfDatePickerProps) {
  const [beMode, setBeMode] = useState(false);

  const defaultLabel = isTh ? 'ดูข้อมูล ณ วันที่' : 'View as-of';
  const fieldLabel = label ?? defaultLabel;

  const derivedHelper =
    helperText ??
    (beMode && value ? beHelperText(value, isTh) : undefined);

  return (
    <div className="flex flex-col gap-2">
      <FormField
        label={fieldLabel}
        help={derivedHelper}
      >
        {(controlProps) => (
          <FormInput
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            {...controlProps}
          />
        )}
      </FormField>

      {showBuddhistToggle && (
        <label className="flex cursor-pointer items-center gap-2 text-small text-ink-muted select-none">
          <input
            type="checkbox"
            checked={beMode}
            onChange={(e) => setBeMode(e.target.checked)}
            className="h-4 w-4 rounded border-hairline accent-accent"
          />
          {isTh ? 'แสดงปี พ.ศ.' : 'Show Buddhist Era year'}
        </label>
      )}
    </div>
  );
}

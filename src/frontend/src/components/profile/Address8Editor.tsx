'use client';

// T2a-v2: Address8Editor — 8-field structured Thai address editor.
// T2a-v2: static inputs for province/district/subdistrict;
// live cascade from picklist pipeline is a separate task.

import { useTranslations } from 'next-intl';
import { FormField } from '@/components/humi';
import { cn } from '@/lib/utils';
import type { Address8 } from '@/stores/humi-profile-slice';

// ── Validation helper (exported for /profile/me save-button enable) ────────────

export function isAddress8Valid(v: Address8): boolean {
  return (
    v.houseNo.trim() !== '' &&
    v.subdistrict.trim() !== '' &&
    v.district.trim() !== '' &&
    v.province.trim() !== '' &&
    v.postalCode.trim() !== ''
  );
}

// ── Props ──────────────────────────────────────────────────────────────────────

interface Address8EditorProps {
  value: Address8;
  onChange: (v: Address8) => void;
  disabled?: boolean;
}

// ── Sub-component: single text input wired to Address8 field ──────────────────

function AddressInput({
  fieldKey,
  value,
  onChange,
  disabled,
  required,
  label,
  className,
}: {
  fieldKey: keyof Address8;
  value: string;
  onChange: (key: keyof Address8, val: string) => void;
  disabled: boolean;
  required?: boolean;
  label: React.ReactNode;
  className?: string;
}) {
  return (
    <FormField label={label} required={required} className={className}>
      {(controlProps) => (
        <input
          {...controlProps}
          type="text"
          value={value}
          onChange={(e) => onChange(fieldKey, e.target.value)}
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
  );
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Address8Editor({
  value,
  onChange,
  disabled = false,
}: Address8EditorProps) {
  // All hooks declared before any conditional returns (hooks-order guard)
  const t = useTranslations('ess');

  const handleChange = (key: keyof Address8, val: string) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1: houseNo (col-6) + village (col-6) */}
      <div className="grid grid-cols-2 gap-4">
        <AddressInput
          fieldKey="houseNo"
          value={value.houseNo}
          onChange={handleChange}
          disabled={disabled}
          required
          label={
            <>
              {t('address.houseNo')}
              <span aria-hidden className="ml-0.5 text-danger"> *</span>
            </>
          }
        />
        <AddressInput
          fieldKey="village"
          value={value.village}
          onChange={handleChange}
          disabled={disabled}
          label={t('address.village')}
        />
      </div>

      {/* Row 2: soi (col-6) + road (col-6) */}
      <div className="grid grid-cols-2 gap-4">
        <AddressInput
          fieldKey="soi"
          value={value.soi}
          onChange={handleChange}
          disabled={disabled}
          label={t('address.soi')}
        />
        <AddressInput
          fieldKey="road"
          value={value.road}
          onChange={handleChange}
          disabled={disabled}
          label={t('address.road')}
        />
      </div>

      {/* Row 3: subdistrict (col-4 required) + district (col-4 required) + province (col-4 required) */}
      <div className="grid grid-cols-3 gap-4">
        <AddressInput
          fieldKey="subdistrict"
          value={value.subdistrict}
          onChange={handleChange}
          disabled={disabled}
          required
          label={
            <>
              {t('address.subdistrict')}
              <span aria-hidden className="ml-0.5 text-danger"> *</span>
            </>
          }
        />
        <AddressInput
          fieldKey="district"
          value={value.district}
          onChange={handleChange}
          disabled={disabled}
          required
          label={
            <>
              {t('address.district')}
              <span aria-hidden className="ml-0.5 text-danger"> *</span>
            </>
          }
        />
        <AddressInput
          fieldKey="province"
          value={value.province}
          onChange={handleChange}
          disabled={disabled}
          required
          label={
            <>
              {t('address.province')}
              <span aria-hidden className="ml-0.5 text-danger"> *</span>
            </>
          }
        />
      </div>

      {/* Row 4: postalCode (required, col-6) */}
      <div className="grid grid-cols-2 gap-4">
        <AddressInput
          fieldKey="postalCode"
          value={value.postalCode}
          onChange={handleChange}
          disabled={disabled}
          required
          label={
            <>
              {t('address.postalCode')}
              <span aria-hidden className="ml-0.5 text-danger"> *</span>
            </>
          }
        />
      </div>
    </div>
  );
}

Address8Editor.displayName = 'Address8Editor';

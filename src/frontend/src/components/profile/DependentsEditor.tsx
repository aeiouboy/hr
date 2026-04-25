'use client';

// DependentsEditor — multi-row dependent editor for BRD #20.
// Pattern: mirrors EmergencyContactList (row-add/remove/validate).
// 9-field row: fullNameTh / fullNameEn / relation / dateOfBirth /
//              nationalId / idCopyFileId / hasInsurance / isCentralEmployee.

import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/humi';
import { FormField } from '@/components/humi';
import { FileUploadField } from '@/components/humi/FileUploadField';
import { cn } from '@/lib/utils';
import {
  DEPENDENT_RELATION_LABELS,
  type HumiDependent,
  type DependentRelation,
} from '@/lib/humi-mock-data';

// ── Validation helpers (exported for /profile/me save-button enable) ──────────

export function isDependentValid(dep: HumiDependent): boolean {
  if (!dep.fullNameTh.trim()) return false;
  if (!dep.relation) return false;
  if (!dep.dateOfBirth) return false;
  return true;
}

export function areAllDependentsValid(rows: HumiDependent[]): boolean {
  if (rows.length === 0) return true; // optional section
  return rows.every(isDependentValid);
}

// ── Props ──────────────────────────────────────────────────────────────────────

interface DependentsEditorProps {
  value: HumiDependent[];
  onChange: (rows: HumiDependent[]) => void;
  disabled?: boolean;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function DependentsEditor({
  value,
  onChange,
  disabled = false,
}: DependentsEditorProps) {
  const inputClass = cn(
    'w-full rounded-md border px-3 py-2 text-body text-ink',
    'bg-surface placeholder:text-ink-muted',
    'transition-[border-color,box-shadow] duration-[var(--dur-fast)]',
    'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'border-hairline hover:border-accent'
  );

  const addRow = () => {
    const newRow: HumiDependent = {
      id: crypto.randomUUID(),
      fullNameTh: '',
      fullNameEn: '',
      relation: 'other',
      dateOfBirth: '',
      nationalId: undefined,
      idCopyFileId: undefined,
      hasInsurance: false,
      isCentralEmployee: false,
    };
    onChange([...value, newRow]);
  };

  const removeRow = (id: string) => {
    onChange(value.filter((r) => r.id !== id));
  };

  const updateRow = (id: string, patch: Partial<HumiDependent>) => {
    onChange(value.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  return (
    <div className="flex flex-col gap-4">
      {value.length === 0 && !disabled && (
        <p className="text-small text-ink-muted py-2" />
      )}

      {value.map((dep, rowIdx) => (
        <div
          key={dep.id}
          className={cn(
            'rounded-[var(--radius-md)] border border-hairline bg-canvas-soft',
            'p-4 flex flex-col gap-4'
          )}
        >
          {/* Row header */}
          <div className="flex items-center justify-between">
            <span className="text-small font-semibold text-ink">
              {`ผู้อุปการะ ${rowIdx + 1}`}
            </span>
            {!disabled && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label={`ลบผู้อุปการะที่ ${rowIdx + 1}`}
                onClick={() => removeRow(dep.id)}
                className="text-danger hover:text-danger hover:bg-danger/10"
              >
                <Trash2 size={16} aria-hidden />
              </Button>
            )}
          </div>

          {/* ชื่อภาษาไทย + ภาษาอังกฤษ */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="ชื่อ-นามสกุล (ภาษาไทย)" required>
              {(controlProps) => (
                <input
                  {...controlProps}
                  type="text"
                  value={dep.fullNameTh}
                  onChange={(e) => updateRow(dep.id, { fullNameTh: e.target.value })}
                  disabled={disabled}
                  placeholder="ชื่อภาษาไทย"
                  className={inputClass}
                />
              )}
            </FormField>

            <FormField label="ชื่อ-นามสกุล (ภาษาอังกฤษ)">
              {(controlProps) => (
                <input
                  {...controlProps}
                  type="text"
                  value={dep.fullNameEn}
                  onChange={(e) => updateRow(dep.id, { fullNameEn: e.target.value })}
                  disabled={disabled}
                  placeholder="Full name in English"
                  className={inputClass}
                />
              )}
            </FormField>
          </div>

          {/* ความสัมพันธ์ + วันเกิด */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="ความสัมพันธ์" required>
              {(controlProps) => (
                <select
                  {...controlProps}
                  value={dep.relation}
                  onChange={(e) =>
                    updateRow(dep.id, { relation: e.target.value as DependentRelation })
                  }
                  disabled={disabled}
                  className={cn(inputClass, 'bg-surface')}
                >
                  <option value="">— เลือกความสัมพันธ์ —</option>
                  {(Object.entries(DEPENDENT_RELATION_LABELS) as [DependentRelation, string][]).map(
                    ([val, label]) => (
                      <option key={val} value={val}>
                        {label}
                      </option>
                    )
                  )}
                </select>
              )}
            </FormField>

            <FormField label="วันเกิด" required>
              {(controlProps) => (
                <input
                  {...controlProps}
                  type="date"
                  value={dep.dateOfBirth}
                  onChange={(e) => updateRow(dep.id, { dateOfBirth: e.target.value })}
                  disabled={disabled}
                  className={inputClass}
                />
              )}
            </FormField>
          </div>

          {/* เลขบัตรประชาชน */}
          <FormField label="เลขบัตรประชาชน">
            {(controlProps) => (
              <input
                {...controlProps}
                type="text"
                value={dep.nationalId ?? ''}
                onChange={(e) =>
                  updateRow(dep.id, { nationalId: e.target.value || undefined })
                }
                disabled={disabled}
                placeholder="x-xxxx-xxxxx-xx-x"
                className={inputClass}
              />
            )}
          </FormField>

          {/* สำเนาบัตร */}
          {!disabled && (
            <FileUploadField
              label="สำเนาบัตรประชาชน / ทะเบียนบ้าน"
              onUpload={(id) => updateRow(dep.id, { idCopyFileId: id })}
              onRemove={() => updateRow(dep.id, { idCopyFileId: undefined })}
            />
          )}

          {/* checkbox: ประกัน + พนักงานในเครือ */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-body text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={dep.hasInsurance}
                onChange={(e) => updateRow(dep.id, { hasInsurance: e.target.checked })}
                disabled={disabled}
                className="w-4 h-4 accent-[var(--color-accent)]"
              />
              ใช้สวัสดิการประกัน
            </label>
            <label className="flex items-center gap-2 text-body text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={dep.isCentralEmployee}
                onChange={(e) => updateRow(dep.id, { isCentralEmployee: e.target.checked })}
                disabled={disabled}
                className="w-4 h-4 accent-[var(--color-accent)]"
              />
              ทำงานในเครือ Central
            </label>
          </div>
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
          + เพิ่มผู้อุปการะ
        </Button>
      )}
    </div>
  );
}

DependentsEditor.displayName = 'DependentsEditor';

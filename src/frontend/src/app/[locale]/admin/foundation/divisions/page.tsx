'use client';

// admin/foundation/divisions/page.tsx — Division (Business Unit) list + new division form

import { useState } from 'react';
import { Building2, Plus, X, CheckCircle2 } from 'lucide-react';
import { useDivisions, type Division } from '@/hooks/use-foundation';

const COMPANY_OPTIONS = ['CEN', 'CRC', 'CU', 'CPN', 'ROBINSON'] as const;

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: 'var(--radius-sm, 4px)',
        fontSize: 11,
        fontWeight: 600,
        background: active ? 'var(--color-success-bg, #dcfce7)' : 'var(--color-canvas)',
        color: active ? 'var(--color-success-ink, #166534)' : 'var(--color-ink-muted)',
      }}
    >
      {active ? 'ใช้งาน' : 'ปิด'}
    </span>
  );
}

const EMPTY_FORM = { code: '', nameTh: '', nameEn: '', company: 'CEN' as Division['company'] };

export default function FoundationDivisionsPage() {
  const divisions = useDivisions();
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  function handleSave() {
    // mock-only: no real persistence
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setShowForm(false);
      setForm(EMPTY_FORM);
    }, 1800);
  }

  return (
    <div className="pb-8">
      <div className="humi-row" style={{ marginBottom: 20, alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="humi-eyebrow">Admin · EC Foundation</div>
          <h1 className="mt-1 font-display text-[24px] font-semibold text-ink">หน่วยธุรกิจ</h1>
          <p className="mt-1 text-small text-ink-soft">
            กลุ่มบริษัทและหน่วยธุรกิจระดับสูงสุด {divisions.length} รายการ
          </p>
        </div>
        <span className="humi-spacer" />
        <button
          type="button"
          className="humi-button humi-button--primary"
          onClick={() => { setShowForm(true); setSaved(false); }}
        >
          <Plus size={15} aria-hidden />
          หน่วยธุรกิจใหม่
        </button>
      </div>

      {/* New Division form */}
      {showForm && (
        <div
          className="humi-card"
          style={{ marginBottom: 20, border: '1.5px solid var(--color-accent)', padding: 20 }}
        >
          <div className="humi-row" style={{ marginBottom: 14 }}>
            <h2 className="font-display text-[16px] font-semibold text-ink">เพิ่มหน่วยธุรกิจใหม่</h2>
            <button
              type="button"
              className="humi-icon-btn"
              style={{ marginLeft: 'auto' }}
              aria-label="ปิดฟอร์ม"
              onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="humi-label">
              รหัสหน่วยธุรกิจ *
              <input
                className="humi-input"
                type="text"
                placeholder="เช่น CEN"
                value={form.code}
                onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
              />
            </label>
            <label className="humi-label">
              บริษัท
              <select
                className="humi-input"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value as Division['company'] }))}
              >
                {COMPANY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="humi-label">
              ชื่อ (TH) *
              <input
                className="humi-input"
                type="text"
                placeholder="เช่น เซ็นทรัล กรุ๊ป"
                value={form.nameTh}
                onChange={(e) => setForm((f) => ({ ...f, nameTh: e.target.value }))}
              />
            </label>
            <label className="humi-label">
              ชื่อ (EN)
              <input
                className="humi-input"
                type="text"
                placeholder="e.g. Central Group"
                value={form.nameEn}
                onChange={(e) => setForm((f) => ({ ...f, nameEn: e.target.value }))}
              />
            </label>
          </div>

          <div className="humi-row" style={{ marginTop: 16, gap: 8 }}>
            {saved ? (
              <span className="humi-row" style={{ gap: 6, color: 'var(--color-success-ink, #166534)', fontSize: 13 }}>
                <CheckCircle2 size={16} aria-hidden />
                บันทึกแล้ว (mockup)
              </span>
            ) : (
              <button
                type="button"
                className="humi-button humi-button--primary"
                disabled={!form.code.trim() || !form.nameTh.trim()}
                onClick={handleSave}
              >
                บันทึก
              </button>
            )}
            <button
              type="button"
              className="humi-button humi-button--ghost"
              onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      {/* Division list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {divisions.map((div) => (
          <div
            key={div.id}
            className="humi-card"
            style={{ padding: '14px 18px' }}
          >
            <div className="humi-row" style={{ gap: 14, flexWrap: 'wrap' }}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Building2 size={18} aria-hidden />
              </div>
              <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                <div className="humi-row" style={{ gap: 8, flexWrap: 'wrap' }}>
                  <span className="font-display text-[15px] font-semibold text-ink">
                    {div.nameTh}
                  </span>
                  <span className="humi-tag" style={{ fontSize: 10 }}>{div.code}</span>
                  <StatusBadge active={div.active} />
                </div>
                <div className="text-small" style={{ color: 'var(--color-ink-muted)', marginTop: 2 }}>
                  {div.nameEn}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-1" style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                <div>
                  <div className="humi-eyebrow" style={{ fontSize: 9 }}>พนักงาน</div>
                  <div className="font-medium text-ink">{div.headCount.toLocaleString('th-TH')}</div>
                </div>
                <div>
                  <div className="humi-eyebrow" style={{ fontSize: 9 }}>แผนก</div>
                  <div className="font-medium text-ink">{div.deptCount.toLocaleString('th-TH')}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

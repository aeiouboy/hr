'use client';

// ════════════════════════════════════════════════════════════
// /me/documents — ESS document library  BRD #173
// ════════════════════════════════════════════════════════════

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Download, FileText, Filter } from 'lucide-react';
import { HUMI_HR_DOCS, HR_DOC_TYPE_LABELS, type HrDocType, type HumiHrDoc } from '@/lib/humi-mock-data';
import { formatDate } from '@/lib/date';

type FilterValue = 'all' | HrDocType;

const FILTER_OPTIONS: Array<{ value: FilterValue; label: string }> = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'employment-letter', label: HR_DOC_TYPE_LABELS['employment-letter'] },
  { value: 'income-cert', label: HR_DOC_TYPE_LABELS['income-cert'] },
  { value: 'tax-form', label: HR_DOC_TYPE_LABELS['tax-form'] },
  { value: 'payslip-archive', label: HR_DOC_TYPE_LABELS['payslip-archive'] },
];

export default function MeDocumentsPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'th';
  const [filter, setFilter] = useState<FilterValue>('all');

  const filtered: HumiHrDoc[] = filter === 'all'
    ? HUMI_HR_DOCS
    : HUMI_HR_DOCS.filter((d) => d.type === filter);

  return (
    <div data-testid="me-documents-page" style={{ padding: '24px 28px', maxWidth: 960, margin: '0 auto' }}>
      <header style={{ marginBottom: 24 }}>
        <h1
          className="font-display"
          style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-ink)', marginBottom: 6 }}
        >
          เอกสารส่วนบุคคล
        </h1>
        <p style={{ fontSize: 14, color: 'var(--color-ink-muted)' }}>
          ดูและดาวน์โหลดเอกสารส่วนบุคคลของคุณ
        </p>
      </header>

      {/* ── Filter ──────────────────────────────────────────────── */}
      <div
        className="humi-row"
        data-testid="docs-filter"
        style={{ gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Filter size={16} aria-hidden style={{ color: 'var(--color-ink-muted)' }} />
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setFilter(opt.value)}
            data-testid={`docs-filter-${opt.value}`}
            className="humi-tag"
            style={{
              cursor: 'pointer',
              background: filter === opt.value ? 'var(--color-accent-soft)' : 'transparent',
              color: filter === opt.value ? 'var(--color-accent)' : 'var(--color-ink)',
              border: '1px solid var(--color-ink-soft)',
              padding: '6px 12px',
              fontSize: 13,
              borderRadius: 999,
            }}
            aria-pressed={filter === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── Document list / empty state ─────────────────────────── */}
      {filtered.length === 0 ? (
        <div
          data-testid="docs-empty"
          className="humi-card"
          style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--color-ink-muted)' }}
        >
          <FileText
            size={36}
            aria-hidden
            style={{ margin: '0 auto 12px', opacity: 0.4, display: 'block' }}
          />
          <p>ไม่พบเอกสาร</p>
        </div>
      ) : (
        <div data-testid="docs-list" className="humi-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr
                style={{
                  background: 'var(--color-surface-muted)',
                  fontSize: 12,
                  color: 'var(--color-ink-muted)',
                }}
              >
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>ชื่อเอกสาร</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>ประเภท</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>วันที่ออก</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>ดาวน์โหลด</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => (
                <tr
                  key={doc.id}
                  data-testid={`doc-row-${doc.id}`}
                  style={{ borderTop: '1px solid var(--color-ink-faint)' }}
                >
                  <td style={{ padding: '12px 14px', fontSize: 14 }}>{doc.name}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: 'var(--color-ink-muted)' }}>
                    {HR_DOC_TYPE_LABELS[doc.type]}
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: 'var(--color-ink-muted)' }}>
                    {formatDate(doc.issuedDate, 'medium', 'th')}
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <a
                      href={doc.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`doc-download-${doc.id}`}
                      className="humi-row"
                      style={{
                        gap: 4,
                        fontSize: 13,
                        color: 'var(--color-accent)',
                        justifyContent: 'flex-end',
                        textDecoration: 'none',
                      }}
                    >
                      <Download size={14} aria-hidden />
                      ดาวน์โหลด
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

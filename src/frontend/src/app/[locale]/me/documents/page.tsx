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
    <div data-testid="me-documents-page" className="max-w-3xl mx-auto px-7 py-6">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink mb-1.5">
          เอกสารส่วนบุคคล
        </h1>
        <p className="text-sm text-ink-muted">
          ดูและดาวน์โหลดเอกสารส่วนบุคคลของคุณ
        </p>
      </header>

      {/* ── Filter ──────────────────────────────────────────────── */}
      <div
        className="flex flex-wrap gap-2 mb-5 items-center"
        data-testid="docs-filter"
      >
        <Filter size={16} aria-hidden className="text-ink-muted" />
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setFilter(opt.value)}
            data-testid={`docs-filter-${opt.value}`}
            className={`humi-tag cursor-pointer${filter === opt.value ? ' humi-tag--accent' : ''}`}
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
          className="humi-card p-12 text-center text-ink-muted"
        >
          <FileText size={36} aria-hidden className="mx-auto mb-3 opacity-40 block" />
          <p>ไม่พบเอกสาร</p>
        </div>
      ) : (
        <div data-testid="docs-list" className="humi-card overflow-hidden p-0">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-muted text-xs text-ink-muted">
                <th className="px-3.5 py-2.5 text-left font-semibold">ชื่อเอกสาร</th>
                <th className="px-3.5 py-2.5 text-left font-semibold">ประเภท</th>
                <th className="px-3.5 py-2.5 text-left font-semibold">วันที่ออก</th>
                <th className="px-3.5 py-2.5 text-right font-semibold">ดาวน์โหลด</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => (
                <tr
                  key={doc.id}
                  data-testid={`doc-row-${doc.id}`}
                  className="border-t border-ink-faint"
                >
                  <td className="px-3.5 py-3 text-sm">{doc.name}</td>
                  <td className="px-3.5 py-3 text-xs text-ink-muted">
                    {HR_DOC_TYPE_LABELS[doc.type]}
                  </td>
                  <td className="px-3.5 py-3 text-xs text-ink-muted">
                    {formatDate(doc.issuedDate, 'medium', 'th')}
                  </td>
                  <td className="px-3.5 py-3 text-right">
                    <a
                      href={doc.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`doc-download-${doc.id}`}
                      className="humi-row gap-1 text-xs text-accent justify-end no-underline"
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

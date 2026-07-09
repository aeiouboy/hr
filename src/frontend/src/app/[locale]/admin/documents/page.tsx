'use client';

// ════════════════════════════════════════════════════════════
// /admin/documents — HR Admin document request queue
// Pending requests + status filter + bulk-print mock
// ════════════════════════════════════════════════════════════

import { useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FileText, Printer, Filter, Clock, CheckCircle, PackageCheck, Send } from 'lucide-react';
import { Button } from '@/components/humi';
import { useToast } from '@/components/humi/molecules/toast';
import { LetterGenerator } from '@/components/documents/letter-generator';
import {
  DOCUMENT_TEMPLATES,
  MOCK_DOC_REQUESTS,
  type DocRequestStatus,
  type DocRequest,
} from '@/data/documents/templates';

type FilterValue = 'all' | DocRequestStatus;

const FILTER_OPTIONS: Array<{ value: FilterValue; labelTh: string; labelEn: string }> = [
  { value: 'all',        labelTh: 'ทั้งหมด',       labelEn: 'All'        },
  { value: 'pending',    labelTh: 'รอดำเนินการ',   labelEn: 'Pending'    },
  { value: 'processing', labelTh: 'กำลังดำเนินการ', labelEn: 'Processing' },
  { value: 'ready',      labelTh: 'พร้อมส่ง',      labelEn: 'Ready'      },
  { value: 'delivered',  labelTh: 'ส่งแล้ว',       labelEn: 'Delivered'  },
];

const STATUS_STYLE: Record<DocRequestStatus, string> = {
  pending:    'bg-amber-50 text-amber-700 border border-amber-200',
  processing: 'bg-accent-soft text-accent-ink border border-accent-soft',
  ready:      'bg-green-50 text-green-700 border border-green-200',
  delivered:  'bg-canvas-soft text-ink-muted border border-hairline',
};

const STATUS_ICONS: Record<DocRequestStatus, React.ReactNode> = {
  pending:    <Clock size={13} aria-hidden />,
  processing: <FileText size={13} aria-hidden />,
  ready:      <PackageCheck size={13} aria-hidden />,
  delivered:  <Send size={13} aria-hidden />,
};

function templateName(templateId: string, locale: string): string {
  const tpl = DOCUMENT_TEMPLATES.find((t) => t.id === templateId);
  if (!tpl) return templateId;
  return locale === 'th' ? tpl.nameTh : tpl.nameEn;
}

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function DeliveryBadge({ mode, locale }: { mode: string; locale: string }) {
  const label = mode === 'email'
    ? (locale === 'th' ? 'อีเมล' : 'Email')
    : (locale === 'th' ? 'รับที่ HR' : 'Print Pickup');
  return (
    <span className="inline-flex items-center rounded-full border border-hairline bg-surface px-2 py-0.5 text-xs text-ink-muted">
      {label}
    </span>
  );
}

export default function AdminDocumentsPage() {
  const locale = useLocale();
  const t = useTranslations('doc_request');
  const { toast } = useToast();

  const [view, setView] = useState<'queue' | 'generate'>('queue');
  const [filter, setFilter] = useState<FilterValue>('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo<DocRequest[]>(
    () =>
      filter === 'all'
        ? MOCK_DOC_REQUESTS
        : MOCK_DOC_REQUESTS.filter((r) => r.status === filter),
    [filter],
  );

  const pendingCount = MOCK_DOC_REQUESTS.filter((r) => r.status === 'pending').length;
  const printableSelected = filtered.filter(
    (r) => selected.has(r.id) && r.deliveryMode === 'print_pickup',
  );

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((r) => r.id)));
    }
  }

  function handleBulkPrint() {
    const count = printableSelected.length;
    if (count === 0) {
      toast('warning', locale === 'th' ? 'เลือกคำขอแบบรับที่ HR ก่อน' : 'Select print-pickup requests first');
      return;
    }
    toast('success', locale === 'th' ? `กำลังพิมพ์เอกสาร ${count} รายการ` : `Printing ${count} document(s)`);
    setSelected(new Set());
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex-1">
          <h1 className="font-display text-2xl font-semibold text-ink">
            {t('adminTitle')}
          </h1>
          <p className="text-sm text-ink-muted mt-1">{t('adminSubtitle')}</p>
          <p className="mt-2 max-w-2xl text-small text-ink-muted" data-testid="document-boundary-notice">
            {t('generateNote')}
          </p>
        </div>
        {view === 'queue' && pendingCount > 0 && (
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-2 text-small font-semibold text-white">
            {pendingCount}
          </span>
        )}
        {view === 'queue' && (
          <Button
            variant="secondary"
            leadingIcon={<Printer size={15} />}
            onClick={handleBulkPrint}
            disabled={printableSelected.length === 0}
            data-testid="bulk-print-btn"
          >
            {locale === 'th'
              ? `พิมพ์${printableSelected.length > 0 ? ` (${printableSelected.length})` : ''}`
              : `Print${printableSelected.length > 0 ? ` (${printableSelected.length})` : ''}`}
          </Button>
        )}
      </div>

      {/* View switcher: request queue ↔ generate-for-employee */}
      <div
        className="mb-5 inline-flex rounded-[var(--radius-md)] border border-hairline bg-surface p-1"
        role="tablist"
        aria-label={t('viewSwitchLabel')}
        data-testid="docs-view-switch"
      >
        <button
          type="button"
          role="tab"
          aria-selected={view === 'queue'}
          onClick={() => setView('queue')}
          data-testid="docs-view-queue"
          className={`rounded-[var(--radius-sm)] px-4 py-1.5 text-sm font-medium transition-colors ${
            view === 'queue' ? 'bg-accent-soft text-accent-ink' : 'text-ink-muted hover:text-ink'
          }`}
        >
          {t('viewQueue')}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === 'generate'}
          onClick={() => setView('generate')}
          data-testid="docs-view-generate"
          className={`rounded-[var(--radius-sm)] px-4 py-1.5 text-sm font-medium transition-colors ${
            view === 'generate' ? 'bg-accent-soft text-accent-ink' : 'text-ink-muted hover:text-ink'
          }`}
        >
          {t('viewGenerate')}
        </button>
      </div>

      {view === 'generate' ? (
        <LetterGenerator />
      ) : (
      <>
      {/* Status filter */}
      <div className="mb-5 flex flex-wrap items-center gap-2" data-testid="status-filter">
        <Filter size={15} aria-hidden className="text-ink-muted" />
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => { setFilter(opt.value); setSelected(new Set()); }}
            data-testid={`filter-${opt.value}`}
            className={`humi-tag cursor-pointer${filter === opt.value ? ' humi-tag--accent' : ''}`}
            aria-pressed={filter === opt.value}
          >
            {locale === 'th' ? opt.labelTh : opt.labelEn}
          </button>
        ))}
      </div>

      {/* Queue table */}
      {filtered.length === 0 ? (
        <div
          data-testid="admin-docs-empty"
          className="humi-card p-12 text-center text-ink-muted"
        >
          <CheckCircle size={36} aria-hidden className="mx-auto mb-3 opacity-30 block" />
          <p>{locale === 'th' ? 'ไม่มีคำขอในหมวดนี้' : 'No requests in this category'}</p>
        </div>
      ) : (
        <div className="humi-card overflow-hidden p-0">
          <table className="w-full border-collapse" data-testid="admin-docs-table">
            <thead>
              <tr className="bg-surface-muted text-xs text-ink-muted">
                <th className="px-3.5 py-2.5 text-left">
                  <input
                    type="checkbox"
                    aria-label={locale === 'th' ? 'เลือกทั้งหมด' : 'Select all'}
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="cursor-pointer"
                    data-testid="select-all-checkbox"
                  />
                </th>
                <th className="px-3.5 py-2.5 text-left font-semibold">
                  {locale === 'th' ? 'รหัสคำขอ' : 'Request ID'}
                </th>
                <th className="px-3.5 py-2.5 text-left font-semibold">
                  {locale === 'th' ? 'พนักงาน' : 'Employee'}
                </th>
                <th className="px-3.5 py-2.5 text-left font-semibold">
                  {locale === 'th' ? 'ประเภทเอกสาร' : 'Document Type'}
                </th>
                <th className="px-3.5 py-2.5 text-left font-semibold">
                  {locale === 'th' ? 'วัตถุประสงค์' : 'Purpose'}
                </th>
                <th className="px-3.5 py-2.5 text-left font-semibold">
                  {locale === 'th' ? 'การส่ง' : 'Delivery'}
                </th>
                <th className="px-3.5 py-2.5 text-left font-semibold">
                  {locale === 'th' ? 'วันที่ยื่น' : 'Submitted'}
                </th>
                <th className="px-3.5 py-2.5 text-left font-semibold">
                  {locale === 'th' ? 'สถานะ' : 'Status'}
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((req) => (
                <tr
                  key={req.id}
                  data-testid={`doc-req-row-${req.id}`}
                  className="border-t border-ink-faint"
                >
                  <td className="px-3.5 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(req.id)}
                      onChange={() => toggleSelect(req.id)}
                      aria-label={`${locale === 'th' ? 'เลือก' : 'Select'} ${req.id}`}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="px-3.5 py-3 text-xs font-mono text-ink-muted">{req.id}</td>
                  <td className="px-3.5 py-3">
                    <div className="text-sm font-medium text-ink">{req.employeeName}</div>
                    <div className="text-xs text-ink-muted">{req.employeeDept}</div>
                  </td>
                  <td className="px-3.5 py-3 text-sm text-ink">
                    {templateName(req.templateId, locale)}
                  </td>
                  <td className="px-3.5 py-3 text-xs text-ink-muted max-w-[180px] truncate" title={req.purpose}>
                    {req.purpose}
                  </td>
                  <td className="px-3.5 py-3">
                    <DeliveryBadge mode={req.deliveryMode} locale={locale} />
                  </td>
                  <td className="px-3.5 py-3 text-xs text-ink-muted whitespace-nowrap">
                    {formatDate(req.submittedAt, locale)}
                  </td>
                  <td className="px-3.5 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[req.status]}`}
                    >
                      {STATUS_ICONS[req.status]}
                      {FILTER_OPTIONS.find((f) => f.value === req.status)?.[locale === 'th' ? 'labelTh' : 'labelEn'] ?? req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </>
      )}
    </div>
  );
}

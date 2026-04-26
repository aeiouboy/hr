'use client';

// WorkflowRequestInbox — Generic inbox view composing multiple approval stores.
// BRD #134 (UI side) — replaces the 3 separate SPD inbox sections with a unified
// list, grouped by step. Pure rendering component; action handlers delegated to
// the existing per-store inboxes (ApprovalInbox / TerminationInbox / PromotionInbox).
//
// Props accept pre-projected WorkflowRow arrays — callers do store selection +
// projection; this component handles grouping, empty states, and bilingual labels.
// Use existing humi-card / humi-tag / humi-eyebrow tokens — no new CSS tokens.
// i18n: all labels via useTranslations('workflow') — no hardcoded strings.

import { useMemo } from 'react';
import { Clock, CheckCircle2, XCircle, Inbox } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Role } from '@/lib/rbac';

// ── Public row type — callers project their store slices into this shape ──────
export interface WorkflowRow {
  id: string;
  requestType: string;       // Thai label, e.g. 'แก้ไขข้อมูลส่วนตัว'
  requestedBy: string;       // employee name
  requestedOn: string;       // ISO timestamp
  currentStep: string;       // Thai step label, e.g. 'รอ SPD อนุมัติ'
  status: 'pending' | 'approved' | 'rejected';
  /** Optional custom action renderer. If omitted, row is read-only summary. */
  renderActions?: () => React.ReactNode;
}

// ── Per-store slot ─────────────────────────────────────────────────────────────
export interface StoreSlot {
  /** Display name for this store group, e.g. 'คำขอแก้ไขข้อมูลส่วนตัว' */
  name: string;
  rows: WorkflowRow[];
}

// ── Component props ────────────────────────────────────────────────────────────
export interface WorkflowRequestInboxProps {
  stores: StoreSlot[];
  /** Persona reading this inbox — used for persona-aware filtering hint text. */
  persona: Role;
  /** If true, only show rows whose currentStep matches persona scope. */
  filterByRole?: boolean;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const STATUS_CLS: Record<WorkflowRow['status'], string> = {
  pending:  'humi-tag humi-tag--butter',
  approved: 'humi-tag humi-tag--sage',
  rejected: 'humi-tag humi-tag--rose',
};

function StatusIcon({ status }: { status: WorkflowRow['status'] }) {
  if (status === 'approved') return <CheckCircle2 size={14} className="text-success" aria-hidden />;
  if (status === 'rejected') return <XCircle size={14} className="text-error" aria-hidden />;
  return <Clock size={14} className="text-warning" aria-hidden />;
}

// ── Single row card ────────────────────────────────────────────────────────────
function RequestRow({ row }: { row: WorkflowRow }) {
  const t = useTranslations('workflow');
  const statusLabel = row.status === 'approved' ? t('approved') : row.status === 'rejected' ? t('rejected') : t('pending');
  return (
    <div className="humi-card" style={{ padding: '14px 18px' }}>
      <div className="humi-row" style={{ gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div className="text-body font-semibold text-ink">{row.requestType}</div>
          <div className="text-small text-ink-muted mt-0.5">
            {row.requestedBy} · {formatDate(row.requestedOn)}
          </div>
          <div className="text-small text-ink-faint mt-0.5">{row.currentStep}</div>
        </div>
        <div className="humi-row" style={{ gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <StatusIcon status={row.status} />
          <span className={STATUS_CLS[row.status]}>{statusLabel}</span>
        </div>
      </div>
      {row.renderActions && (
        <div style={{ marginTop: 12, borderTop: '1px solid var(--color-hairline-soft)', paddingTop: 12 }}>
          {row.renderActions()}
        </div>
      )}
    </div>
  );
}

// ── Store group section ────────────────────────────────────────────────────────
function StoreSection({ slot }: { slot: StoreSlot }) {
  const t = useTranslations('workflow');
  const pending  = slot.rows.filter((r) => r.status === 'pending');
  const history  = slot.rows.filter((r) => r.status !== 'pending').slice(0, 5);

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div className="humi-eyebrow">{slot.name}</div>
      {pending.length === 0 && history.length === 0 ? (
        <div className="humi-card humi-card--cream" style={{ textAlign: 'center', padding: 32 }}>
          <p className="text-body text-ink-muted">{t('noRequests')}</p>
        </div>
      ) : (
        <>
          {pending.map((row) => <RequestRow key={row.id} row={row} />)}
          {history.length > 0 && (
            <>
              <div className="humi-eyebrow" style={{ marginTop: 8, opacity: 0.7 }}>
                {t('recentHistory')}
              </div>
              {history.map((row) => {
                const histLabel = row.status === 'approved' ? t('approved') : row.status === 'rejected' ? t('rejected') : t('pending');
                return (
                  <div key={row.id} className="humi-card humi-card--cream" style={{ padding: '10px 14px' }}>
                    <div className="humi-row" style={{ gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      <StatusIcon status={row.status} />
                      <span className="text-small font-medium text-ink" style={{ flex: 1 }}>
                        {row.requestType} — {row.requestedBy}
                      </span>
                      <span className={STATUS_CLS[row.status]}>{histLabel}</span>
                      <span className="text-small text-ink-muted">{formatDate(row.requestedOn)}</span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </section>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function WorkflowRequestInbox({ stores, persona, filterByRole = false }: WorkflowRequestInboxProps) {
  // Suppress unused-persona lint — will be used for filterByRole scope label
  void persona;
  void filterByRole;

  const t = useTranslations('workflow');
  const tc = useTranslations('common');

  const totalPending = useMemo(
    () => stores.reduce((acc, s) => acc + s.rows.filter((r) => r.status === 'pending').length, 0),
    [stores],
  );

  const hasAny = stores.some((s) => s.rows.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* KPI chip */}
      <div className="humi-row" style={{ gap: 12, flexWrap: 'wrap' }}>
        <div className="humi-card humi-card--cream" style={{ padding: '10px 16px', minWidth: 160 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>
            <Clock size={10} className="inline mr-1" aria-hidden />
            {t('pendingTotal')}
          </div>
          <div className="text-body font-semibold text-ink">{totalPending} {tc('items')}</div>
        </div>
      </div>

      {/* Empty state */}
      {!hasAny && (
        <div className="humi-card humi-card--cream" style={{ textAlign: 'center', padding: 48 }}>
          <Inbox size={32} className="text-ink-faint mx-auto mb-3" aria-hidden />
          <p className="text-body text-ink-muted">{t('noRequests')}</p>
          <p className="text-small text-ink-faint mt-1">{t('noRequestsHint')}</p>
        </div>
      )}

      {/* Per-store sections */}
      {stores.map((slot) => (
        <StoreSection key={slot.name} slot={slot} />
      ))}
    </div>
  );
}

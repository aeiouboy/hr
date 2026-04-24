'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useHumiProfileStore, type SectionKey } from '@/stores/humi-profile-slice';
import { ChangeRequestCard } from '@/components/admin/change-requests/ChangeRequestCard';
import { ReasonModal } from '@/components/admin/change-requests/ReasonModal';

// ════════════════════════════════════════════════════════════
// /admin/change-requests — HR admin approver queue.
// Groups pending profile-data CRs by sectionKey, shows history.
// Uses humi-profile-slice exclusively (C7 SSoT vs use-workflows
// and workflow-approvals which own leave/OT domain).
// ════════════════════════════════════════════════════════════

const SECTION_ORDER: SectionKey[] = ['personal', 'contact', 'address', 'emergencyContact', 'bank'];

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function ChangeRequestsPage() {
  const t = useTranslations();

  const [modalState, setModalState] = useState<{
    open: boolean;
    mode: 'approve' | 'reject';
    changeId: string | null;
  }>({ open: false, mode: 'approve', changeId: null });

  const pendingChanges = useHumiProfileStore((s) => s.pendingChanges);
  const attachments = useHumiProfileStore((s) => s.attachments);

  // Group pending CRs by sectionKey; items without sectionKey fall into 'personal'
  const grouped = useMemo(() => {
    const pending = pendingChanges.filter((pc) => pc.status === 'pending');
    const groups: Record<SectionKey, typeof pending> = {
      emergencyContact: [],
      address: [],
      contact: [],
      bank: [],
      personal: [],
    };
    pending.forEach((pc) => {
      const key = pc.sectionKey ?? 'personal';
      groups[key].push(pc);
    });
    return groups;
  }, [pendingChanges]);

  // History: last 20 approved/rejected, sorted newest first
  const history = useMemo(
    () =>
      pendingChanges
        .filter((pc) => pc.status !== 'pending')
        .sort((a, b) => (b.approvedAt ?? '').localeCompare(a.approvedAt ?? ''))
        .slice(0, 20),
    [pendingChanges]
  );

  const totalPending = SECTION_ORDER.reduce((sum, key) => sum + grouped[key].length, 0);

  const openModal = (mode: 'approve' | 'reject', changeId: string) =>
    setModalState({ open: true, mode, changeId });

  const closeModal = () =>
    setModalState({ open: false, mode: 'approve', changeId: null });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Page header */}
      <div className="mb-6 flex items-center gap-3">
        <h1 className="font-display text-[length:var(--text-display-h2)] font-semibold tracking-tight text-ink">
          {t('ess.approver.list.title')}
        </h1>
        {totalPending > 0 && (
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-2 text-small font-semibold text-white">
            {totalPending}
          </span>
        )}
      </div>

      {/* Pending groups */}
      {totalPending === 0 ? (
        <p className="py-12 text-center text-body text-ink-muted">
          {t('ess.approver.list.empty')}
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {SECTION_ORDER.map((sectionKey) => {
            const items = grouped[sectionKey];
            if (items.length === 0) return null;
            return (
              <section key={sectionKey}>
                <h2 className="mb-3 text-small font-semibold uppercase tracking-[0.1em] text-ink-muted">
                  {t(`ess.sections.${sectionKey}` as Parameters<typeof t>[0])}
                </h2>
                <div className="flex flex-col gap-3">
                  {items.map((cr) => (
                    <ChangeRequestCard
                      key={cr.id}
                      cr={cr}
                      attachments={attachments}
                      onApprove={(id) => openModal('approve', id)}
                      onReject={(id) => openModal('reject', id)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* History section */}
      {history.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-small font-semibold uppercase tracking-[0.1em] text-ink-muted">
            {t('ess.approver.list.history')}
          </h2>
          <div className="flex flex-col gap-2">
            {history.map((cr) => (
              <div
                key={cr.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-hairline bg-surface px-4 py-3"
              >
                <div className="flex flex-col gap-0.5">
                  <p className="text-small font-medium text-ink">
                    {cr.field}
                    {': '}
                    <span className="font-normal text-ink-muted">{cr.newValue}</span>
                  </p>
                  {cr.reason && (
                    <p className="text-small text-ink-muted">
                      {t('ess.approver.card.reason')}
                      {': '}
                      {cr.reason}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={
                      cr.status === 'approved'
                        ? 'inline-flex items-center rounded-full bg-accent-soft px-2.5 py-0.5 text-small font-medium text-accent'
                        : 'inline-flex items-center rounded-full bg-canvas-soft px-2.5 py-0.5 text-small font-medium text-ink-muted'
                    }
                  >
                    {cr.status === 'approved'
                      ? t('ess.approver.status.approved')
                      : t('ess.approver.status.rejected')}
                  </span>
                  {cr.approvedAt && (
                    <span className="text-small text-ink-muted">{formatDate(cr.approvedAt)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reason modal — rendered once at page level */}
      <ReasonModal
        open={modalState.open}
        mode={modalState.mode}
        changeId={modalState.changeId}
        onClose={closeModal}
      />
    </div>
  );
}

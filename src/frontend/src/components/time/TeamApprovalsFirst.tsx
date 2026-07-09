'use client';

// TeamApprovalsFirst — STA-255 (ticket 4.1). The Time-management page STARTS
// with the manager's approval / to-review action list: the top pending rows
// from the SAME live queue the /quick-approve umbrella renders
// (useSelectPendingApprovals — reactive over all approval stores), each row
// linking into the umbrella. Never a standalone approval surface — this is a
// springboard INTO /quick-approve (unified-inbox rule).

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ChevronRight, Inbox } from 'lucide-react';
import { Card } from '@/components/humi';
import { Badge } from '@/components/humi/atoms/badge';
import { useSelectPendingApprovals } from '@/lib/approval-registry';
import { formatDate } from '@/lib/date';

const LIST_CAP = 5;

const TYPE_LABEL: Record<string, { th: string; en: string }> = {
  leave: { th: 'ลา', en: 'Leave' },
  overtime: { th: 'โอที', en: 'Overtime' },
  time_correction: { th: 'แก้ไขเวลา', en: 'Time correction' },
  claim: { th: 'เบิกสวัสดิการ', en: 'Benefit claim' },
  transfer: { th: 'โยกย้าย', en: 'Transfer' },
  pay_rate: { th: 'ปรับค่าจ้าง', en: 'Pay rate' },
  termination: { th: 'พ้นสภาพ', en: 'Termination' },
  probation: { th: 'ทดลองงาน', en: 'Probation' },
  shift_assignment: { th: 'จัดกะ', en: 'Shift assign' },
  tax_planning: { th: 'ภาษี', en: 'Tax planning' },
};

export function TeamApprovalsFirst() {
  const locale = useLocale();
  const isTh = locale !== 'en';
  const queue = useSelectPendingApprovals();
  const shown = queue.slice(0, LIST_CAP);

  return (
    <section
      data-testid="team-approvals-first"
      aria-label={isTh ? 'รายการรออนุมัติ' : 'Pending approvals'}
    >
      <Card variant="raised" size="md">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-accent-soft text-accent"
                aria-hidden
              >
                <Inbox size={16} />
              </span>
              <h2 className="text-small font-semibold text-ink">
                {isTh ? 'รออนุมัติ / รอตรวจสอบ' : 'To approve / to review'}
                {queue.length > 0 && <span className="ml-1.5 text-ink-muted">({queue.length})</span>}
              </h2>
            </div>
            <Link
              href={`/${locale}/quick-approve`}
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline focus-visible:outline-none"
            >
              {isTh ? 'ดูทั้งหมด' : 'View all'}
              <ChevronRight size={13} aria-hidden />
            </Link>
          </div>

          {shown.length === 0 ? (
            <div className="py-3 text-xs text-ink-muted">
              {isTh ? 'ไม่มีรายการรออนุมัติ 🎉' : 'Nothing waiting for you 🎉'}
            </div>
          ) : (
            <ul className="divide-y divide-hairline">
              {shown.map((q) => {
                const r = q.row;
                const t = TYPE_LABEL[r.type] ?? { th: r.type, en: r.type };
                return (
                  <li key={r.id}>
                    <Link
                      href={`/${locale}/quick-approve`}
                      data-testid={`approval-row-${r.id}`}
                      className="flex items-center justify-between gap-3 py-2.5 transition-colors hover:bg-canvas-soft focus-visible:outline-none"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <Badge variant="info">{isTh ? t.th : t.en}</Badge>
                          <span className="truncate text-small font-medium text-ink">
                            {r.requester.name}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-ink-muted">{r.description}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 text-xs text-ink-muted">
                        {formatDate(r.submittedAt.slice(0, 10), 'medium', locale)}
                        <ChevronRight size={14} className="text-ink-faint" aria-hidden />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
          {queue.length > LIST_CAP && (
            <div className="text-xs text-ink-muted">
              {isTh
                ? `แสดง ${LIST_CAP} จาก ${queue.length} รายการ`
                : `Showing ${LIST_CAP} of ${queue.length}`}
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}

'use client';

// ess/workflows/page.tsx — My Workflows list
// Dynamic read from workflow-approvals store (5-persona journey).
// Filtered to requests where submittedBy.id === current user.

import Link from 'next/link';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { ArrowRight, Plus } from 'lucide-react';
import { useWorkflowApprovals, STEP_LABEL, type ApprovalStep } from '@/stores/workflow-approvals';
import { useAuthStore } from '@/stores/auth-store';

const STATUS_STYLE: Record<ApprovalStep, string> = {
  pending_manager: 'bg-amber-50 text-amber-700 border border-amber-200',
  pending_hrbp: 'bg-amber-50 text-amber-700 border border-amber-200',
  pending_spd: 'bg-amber-50 text-amber-700 border border-amber-200',
  approved: 'bg-green-50 text-green-700 border border-green-200',
  rejected: 'bg-red-50 text-red-700 border border-red-200',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function MyWorkflowsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'th';
  const userId = useAuthStore((s) => s.userId);
  const allRequests = useWorkflowApprovals((s) => s.requests);

  const myRequests = useMemo(
    () => allRequests.filter((r) => r.submittedBy.id === userId),
    [allRequests, userId],
  );

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="humi-row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h1 className="font-display text-[22px] font-semibold text-ink">คำขอของฉัน</h1>
          <p className="text-small text-ink-muted mt-1">
            ประวัติคำขอแก้ไขข้อมูลและสถานะการอนุมัติ
          </p>
        </div>
        <Link
          href={`/${locale}/ess/profile/edit`}
          className="humi-btn-primary"
          style={{ alignSelf: 'flex-start' }}
        >
          <Plus size={14} aria-hidden style={{ display: 'inline', marginRight: 4 }} />
          ยื่นคำขอใหม่
        </Link>
      </div>

      {myRequests.length === 0 ? (
        <div className="humi-card humi-card--cream" style={{ textAlign: 'center', padding: 40 }}>
          <p className="text-body text-ink-muted">ยังไม่มีคำขอที่คุณส่ง</p>
          <p className="text-small text-ink-muted mt-1">
            คลิก &quot;ยื่นคำขอใหม่&quot; ด้านบนเพื่อเริ่มคำขอแก้ไขข้อมูล
          </p>
        </div>
      ) : (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }} aria-label="รายการคำขอของฉัน">
          {myRequests.map((req) => {
            const last = req.audit[req.audit.length - 1];
            return (
              <li key={req.id} className="humi-card" style={{ padding: 16 }}>
                <div className="humi-row" style={{ gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div className="humi-eyebrow" style={{ marginBottom: 2 }}>{req.id}</div>
                    <div className="text-body font-semibold text-ink">ขอแก้ไขข้อมูลส่วนตัว</div>
                    <div className="text-small text-ink-muted mt-0.5">
                      ส่งเมื่อ {formatDate(req.submittedAt)} · {req.diffs.length} รายการ
                    </div>
                  </div>
                  <span
                    className={
                      'rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ' +
                      STATUS_STYLE[req.currentStep]
                    }
                  >
                    {STEP_LABEL[req.currentStep]}
                  </span>
                </div>

                {/* Diff summary */}
                <div
                  style={{
                    marginTop: 12,
                    borderTop: '1px solid var(--color-hairline-soft)',
                    paddingTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  {req.diffs.slice(0, 3).map((d) => (
                    <div
                      key={d.path}
                      className="humi-row"
                      style={{ gap: 8, fontSize: 12, flexWrap: 'wrap' }}
                    >
                      <span className="text-ink-muted" style={{ minWidth: 140 }}>{d.label}</span>
                      <span className="text-ink-faint" style={{ textDecoration: 'line-through' }}>
                        {d.before || '(ว่าง)'}
                      </span>
                      <ArrowRight size={10} aria-hidden />
                      <span className="text-ink">{d.after || '(ว่าง)'}</span>
                    </div>
                  ))}
                  {req.diffs.length > 3 && (
                    <div className="text-small text-ink-faint">
                      และอีก {req.diffs.length - 3} รายการ
                    </div>
                  )}
                </div>

                {/* Last activity */}
                <div
                  className="text-small text-ink-muted"
                  style={{
                    marginTop: 12,
                    paddingTop: 10,
                    borderTop: '1px solid var(--color-hairline-soft)',
                    fontSize: 11,
                  }}
                >
                  กิจกรรมล่าสุด: {last.actorName}
                  {' · '}
                  {last.action === 'submit' ? 'ส่งคำขอ' : last.action === 'approve' ? 'อนุมัติ' : 'ปฏิเสธ'}
                  {' · '}
                  {formatDate(last.at)}
                  {last.comment && ` — "${last.comment}"`}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

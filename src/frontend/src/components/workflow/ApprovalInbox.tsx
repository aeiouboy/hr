'use client';

// ApprovalInbox — shared inbox view used by Manager / HRBP / SPD persona routes.
// Each persona mounts this with their own `expectedStep` filter. The card
// renders the field-level diff + approve/reject actions; clicking approve
// advances the state machine to the next step automatically.

import { useMemo, useState } from 'react';
import { ArrowRight, Check, X, Clock, CheckCircle2 } from 'lucide-react';
import {
  useWorkflowApprovals,
  STEP_LABEL,
  type ApprovalStep,
  type ApprovalRequest,
} from '@/stores/workflow-approvals';
import { useAuthStore } from '@/stores/auth-store';
import type { Role } from '@/lib/rbac';

interface ApprovalInboxProps {
  /** Which step this persona is responsible for — filter the store to this. */
  expectedStep: ApprovalStep;
  /** Persona's role — recorded in the audit trail on approve/reject. */
  role: Role;
  /** Page heading shown above the list. */
  title: string;
  /** One-sentence Thai subtitle explaining what the persona is approving. */
  subtitle: string;
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

export function ApprovalInbox({ expectedStep, role, title, subtitle }: ApprovalInboxProps) {
  const allRequests = useWorkflowApprovals((s) => s.requests);
  const approve = useWorkflowApprovals((s) => s.approve);
  const reject = useWorkflowApprovals((s) => s.reject);
  const actorName = useAuthStore((s) => s.username) ?? 'ผู้ใช้';

  const pending = useMemo(
    () => allRequests.filter((r) => r.currentStep === expectedStep),
    [allRequests, expectedStep],
  );

  // History — requests ที่ persona นี้เคยแตะ (approve/reject) แล้ว
  const history = useMemo(
    () =>
      allRequests
        .filter((r) => r.currentStep !== expectedStep)
        .filter((r) => r.audit.some((a) => a.actorRole === role && a.action !== 'submit'))
        .slice(0, 5),
    [allRequests, expectedStep, role],
  );

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div>
        <h1 className="font-display text-[22px] font-semibold text-ink">{title}</h1>
        <p className="text-small text-ink-muted mt-1">{subtitle}</p>
      </div>

      {/* KPI chips */}
      <div className="humi-row" style={{ gap: 12, flexWrap: 'wrap' }}>
        <div className="humi-card humi-card--cream" style={{ padding: '10px 16px', minWidth: 140 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>
            <Clock size={10} className="inline mr-1" aria-hidden />
            รอดำเนินการ
          </div>
          <div className="text-body font-semibold text-ink">{pending.length} รายการ</div>
        </div>
        <div className="humi-card humi-card--cream" style={{ padding: '10px 16px', minWidth: 140 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>
            <CheckCircle2 size={10} className="inline mr-1" aria-hidden />
            ล่าสุดที่อนุมัติ/ปฏิเสธ
          </div>
          <div className="text-body font-semibold text-ink">{history.length} รายการ</div>
        </div>
      </div>

      {/* Pending list */}
      <section>
        <div className="humi-eyebrow" style={{ marginBottom: 10 }}>คำขอรอการอนุมัติ</div>
        {pending.length === 0 ? (
          <div className="humi-card humi-card--cream" style={{ textAlign: 'center', padding: 40 }}>
            <p className="text-body text-ink-muted">ไม่มีคำขอรอการอนุมัติในขณะนี้</p>
            <p className="text-small text-ink-muted mt-1">
              คำขอใหม่จากพนักงานจะแสดงที่นี่เมื่อมีเข้ามา
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pending.map((req) => (
              <RequestCard
                key={req.id}
                req={req}
                onApprove={(comment) =>
                  approve(req.id, { role, name: actorName }, comment)
                }
                onReject={(reason) =>
                  reject(req.id, { role, name: actorName }, reason)
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* Recent history */}
      {history.length > 0 && (
        <section>
          <div className="humi-eyebrow" style={{ marginBottom: 10 }}>ประวัติล่าสุด (5 รายการ)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {history.map((req) => (
              <HistoryRow key={req.id} req={req} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ── Individual request card with inline approve/reject form ──
function RequestCard({
  req,
  onApprove,
  onReject,
}: {
  req: ApprovalRequest;
  onApprove: (comment?: string) => void;
  onReject: (reason: string) => void;
}) {
  const [mode, setMode] = useState<'none' | 'approve' | 'reject'>('none');
  const [comment, setComment] = useState('');

  const submit = () => {
    if (mode === 'approve') {
      onApprove(comment.trim() || undefined);
    } else if (mode === 'reject') {
      if (!comment.trim()) return; // reason required
      onReject(comment.trim());
    }
    setMode('none');
    setComment('');
  };

  return (
    <div className="humi-card" style={{ padding: 18 }}>
      <div className="humi-row" style={{ gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>{req.id}</div>
          <div className="text-body font-semibold text-ink">
            ขอแก้ไขข้อมูลส่วนตัว — {req.employeeName}
          </div>
          <div className="text-small text-ink-muted mt-0.5">
            {req.employeeId} · ส่งเมื่อ {formatDate(req.submittedAt)}
          </div>
        </div>
        <span className="humi-tag humi-tag--butter" style={{ alignSelf: 'center' }}>
          {STEP_LABEL[req.currentStep]}
        </span>
      </div>

      {/* Diff table */}
      <div
        style={{
          marginTop: 14,
          borderTop: '1px solid var(--color-hairline-soft)',
          paddingTop: 14,
        }}
      >
        <div className="humi-eyebrow" style={{ marginBottom: 8 }}>การเปลี่ยนแปลง ({req.diffs.length})</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {req.diffs.map((d) => (
            <div
              key={d.path}
              className="humi-row"
              style={{
                gap: 10,
                fontSize: 13,
                padding: '6px 10px',
                background: 'var(--color-canvas-soft)',
                borderRadius: 8,
                flexWrap: 'wrap',
              }}
            >
              <span className="text-ink-muted" style={{ minWidth: 140 }}>{d.label}</span>
              <span className="text-ink-faint" style={{ textDecoration: 'line-through' }}>
                {d.before || '(ว่าง)'}
              </span>
              <ArrowRight size={12} aria-hidden className="text-ink-muted" />
              <span className="text-ink font-medium">
                {d.after || '(ว่าง)'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      {mode === 'none' ? (
        <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
          <button
            type="button"
            className="humi-btn-secondary"
            onClick={() => { setMode('reject'); setComment(''); }}
          >
            <X size={14} aria-hidden style={{ display: 'inline', marginRight: 4 }} />
            ปฏิเสธ
          </button>
          <button
            type="button"
            className="humi-btn-primary"
            onClick={() => { setMode('approve'); setComment(''); }}
          >
            <Check size={14} aria-hidden style={{ display: 'inline', marginRight: 4 }} />
            อนุมัติ
          </button>
        </div>
      ) : (
        <div style={{ marginTop: 14, borderTop: '1px solid var(--color-hairline-soft)', paddingTop: 14 }}>
          <label className="humi-label" htmlFor={`${req.id}-comment`}>
            {mode === 'approve' ? 'หมายเหตุ (ถ้ามี)' : 'เหตุผลการปฏิเสธ'}
            {mode === 'reject' && <span className="humi-asterisk ml-1">*</span>}
          </label>
          <textarea
            id={`${req.id}-comment`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
            className="humi-input w-full"
            placeholder={
              mode === 'approve'
                ? 'ระบุหมายเหตุ (ถ้ามี)'
                : 'ระบุเหตุผลที่ปฏิเสธ เพื่อให้พนักงานทราบและแก้ไข'
            }
            required={mode === 'reject'}
            autoFocus
          />
          <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
            <button
              type="button"
              className="humi-btn-secondary"
              onClick={() => { setMode('none'); setComment(''); }}
            >
              ยกเลิก
            </button>
            <button
              type="button"
              className={mode === 'approve' ? 'humi-btn-primary' : 'humi-btn-secondary'}
              style={
                mode === 'reject'
                  ? { background: 'var(--color-danger)', color: 'white' }
                  : undefined
              }
              onClick={submit}
              disabled={mode === 'reject' && !comment.trim()}
            >
              ยืนยัน{mode === 'approve' ? 'อนุมัติ' : 'ปฏิเสธ'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function HistoryRow({ req }: { req: ApprovalRequest }) {
  const last = req.audit[req.audit.length - 1];
  return (
    <div
      className="humi-card humi-card--cream"
      style={{
        padding: '10px 14px',
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <span className="humi-eyebrow" style={{ minWidth: 160 }}>{req.id}</span>
      <span className="text-small text-ink">{req.employeeName}</span>
      <span className="humi-spacer" style={{ flex: 1 }} />
      <span className="humi-tag">{STEP_LABEL[req.currentStep]}</span>
      <span className="text-small text-ink-muted">{formatDate(last.at)}</span>
    </div>
  );
}

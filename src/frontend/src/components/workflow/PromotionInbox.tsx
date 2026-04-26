'use client';

// PromotionInbox — SPD กล่องอนุมัติคำขอเลื่อนตำแหน่ง (Chain 4 / BRD #103)

import { useMemo, useState } from 'react';
import { Check, X, Clock } from 'lucide-react';
import {
  usePromotionApprovals,
  PROMOTION_STEP_LABEL,
  type PromotionRequest,
} from '@/stores/promotion-approvals';
import { useAuthStore } from '@/stores/auth-store';
import { Button } from '@/components/humi';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function PromotionInbox() {
  const allRequests = usePromotionApprovals((s) => s.requests);
  const approve = usePromotionApprovals((s) => s.approve);
  const reject = usePromotionApprovals((s) => s.reject);
  const actorName = useAuthStore((s) => s.username) ?? 'SPD';

  const pending = useMemo(
    () => allRequests.filter((r) => r.status === 'pending_spd'),
    [allRequests],
  );

  const history = useMemo(
    () => allRequests.filter((r) => r.status !== 'pending_spd').slice(0, 5),
    [allRequests],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div>
        <div className="humi-eyebrow" style={{ marginBottom: 4 }}>Chain 4 — BRD #103</div>
        <h2 className="font-display text-[18px] font-semibold text-ink">
          คำขอเลื่อนตำแหน่ง — รอ SPD อนุมัติ
        </h2>
        <p className="text-small text-ink-muted mt-1">
          อนุมัติหรือปฏิเสธคำขอเลื่อนตำแหน่งที่ HR Admin ส่งมา
        </p>
      </div>

      {/* KPI chip */}
      <div className="humi-row" style={{ gap: 12 }}>
        <div className="humi-card humi-card--cream" style={{ padding: '10px 16px', minWidth: 140 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>
            <Clock size={10} className="inline mr-1" aria-hidden />
            รอดำเนินการ
          </div>
          <div className="text-body font-semibold text-ink">{pending.length} รายการ</div>
        </div>
      </div>

      {/* Pending list */}
      <section>
        <div className="humi-eyebrow" style={{ marginBottom: 10 }}>คำขอรอการอนุมัติ</div>
        {pending.length === 0 ? (
          <div className="humi-card humi-card--cream" style={{ textAlign: 'center', padding: 32 }}>
            <p className="text-body text-ink-muted">ไม่มีคำขอเลื่อนตำแหน่งรอการอนุมัติ</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pending.map((req) => (
              <PromotionCard
                key={req.id}
                req={req}
                onApprove={(comment) => approve(req.id, { role: 'spd', name: actorName }, comment)}
                onReject={(reason) => reject(req.id, { role: 'spd', name: actorName }, reason)}
              />
            ))}
          </div>
        )}
      </section>

      {/* History */}
      {history.length > 0 && (
        <section>
          <div className="humi-eyebrow" style={{ marginBottom: 10 }}>ประวัติล่าสุด</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {history.map((req) => (
              <div
                key={req.id}
                className="humi-card humi-card--cream"
                style={{ padding: '10px 14px', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}
              >
                <span className="humi-eyebrow" style={{ minWidth: 160 }}>{req.id}</span>
                <span className="text-small text-ink">{req.employeeName}</span>
                <span className="text-small text-ink-muted">
                  {req.fromPosition} → {req.toPosition}
                </span>
                <span className="humi-spacer" style={{ flex: 1 }} />
                <span className="humi-tag">{PROMOTION_STEP_LABEL[req.status]}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function PromotionCard({
  req,
  onApprove,
  onReject,
}: {
  req: PromotionRequest;
  onApprove: (comment?: string) => void;
  onReject: (reason: string) => void;
}) {
  const [mode, setMode] = useState<'none' | 'approve' | 'reject'>('none');
  const [comment, setComment] = useState('');

  const submit = () => {
    if (mode === 'approve') {
      onApprove(comment.trim() || undefined);
    } else if (mode === 'reject') {
      if (!comment.trim()) return;
      onReject(comment.trim());
    }
    setMode('none');
    setComment('');
  };

  const effectiveDateFmt = new Date(req.effectiveDate).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="humi-card" style={{ padding: 18 }}>
      <div className="humi-row" style={{ gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>{req.id}</div>
          <div className="text-body font-semibold text-ink">
            เลื่อนตำแหน่ง — {req.employeeName}
          </div>
          <div className="text-small text-ink-muted mt-0.5">
            {req.employeeId} · ส่งเมื่อ {formatDate(req.submittedAt)}
          </div>
        </div>
        <span className="humi-tag humi-tag--butter" style={{ alignSelf: 'center' }}>
          {PROMOTION_STEP_LABEL[req.status]}
        </span>
      </div>

      {/* Details */}
      <div
        style={{
          marginTop: 14,
          borderTop: '1px solid var(--color-hairline-soft)',
          paddingTop: 14,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 12,
        }}
      >
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 4 }}>จาก</div>
          <div className="text-body font-medium text-ink">{req.fromPosition}</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 4 }}>เป็น</div>
          <div className="text-body font-medium text-ink">{req.toPosition}</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 4 }}>มีผลวันที่</div>
          <div className="text-body font-medium text-ink">{effectiveDateFmt}</div>
        </div>
        {req.salaryDelta !== undefined && (
          <div>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>ปรับเงินเดือน</div>
            <div className="text-body font-medium text-ink">+{req.salaryDelta}%</div>
          </div>
        )}
        {req.notes && (
          <div style={{ gridColumn: '1 / -1' }}>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>หมายเหตุ</div>
            <div className="text-body text-ink-muted">{req.notes}</div>
          </div>
        )}
      </div>

      {/* Actions */}
      {mode === 'none' ? (
        <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setMode('reject'); setComment(''); }}
          >
            <X size={14} aria-hidden />
            ปฏิเสธ
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => { setMode('approve'); setComment(''); }}
          >
            <Check size={14} aria-hidden />
            อนุมัติ
          </Button>
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
              mode === 'approve' ? 'ระบุหมายเหตุ (ถ้ามี)' : 'ระบุเหตุผลที่ปฏิเสธ'
            }
            required={mode === 'reject'}
            autoFocus
          />
          <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setMode('none'); setComment(''); }}
            >
              ยกเลิก
            </Button>
            <Button
              variant={mode === 'approve' ? 'primary' : 'danger'}
              size="sm"
              onClick={submit}
              disabled={mode === 'reject' && !comment.trim()}
            >
              ยืนยัน{mode === 'approve' ? 'อนุมัติ' : 'ปฏิเสธ'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

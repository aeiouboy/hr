'use client';

import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Download,
  Shield,
  User,
  Wallet,
  X,
} from 'lucide-react';
import { useProbationCase } from '@/hooks/use-probation';
import { formatDate } from '@/lib/date';

// Humi production design hand-off — see /tmp/humi-design/hrms/project/prod-probation.jsx
// ProbationApprove() (lines 173–428). All raw red hex from the prototype is substituted
// with the Humi danger/warning tokens per the NO-RED guardrail in CLAUDE.md.

type Outcome = 'pass' | 'extend' | 'no_pass';

type OutcomeMeta = {
  value: Outcome;
  label: string;
  sub: string;
  icon: typeof Check;
  // Tailwind tokens — selected border + icon-square color
  borderClass: string;
  iconBgSelected: string;
  iconColorIdle: string;
};

const OUTCOMES: OutcomeMeta[] = [
  {
    value: 'pass',
    label: 'ผ่านทดลองงาน',
    sub: 'พนักงานจะถูกบรรจุเป็น Permanent',
    icon: Check,
    borderClass: 'border-accent',
    iconBgSelected: 'bg-accent text-white',
    iconColorIdle: 'text-accent',
  },
  {
    value: 'extend',
    label: 'ขยายเวลา',
    sub: 'ทดลองต่ออีก 30–60 วัน',
    icon: Clock,
    borderClass: 'border-warning',
    iconBgSelected: 'bg-warning text-white',
    iconColorIdle: 'text-warning',
  },
  {
    value: 'no_pass',
    label: 'ไม่ผ่าน',
    sub: 'พนักงานจะสิ้นสภาพหลังบันทึก',
    icon: X,
    borderClass: 'border-danger',
    iconBgSelected: 'bg-danger text-white',
    iconColorIdle: 'text-danger',
  },
];

const RATING_TIERS = [
  '',
  'ต่ำกว่ามาตรฐาน',
  'ใกล้มาตรฐาน',
  'ตามมาตรฐาน',
  'เกินมาตรฐาน',
  'ดีเยี่ยม',
] as const;

function eyebrow(text: string) {
  return (
    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
      {text}
    </div>
  );
}

function FieldLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-xs font-semibold text-ink-soft">
      {children} {required && <span className="text-accent">*</span>}
    </label>
  );
}

function FieldHint({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-xs text-ink-muted">{children}</p>;
}

const FIELD_INPUT_CLASS =
  'w-full rounded-[var(--radius-md)] border border-hairline bg-surface px-3 py-2.5 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft';

const FIELD_TEXTAREA_CLASS = `${FIELD_INPUT_CLASS} resize-y min-h-[64px]`;

// --- Approval chain step ---
type ApprovalStepStatus = 'done' | 'current' | 'pending';

interface ApprovalStep {
  label: string;
  sub: string;
  status: ApprovalStepStatus;
  icon: typeof User;
}

function ApprovalChainStep({
  step,
  isLast,
}: {
  step: ApprovalStep;
  isLast: boolean;
}) {
  const { status, icon: Icon } = step;
  const isCurrent = status === 'current';
  const isDone = status === 'done';

  const dotClass = isCurrent
    ? 'bg-accent text-white border-accent'
    : isDone
      ? 'bg-success text-white border-success'
      : 'bg-surface text-ink-faint border-hairline';

  const connectorClass = isDone ? 'bg-success' : 'bg-hairline';

  return (
    <div className="relative flex items-start gap-3 py-1">
      <div className="flex flex-shrink-0 flex-col items-center">
        <div
          className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] ${dotClass}`}
        >
          {isDone ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
        </div>
        {!isLast && <div className={`w-0.5 flex-1 min-h-[28px] -my-px ${connectorClass}`} />}
      </div>
      <div className="min-w-0 flex-1 pb-[18px]">
        <div
          className={`text-sm font-semibold ${
            isCurrent ? 'text-accent' : 'text-ink'
          }`}
        >
          {step.label}
          {isCurrent && (
            <span className="humi-tag humi-tag--accent ml-1.5 text-[10px]">
              กำลังดำเนินการ
            </span>
          )}
        </div>
        <div className="mt-0.5 text-xs text-ink-muted">{step.sub}</div>
      </div>
    </div>
  );
}

// --- Days remaining computation ---
function daysUntil(iso: string): number {
  const ms = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function ProbationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const pathname = usePathname();
  const locale = pathname.startsWith('/th') ? 'th' : 'en';
  const { probationCase: c, loading } = useProbationCase(id);

  const [outcome, setOutcome] = useState<Outcome>('pass');
  const [rating, setRating] = useState<number>(4);
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [extendDate, setExtendDate] = useState('');
  const [extendDuration, setExtendDuration] = useState('30 วัน');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [allowance, setAllowance] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compute days remaining + total filled-fields (for the autosave hint).
  const days = useMemo(() => {
    if (!c) return 0;
    return daysUntil(c.slaDeadline ?? c.probationEndDate);
  }, [c]);

  const showBanner = days <= 14;

  const filledCount = useMemo(() => {
    const baseFilled = [
      outcome,
      rating > 0,
      strengths.trim(),
      improvements.trim(),
      recommendation.trim(),
      attachedFileName,
    ].filter(Boolean).length;
    if (outcome === 'extend') {
      return baseFilled + [extendDate, extendDuration].filter(Boolean).length;
    }
    if (outcome === 'pass') {
      return baseFilled + [effectiveDate, allowance].filter(Boolean).length;
    }
    return baseFilled;
  }, [
    outcome,
    rating,
    strengths,
    improvements,
    recommendation,
    attachedFileName,
    extendDate,
    extendDuration,
    effectiveDate,
    allowance,
  ]);

  const totalFields = outcome === 'no_pass' ? 6 : 8;

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-64 animate-pulse rounded bg-canvas-soft" />
        <div className="h-40 w-full animate-pulse rounded bg-canvas-soft" />
        <div className="h-60 w-full animate-pulse rounded bg-canvas-soft" />
      </div>
    );
  }

  if (!c) {
    return (
      <div className="humi-card text-center">
        <p className="text-ink-muted">ไม่พบเคส {id}</p>
      </div>
    );
  }

  const handleFilePick = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setAttachedFileName(f.name);
    // TODO: wire up real upload backend (document-service).
  };

  const tenure = c.submittedAt
    ? formatDate(c.hireDate, 'medium', locale)
    : formatDate(c.hireDate, 'medium', locale);

  const effectiveCutoff = c.probationEndDate
    ? formatDate(c.probationEndDate, 'long', locale)
    : '';

  const approvalSteps: ApprovalStep[] = [
    {
      label: `หัวหน้างาน · ${c.manager.name}`,
      sub: 'ผู้บังคับบัญชาโดยตรง',
      status: 'current',
      icon: User,
    },
    {
      label: `HR Admin · ${c.currentApprover.name ?? 'TBD'}`,
      sub: 'ตรวจสอบเอกสารและบันทึก EC',
      status: 'pending',
      icon: Shield,
    },
    {
      label: 'Payroll',
      sub: 'ส่งเข้าระบบจ่ายเงิน',
      status: 'pending',
      icon: Wallet,
    },
  ];

  const historyEvents = (c.timeline ?? []).slice(0, 3).map((entry) => {
    const isSystem = entry.actorRole === 'System';
    const isWarn = /SLA|escalate|ไม่ตอบ|14 วัน/i.test(entry.action);
    return {
      title: entry.action,
      timestamp: `${formatDate(entry.date, 'medium', locale)} · ${
        isSystem ? 'ระบบ Auto' : entry.actor
      }`,
      dotClass: isWarn
        ? 'bg-warning'
        : isSystem
          ? 'bg-ink-faint'
          : 'bg-accent',
    };
  });

  // --- Outcome selector card ---
  const renderOutcomeCard = () => (
    <div className="humi-card">
      <div className="mb-2">{eyebrow('ขั้นที่ 1 จาก 3')}</div>
      <h3 className="mb-3.5 font-display text-lg font-semibold tracking-tight text-ink">
        ผลการประเมิน <span className="text-accent">*</span>
      </h3>

      <div
        role="radiogroup"
        aria-label="ผลการประเมิน"
        className="grid grid-cols-3 gap-2.5"
      >
        {OUTCOMES.map((o) => {
          const Icon = o.icon;
          const selected = outcome === o.value;
          return (
            <label
              key={o.value}
              className={`flex cursor-pointer flex-col gap-2 rounded-[var(--radius-lg)] border-[1.5px] p-4 transition ${
                selected
                  ? `${o.borderClass} bg-canvas-soft`
                  : 'border-hairline bg-surface hover:border-hairline-soft'
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] ${
                    selected
                      ? o.iconBgSelected
                      : `bg-canvas-soft ${o.iconColorIdle}`
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <input
                  type="radio"
                  name="outcome"
                  value={o.value}
                  checked={selected}
                  onChange={() => setOutcome(o.value)}
                  aria-label={o.label}
                  className="h-4 w-4 cursor-pointer accent-accent"
                />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight text-ink">
                  {o.label}
                </div>
                <div className="mt-1 text-xs leading-snug text-ink-muted">{o.sub}</div>
              </div>
            </label>
          );
        })}
      </div>

      {outcome === 'extend' && (
        <div className="mt-4 rounded-[var(--radius-md)] border border-warning bg-warning-soft p-3.5">
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <FieldLabel required>ขยายถึงวันที่</FieldLabel>
              <input
                type="date"
                value={extendDate}
                onChange={(e) => setExtendDate(e.target.value)}
                className={FIELD_INPUT_CLASS}
              />
              <FieldHint>ต้องไม่เกินวันเริ่มงาน + 119 วัน</FieldHint>
            </div>
            <div>
              <FieldLabel required>ระยะเวลา</FieldLabel>
              <select
                value={extendDuration}
                onChange={(e) => setExtendDuration(e.target.value)}
                className={FIELD_INPUT_CLASS}
              >
                <option>30 วัน</option>
                <option>45 วัน</option>
                <option>60 วัน</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {outcome === 'pass' && (
        <div className="mt-4 grid grid-cols-2 gap-3.5">
          <div>
            <FieldLabel required>วันที่บรรจุ (effective)</FieldLabel>
            <input
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              className={FIELD_INPUT_CLASS}
            />
          </div>
          <div>
            <FieldLabel>Allowance (ถ้ามี)</FieldLabel>
            <input
              type="number"
              value={allowance}
              onChange={(e) => setAllowance(e.target.value)}
              placeholder="0"
              className={FIELD_INPUT_CLASS}
            />
            <FieldHint>จะส่ง Payroll อัตโนมัติ</FieldHint>
          </div>
        </div>
      )}
    </div>
  );

  const isNoPass = outcome === 'no_pass';

  return (
    <div className="pb-8">
      {/* Back nav */}
      <Link
        href={`/${locale}/workflows/probation`}
        className="mb-3.5 inline-flex items-center gap-1.5 text-sm text-ink-muted transition hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>กลับไปคิวประเมิน</span>
      </Link>

      {/* Title */}
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[11px] bg-accent-soft text-accent">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          {eyebrow(`การดำเนินการ · ${c.id}`)}
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
            ประเมินทดลองงาน
          </h1>
        </div>
      </div>

      {/* Days-remaining banner (≤14 days) */}
      {showBanner && (
        <div
          role="status"
          className="mb-5 flex items-center gap-3 rounded-[var(--radius-md)] border border-danger bg-danger-soft px-4 py-3.5 text-[color:var(--color-danger-ink)]"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <div className="text-sm font-semibold">
              ใกล้ครบกำหนด — เหลือ {days} วัน
            </div>
            <div className="mt-0.5 text-xs">
              กรุณาบันทึกการประเมินก่อนวันที่ {effectiveCutoff} · หลังจากนั้นระบบจะ
              auto-pass อัตโนมัติ
            </div>
          </div>
        </div>
      )}

      {/* Two-column body */}
      <div className="grid grid-cols-[1.6fr_1fr] gap-5">
        {/* LEFT — main form */}
        <div className="flex flex-col gap-5">
          {/* 3a. Employee snapshot */}
          <div className="humi-card humi-card--cream">
            <div className="flex items-start gap-3.5">
              <div className="humi-avatar humi-avatar--teal flex h-14 w-14 flex-shrink-0 items-center justify-center text-base">
                {initials(c.fullNameEn || c.fullNameTh)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5">{eyebrow(c.employeeId)}</div>
                <div className="font-display text-xl font-semibold tracking-tight text-ink">
                  {c.fullNameTh}
                </div>
                <div className="text-xs text-ink-muted">{c.fullNameEn}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3.5 border-t border-hairline-soft pt-4">
              <div>
                {eyebrow('ตำแหน่ง')}
                <div className="mt-1 text-sm font-semibold text-ink">{c.position}</div>
              </div>
              <div>
                {eyebrow('วันเริ่มงาน')}
                <div className="mt-1 text-sm font-semibold text-ink">
                  {formatDate(c.hireDate, 'medium', locale)}
                </div>
              </div>
              <div>
                {eyebrow('อายุงาน')}
                <div className="mt-1 text-sm font-semibold text-ink">{tenure}</div>
              </div>
              <div>
                {eyebrow('หัวหน้าโดยตรง')}
                <div className="mt-1 text-sm font-semibold text-ink">
                  {c.manager.name}
                </div>
              </div>
            </div>
          </div>

          {/* 3b. Outcome selector */}
          {renderOutcomeCard()}

          {/* 3c. Evaluation */}
          <div className="humi-card">
            <div className="mb-2">{eyebrow('ขั้นที่ 2 จาก 3')}</div>
            <h3 className="mb-3.5 font-display text-lg font-semibold tracking-tight text-ink">
              ผลการประเมินเชิงคุณภาพ
            </h3>

            <div className="mb-4">
              <FieldLabel required>คะแนนรวม</FieldLabel>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    aria-label={`ให้คะแนน ${n} จาก 5`}
                    className={`cursor-pointer border-0 bg-transparent p-0.5 text-2xl leading-none ${
                      n <= rating ? 'text-warning' : 'text-hairline'
                    }`}
                  >
                    ★
                  </button>
                ))}
                <span className="ml-2 text-sm text-ink-muted">
                  {rating}/5 — {RATING_TIERS[rating] ?? ''}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3.5">
              <div>
                <FieldLabel required>จุดเด่น</FieldLabel>
                <textarea
                  rows={2}
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                  placeholder="เช่น ทำงานเร็ว ใส่ใจลูกค้า · ขายเข้าทีมได้ดี"
                  className={FIELD_TEXTAREA_CLASS}
                />
              </div>
              <div>
                <FieldLabel required>จุดที่ต้องพัฒนา</FieldLabel>
                <textarea
                  rows={2}
                  value={improvements}
                  onChange={(e) => setImprovements(e.target.value)}
                  placeholder="เช่น การจัดการสต็อกหลังร้าน · ต้องอบรมระบบ POS เพิ่ม"
                  className={FIELD_TEXTAREA_CLASS}
                />
              </div>
              <div>
                <FieldLabel required>ข้อเสนอแนะ</FieldLabel>
                <textarea
                  rows={2}
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  placeholder="ข้อเสนอแนะโดยรวมต่อ HR..."
                  className={FIELD_TEXTAREA_CLASS}
                />
              </div>
            </div>
          </div>

          {/* 3d. Attachment */}
          <div className="humi-card">
            <div className="mb-2">{eyebrow('ขั้นที่ 3 จาก 3')}</div>
            <h3 className="mb-3.5 font-display text-lg font-semibold tracking-tight text-ink">
              เอกสารแนบ (ถ้ามี)
            </h3>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-[var(--radius-md)] border-[1.5px] border-dashed border-hairline bg-canvas-soft px-4 py-5 text-center text-ink-muted transition hover:border-accent-soft"
            >
              <div className="text-sm font-semibold text-ink-soft">
                ลากเอกสารมาวาง หรือ <span className="text-accent">เลือกไฟล์</span>
              </div>
              <div className="mt-1 text-xs">
                เช่น บันทึกการสนทนา · ผลงาน · PDF / JPG / PNG · ไม่เกิน 10 MB
              </div>
              {attachedFileName && (
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-accent">
                  <Download className="h-3 w-3" /> {attachedFileName}
                </div>
              )}
            </button>
            {/* TODO: wire to document-service upload endpoint */}
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={handleFilePick}
              accept=".pdf,.jpg,.jpeg,.png"
              aria-label="เลือกไฟล์เอกสารแนบ"
            />
          </div>
        </div>

        {/* RIGHT — sidebar */}
        <div className="flex flex-col gap-5">
          {/* 4a. Approval chain */}
          <div className="humi-card">
            <div className="mb-3">{eyebrow('ขั้นตอนอนุมัติ')}</div>
            <div className="flex flex-col">
              {approvalSteps.map((step, i) => (
                <ApprovalChainStep
                  key={step.label}
                  step={step}
                  isLast={i === approvalSteps.length - 1}
                />
              ))}
            </div>
          </div>

          {/* 4b. History */}
          <div className="humi-card humi-card--cream">
            <div className="mb-2.5">{eyebrow('ประวัติเคส')}</div>
            <div className="flex flex-col gap-3">
              {historyEvents.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${h.dotClass}`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-ink">{h.title}</div>
                    <div className="mt-0.5 text-xs text-ink-muted">{h.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4c. Policy ink-card */}
          <div className="humi-card humi-card--ink relative overflow-hidden">
            <div
              className="humi-blob humi-blob--teal"
              style={{ width: 80, height: 100, right: -25, bottom: -30, opacity: 0.5 }}
            />
            <div
              className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent"
            >
              เกณฑ์อ้างอิง
            </div>
            <h4 className="mt-2 font-display text-base font-semibold text-canvas-soft">
              นโยบายทดลองงาน · ฉบับ 2569
            </h4>
            <ul className="mt-2.5 flex list-none flex-col gap-1.5 p-0 text-xs text-[rgba(231,227,216,0.85)]">
              <li>• ระยะทดลอง 119 วัน (4 เดือน)</li>
              <li>• ขยายเวลาได้สูงสุด 60 วัน</li>
              <li>• ไม่ผ่าน → แจ้งล่วงหน้า 1 รอบจ่ายเงินเดือน</li>
              <li>• ผ่าน → Allowance ตามสัญญา</li>
            </ul>
            {/* TODO: replace with real policy doc route */}
            <a
              href="#"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent"
            >
              ดูฉบับเต็ม <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div
        className="sticky bottom-0 -mx-8 mt-5 flex items-center gap-3 border-t border-hairline bg-surface px-8 py-3.5"
        style={{ boxShadow: '0 -6px 20px rgba(14,27,44,0.05)' }}
      >
        <div className="text-xs text-ink-muted">
          บันทึกร่างอัตโนมัติ ·{' '}
          {new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} ·
          กรอก {filledCount} จาก {totalFields} ช่อง
        </div>
        <div className="flex-1" />
        <Link
          href={`/${locale}/workflows/probation`}
          className="humi-button humi-button--ghost"
        >
          ยกเลิก
        </Link>
        {/* TODO: persist draft to localStorage */}
        <button type="button" className="humi-button humi-button--ghost">
          บันทึกร่าง
        </button>
        {isNoPass ? (
          <button
            type="button"
            className="humi-button"
            style={{ background: 'var(--color-danger)', color: '#fff' }}
          >
            <X className="h-3.5 w-3.5" />
            ยืนยัน ไม่ผ่านทดลองงาน
          </button>
        ) : (
          <button type="button" className="humi-button humi-button--primary">
            <Check className="h-3.5 w-3.5" />
            อนุมัติและส่งให้ HR Admin
          </button>
        )}
      </div>
    </div>
  );
}

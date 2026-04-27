'use client';

import { useMemo, useState } from 'react';
import {
  Plus,
  FileText,
  ArrowRight,
  Search,
  Download,
  Calendar,
  Heart,
  Shield,
  Clock,
  Globe,
  BookOpen,
  Plug,
  Users,
  AlertCircle,
  Check,
  X,
  type LucideIcon,
} from 'lucide-react';
import {
  Avatar,
  Button,
  Card,
  CardEyebrow,
  CardTitle,
  Modal,
} from '@/components/humi';
import { cn } from '@/lib/utils';
import {
  HUMI_REQUEST_CATALOG,
  HUMI_MY_REQUESTS,
  HUMI_APPROVAL_QUEUE,
  REQUEST_STATUS_META,
  ACCENT_ICON_CLASS,
  ACCENT_BAR_CLASS,
  type RequestIconKey,
  type RequestStatus,
  type HumiApprovalStep,
} from '@/lib/humi-mock-data';
import {
  useRequestsStore,
  type RequestFilterKey,
  type RequestSubmission,
} from '@/stores/humi-requests-slice';

// ════════════════════════════════════════════════════════════
// /requests — Forms/requests tracker
// Port of docs/design-ref/shelfly-bundle/project/screens/requests.jsx
// c7: template selector form + submit → Zustand + filter chips
// ════════════════════════════════════════════════════════════

type TabKey = 'mine' | 'catalog' | 'approvals';

const ICONS: Record<RequestIconKey, LucideIcon> = {
  calendar: Calendar,
  heart: Heart,
  shield: Shield,
  doc: FileText,
  clock: Clock,
  globe: Globe,
  book: BookOpen,
  plug: Plug,
  people: Users,
  arrow: ArrowRight,
};

const FILTER_CHIPS: Array<{ key: RequestFilterKey; label: string }> = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'pending', label: 'รออนุมัติ' },
  { key: 'approved', label: 'อนุมัติแล้ว' },
  { key: 'rejected', label: 'ไม่อนุมัติ' },
];

// Template-specific form fields definition
type TemplateField = { id: string; label: string; placeholder: string; type?: 'text' | 'textarea' };

const TEMPLATE_FIELDS: Record<string, TemplateField[]> = {
  leave: [
    { id: 'leave-type', label: 'ประเภทการลา', placeholder: 'เช่น ลาพักร้อน / ลาป่วย / ลากิจ' },
    { id: 'leave-dates', label: 'วันที่', placeholder: 'เช่น 28 เม.ย. – 2 พ.ค.' },
    { id: 'leave-reason', label: 'เหตุผล', placeholder: 'ระบุเหตุผลโดยย่อ', type: 'textarea' },
  ],
  claim: [
    { id: 'claim-type', label: 'ประเภทค่าใช้จ่าย', placeholder: 'เช่น ค่ารักษาพยาบาล' },
    { id: 'claim-amount', label: 'จำนวนเงิน (บาท)', placeholder: 'เช่น 4,820' },
    { id: 'claim-receipt', label: 'เลขใบเสร็จ', placeholder: 'เช่น RX-3381' },
  ],
  ot: [
    { id: 'ot-date', label: 'วันที่ทำโอที', placeholder: 'เช่น เสาร์ 19 เม.ย.' },
    { id: 'ot-hours', label: 'จำนวนชั่วโมง', placeholder: 'เช่น 4' },
    { id: 'ot-reason', label: 'เหตุผล', placeholder: 'ระบุงานที่ต้องทำ', type: 'textarea' },
  ],
  default: [
    { id: 'detail', label: 'รายละเอียด', placeholder: 'ระบุรายละเอียดคำร้อง', type: 'textarea' },
  ],
};

// Simple in-memory toast
function useToast() {
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: '', visible: false });
  const show = (msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast({ msg: '', visible: false }), 3000);
  };
  return { toast, show };
}

export default function HumiRequestsPage() {
  const [tab, setTab] = useState<TabKey>('mine');
  const { toast, show: showToast } = useToast();

  const { submissions, filter } = useRequestsStore();

  const allMine = useMemo(() => {
    const base = HUMI_MY_REQUESTS.map((r) => ({ ...r }));
    const store = submissions.map((s) => ({
      id: s.id,
      type: s.type,
      sub: s.sub,
      submitted: s.submitted,
      status: s.status,
      approvalChain: [
        { role: 'หัวหน้างาน', name: 'ปรีชา วัฒนกุล', initials: 'ปว', tone: 'teal' as const, status: 'pending' as const, when: 'รอดำเนินการ' },
      ] satisfies HumiApprovalStep[],
    }));
    return [...store, ...base];
  }, [submissions]);

  const filtered = useMemo(() => {
    if (filter === 'all') return allMine;
    return allMine.filter((r) => r.status === filter);
  }, [allMine, filter]);

  const summary = useMemo(() => {
    const total = allMine.length;
    const pending = allMine.filter((r) => r.status === 'pending').length;
    const approved = allMine.filter((r) => r.status === 'approved').length;
    const rejected = allMine.filter((r) => r.status === 'rejected').length;
    return { total, pending, approved, rejected };
  }, [allMine]);

  return (
    <>
      {/* Toast */}
      {toast.visible && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            'fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-[var(--radius-md)] px-4 py-3',
            'bg-ink text-canvas shadow-lg text-body font-medium'
          )}
        >
          <Check size={16} aria-hidden />
          {toast.msg}
        </div>
      )}

      {/* Page header */}
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <CardEyebrow>คำร้องและแบบฟอร์ม</CardEyebrow>
          <h1
            className={cn(
              'font-display font-semibold tracking-tight text-ink',
              'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]'
            )}
          >
            ส่งคำขอ ติดตามสถานะ และอนุมัติคำร้อง
          </h1>
        </div>
        <Button
          variant="primary"
          leadingIcon={<Plus size={14} />}
          onClick={() => setTab('catalog')}
          block
          className="sm:w-auto"
        >
          สร้างคำร้องใหม่
        </Button>
      </header>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="มุมมองคำร้อง"
        className="mb-6 flex flex-wrap gap-1 border-b border-hairline"
      >
        <TabButton
          active={tab === 'mine'}
          onClick={() => setTab('mine')}
          count={allMine.length}
        >
          คำร้องของฉัน
        </TabButton>
        <TabButton
          active={tab === 'catalog'}
          onClick={() => setTab('catalog')}
          count={HUMI_REQUEST_CATALOG.length}
        >
          แบบฟอร์มทั้งหมด
        </TabButton>
        <TabButton
          active={tab === 'approvals'}
          onClick={() => setTab('approvals')}
          count={HUMI_APPROVAL_QUEUE.length}
        >
          รออนุมัติ
        </TabButton>
      </div>

      {tab === 'mine' && (
        <MineTab summary={summary} filtered={filtered} />
      )}
      {tab === 'catalog' && (
        <CatalogTab onSubmitted={(msg) => { showToast(msg); setTab('mine'); }} />
      )}
      {tab === 'approvals' && <ApprovalsTab />}
    </>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Mine — with filter chips
// ────────────────────────────────────────────────────────────

type MineRow = { id: string; type: string; sub: string; submitted: string; status: RequestStatus; approvalChain: HumiApprovalStep[] };

function MineTab({
  summary,
  filtered,
}: {
  summary: { total: number; pending: number; approved: number; rejected: number };
  filtered: MineRow[];
}) {
  const { filter, setFilter } = useRequestsStore();
  const [selected, setSelected] = useState<MineRow | null>(null);

  const summaryCards: Array<{ l: string; n: number; tone: 'accent' | 'warn' | 'sage' | 'butter' }> = [
    { l: 'ส่งทั้งหมด', n: summary.total, tone: 'accent' },
    { l: 'รออนุมัติ', n: summary.pending, tone: 'butter' },
    { l: 'อนุมัติแล้ว', n: summary.approved, tone: 'sage' },
    { l: 'ไม่อนุมัติ', n: summary.rejected, tone: 'warn' },
  ];

  return (
    <>
      {/* Summary tiles */}
      <section className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {summaryCards.map((s) => (
          <div key={s.l} className={cn('humi-stat-card', `humi-stat-card--${s.tone}`)}>
            <CardEyebrow>{s.l}</CardEyebrow>
            <p
              className={cn(
                'mt-1 font-display font-semibold text-ink tabular-nums',
                'text-[length:var(--text-display-h2)] leading-[var(--text-display-h2--line-height)]'
              )}
            >
              {s.n}
            </p>
          </div>
        ))}
      </section>

      {/* Filter chips */}
      <div role="group" aria-label="กรองสถานะ" className="mb-4 flex flex-wrap gap-2">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip.key}
            type="button"
            aria-pressed={filter === chip.key}
            onClick={() => setFilter(chip.key)}
            className={cn(
              'min-h-[44px] rounded-full px-4 py-2.5 text-small font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
              filter === chip.key
                ? 'bg-ink text-canvas'
                : 'bg-canvas-soft text-ink-muted hover:text-ink'
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Request list */}
      <Card variant="raised" size="lg">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <CardTitle>คำร้องของฉัน</CardTitle>
          <div
            role="search"
            className="flex w-full min-w-0 items-center gap-2 rounded-full border border-hairline bg-canvas-soft px-3 py-2 text-small text-ink-muted sm:w-auto sm:min-w-[220px]"
          >
            <Search size={14} aria-hidden />
            <span>ค้นหารหัสหรือหัวข้อ…</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-8 text-center text-small text-ink-muted">ไม่มีคำร้องในสถานะนี้</p>
        ) : (
          <ul role="list" className="divide-y divide-hairline">
            {filtered.map((r) => {
              const meta = REQUEST_STATUS_META[r.status];
              return (
                <li
                  key={r.id}
                  className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:gap-3"
                >
                  <span
                    aria-hidden
                    className="flex h-10 w-8 shrink-0 items-center justify-center rounded-[6px] border border-hairline bg-canvas-soft text-ink-muted"
                  >
                    <FileText size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-body font-semibold text-ink">
                      {r.type}{' '}
                      <span className="font-mono text-small font-normal text-ink-muted">
                        · {r.id}
                      </span>
                    </p>
                    <p className="text-small text-ink-muted">
                      {r.sub} · ส่ง {r.submitted}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
                        meta.toneClass
                      )}
                    >
                      {meta.label}
                    </span>
                    <button
                      type="button"
                      aria-label={`ดูรายละเอียดการอนุมัติ ${r.id}`}
                      onClick={() => setSelected(r)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-muted hover:bg-canvas-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      <ArrowRight size={14} aria-hidden />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <RequestDetailModal open={selected !== null} request={selected} onClose={() => setSelected(null)} />
    </>
  );
}

// ────────────────────────────────────────────────────────────
// Request detail modal — shows approval chain
// ────────────────────────────────────────────────────────────

const STEP_TONE: Record<HumiApprovalStep['status'], string> = {
  approved: 'bg-[color:var(--color-sage-soft)] text-[color:var(--color-sage-ink)]',
  pending: 'bg-[color:var(--color-butter-soft)] text-[color:var(--color-butter-ink)]',
  rejected: 'bg-[color:var(--color-accent-alt-soft)] text-[color:var(--color-accent-alt-ink)]',
  skipped: 'bg-canvas-soft text-ink-muted',
};

const STEP_LABEL: Record<HumiApprovalStep['status'], string> = {
  approved: 'อนุมัติแล้ว',
  pending: 'รออนุมัติ',
  rejected: 'ไม่อนุมัติ',
  skipped: 'ข้ามขั้น',
};

function RequestDetailModal({ open, request, onClose }: { open: boolean; request: MineRow | null; onClose: () => void }) {
  if (!request) return null;
  const meta = REQUEST_STATUS_META[request.status];
  return (
    <Modal open={open} onClose={onClose} title={`${request.type} · ${request.id}`} widthClass="max-w-xl">
      <div className="space-y-4">
        <div className="rounded-xl bg-canvas-soft px-4 py-3">
          <p className="text-small text-ink-muted">{request.sub}</p>
          <p className="mt-1 text-small text-ink-muted">
            ส่งเมื่อ {request.submitted}
            <span className={cn('ml-2 rounded-full px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em]', meta.toneClass)}>
              {meta.label}
            </span>
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-small font-semibold uppercase tracking-[0.14em] text-ink-muted">ลำดับการอนุมัติ</h4>
          {request.approvalChain.length === 0 ? (
            <p className="text-small text-ink-muted">ยังไม่มีผู้อนุมัติ</p>
          ) : (
            <ol className="space-y-3">
              {request.approvalChain.map((step, i) => (
                <li key={`${step.name}-${i}`} className="flex items-start gap-3">
                  <Avatar name={step.name} tone={step.tone} size="md" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-body font-semibold text-ink">{step.name}</p>
                      <span className={cn('rounded-full px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em]', STEP_TONE[step.status])}>
                        {STEP_LABEL[step.status]}
                      </span>
                    </div>
                    <p className="text-small text-ink-muted">{step.role}{step.when ? ` · ${step.when}` : ''}</p>
                    {step.note ? <p className="mt-1 text-small text-ink">{step.note}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className="flex justify-end pt-2">
          <Button variant="ghost" onClick={onClose}>ปิด</Button>
        </div>
      </div>
    </Modal>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Catalog — with template form
// ────────────────────────────────────────────────────────────

function CatalogTab({ onSubmitted }: { onSubmitted: (msg: string) => void }) {
  const submit = useRequestsStore((s) => s.submit);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fields = selectedTemplate
    ? (TEMPLATE_FIELDS[selectedTemplate] ?? TEMPLATE_FIELDS.default)
    : null;

  const selectedCatalog = HUMI_REQUEST_CATALOG.find((f) => f.id === selectedTemplate);

  function handleFieldChange(id: string, value: string) {
    setFieldValues((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => { const n = { ...prev }; delete n[id]; return n; });
  }

  function validateFields() {
    if (!fields) return {};
    const errs: Record<string, string> = {};
    fields.forEach((f) => {
      if (!fieldValues[f.id]?.trim()) {
        errs[f.id] = 'กรุณากรอกข้อมูล';
      }
    });
    return errs;
  }

  function handleSubmit() {
    const errs = validateFields();
    setErrors(errs);
    if (Object.keys(errs).length > 0 || !selectedCatalog) return;

    const sub = fields!
      .map((f) => `${f.label}: ${fieldValues[f.id]?.trim()}`)
      .join(' · ');

    submit({ type: selectedCatalog.title, sub });
    setSelectedTemplate(null);
    setFieldValues({});
    setErrors({});
    onSubmitted(`ส่งคำร้อง "${selectedCatalog.title}" เรียบร้อยแล้ว · สถานะ: รออนุมัติ`);
  }

  return (
    <>
      {/* Hero */}
      <Card
        variant="raised"
        size="lg"
        className="humi-banner mb-6"
      >
        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-36 w-28 rounded-full bg-accent opacity-40 blur-2xl"
        />
        <div className="relative">
          <CardEyebrow>
            แบบฟอร์มคำร้องทั้งหมด · {HUMI_REQUEST_CATALOG.length} ประเภท
          </CardEyebrow>
          <h2
            className={cn(
              'mt-2 max-w-2xl font-display font-semibold tracking-tight text-ink',
              'text-[length:var(--text-display-h2)] leading-[var(--text-display-h2--line-height)]'
            )}
          >
            เลือกแบบฟอร์มที่คุณต้องการยื่น
          </h2>
          <p className="mt-2 max-w-xl text-body text-ink-soft leading-relaxed">
            คำร้องทุกประเภทจะถูกส่งต่อไปยังผู้มีอำนาจอนุมัติโดยอัตโนมัติ
            คุณสามารถติดตามสถานะได้จากแท็บ &quot;คำร้องของฉัน&quot;
          </p>
        </div>
      </Card>

      {/* Inline form when template selected */}
      {selectedTemplate && selectedCatalog && fields && (
        <Card variant="raised" size="lg" className="mb-6 border border-accent/30">
          <div className="mb-5 flex items-center justify-between gap-3">
            <CardTitle>กรอกข้อมูล: {selectedCatalog.title}</CardTitle>
            <button
              type="button"
              onClick={() => { setSelectedTemplate(null); setFieldValues({}); setErrors({}); }}
              className="text-small text-ink-muted hover:text-ink"
            >
              ยกเลิก
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {fields.map((field) => (
              <div key={field.id} className="flex flex-col gap-1.5">
                <label htmlFor={field.id} className="text-small font-medium text-ink-soft">
                  {field.label} *
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    value={fieldValues[field.id] ?? ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    aria-invalid={!!errors[field.id]}
                    className={cn(inputClass, 'min-h-[80px] resize-y', errors[field.id] && 'border-[color:var(--color-warning)]')}
                  />
                ) : (
                  <input
                    id={field.id}
                    type="text"
                    value={fieldValues[field.id] ?? ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    aria-invalid={!!errors[field.id]}
                    className={cn(inputClass, errors[field.id] && 'border-[color:var(--color-warning)]')}
                  />
                )}
                {errors[field.id] && (
                  <p role="alert" className="flex items-center gap-1 text-[length:var(--text-eyebrow)] text-[color:var(--color-warning)]">
                    <AlertCircle size={12} aria-hidden />
                    {errors[field.id]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" block onClick={handleSubmit} className="sm:w-auto">
              ส่งคำร้อง
            </Button>
            <Button variant="ghost" block onClick={() => { setSelectedTemplate(null); setFieldValues({}); setErrors({}); }} className="sm:w-auto">
              ยกเลิก
            </Button>
          </div>
        </Card>
      )}

      {/* Catalog grid */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {HUMI_REQUEST_CATALOG.map((f) => {
          const Icon = ICONS[f.icon];
          const isSelected = selectedTemplate === f.id;
          return (
            <Card
              key={f.id}
              variant="raised"
              size="md"
              className={cn(
                'humi-card-lift',
                isSelected && 'ring-2 ring-accent ring-offset-2 ring-offset-surface'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  aria-hidden
                  className={cn(
                    'inline-flex h-11 w-11 items-center justify-center rounded-[12px]',
                    ACCENT_ICON_CLASS[f.accent]
                  )}
                >
                  <Icon size={20} />
                </span>
                <span className="rounded-full bg-canvas-soft px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted whitespace-nowrap">
                  SLA {f.sla}
                </span>
              </div>
              <CardTitle className="mt-3 text-[length:var(--text-body-lg)] leading-snug">
                {f.title}
              </CardTitle>
              <p className="mt-1 text-small text-ink-soft leading-relaxed">
                {f.subtitle}
              </p>
              <Button
                variant={isSelected ? 'secondary' : 'ghost'}
                block
                className="mt-4"
                trailingIcon={<ArrowRight size={13} />}
                onClick={() => setSelectedTemplate(isSelected ? null : f.id)}
              >
                {isSelected ? 'กำลังกรอก' : 'เริ่มกรอก'}
              </Button>
            </Card>
          );
        })}
      </section>
    </>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Approvals
// ────────────────────────────────────────────────────────────

function ApprovalsTab() {
  return (
    <Card variant="raised" size="lg">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <CardEyebrow>
            ในฐานะ ผู้จัดการฝ่ายบุคคล · สำนักงานใหญ่
          </CardEyebrow>
          <CardTitle className="mt-1">คำร้องที่รออนุมัติ</CardTitle>
        </div>
        <Button variant="ghost" leadingIcon={<Download size={14} />}>
          ส่งออก CSV
        </Button>
      </div>
      <ul role="list" className="divide-y divide-hairline">
        {HUMI_APPROVAL_QUEUE.map((r) => (
          <li
            key={r.id}
            className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Avatar name={r.who} tone={r.tone} size="sm" />
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-2 text-body font-semibold text-ink">
                  {r.who}
                  <span className="font-normal text-ink-muted">· {r.type}</span>
                  {r.urgent && (
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
                        'bg-warning-soft text-[color:var(--color-warning)]'
                      )}
                    >
                      ด่วน
                    </span>
                  )}
                </p>
                <p className="text-small text-ink-muted">
                  {r.role} · {r.sub} · {r.when}
                </p>
              </div>
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-2 sm:shrink-0 sm:flex-nowrap">
              <Button variant="ghost" size="sm" className="min-h-[44px] px-4">
                รายละเอียด
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="min-h-[44px] px-4"
                leadingIcon={<X size={14} />}
              >
                ปฏิเสธ
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="min-h-[44px] px-4"
                leadingIcon={<Check size={14} />}
              >
                อนุมัติ
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// ────────── helpers ──────────

const inputClass = cn(
  'w-full rounded-[var(--radius-md)] border border-hairline bg-surface px-3 py-2.5 text-body text-ink',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  'placeholder:text-ink-faint'
);

function TabButton({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        '-mb-px border-b-2 px-4 py-3 text-body font-medium transition-colors whitespace-nowrap',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        active
          ? 'border-accent text-ink'
          : 'border-transparent text-ink-muted hover:text-ink'
      )}
    >
      {children}
      {typeof count === 'number' && (
        <span className="ml-1.5 font-normal text-ink-muted">({count})</span>
      )}
    </button>
  );
}

// ACCENT_BAR_CLASS imported for tree-shaking predictability
void ACCENT_BAR_CLASS;

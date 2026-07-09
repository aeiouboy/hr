'use client';

// TeamOverviewDashboard — STA-245 + STA-249 + STA-255 (Time · Team management).
// The manager attendance dashboard: 5 COMPACT summary KPI cards (on-time rate /
// late scans / absences + missed scans / OT hours / selected period) plus:
//  • a PERIOD DROPDOWN — 21st→20th pay-period options bounded to +3 months
//    forward / −1 year back (periodOptions in lib/time/period), current period
//    default. STA-255 Safari fix: rendered with the custom-styled CustomSelect
//    listbox (a div/button component Safari cannot restyle), NOT a native <select>.
//  • ISOLATED per-card expansion (STA-255) — cards start compact; clicking a
//    card expands ONLY that card in place (accordion-per-card, the layout pushes
//    down smoothly via a grid-rows transition) to reveal its topic details
//    (per-employee late/absent, OT multiplier buckets + per-employee OT, leave).
// Numbers are persona-scoped like /roster and pinned to DEMO_TODAY — never
// wall-clock. Mockup only, HUMI tokens, NO-RED (pumpkin).

import { useMemo, useState, useSyncExternalStore } from 'react';
import { useLocale } from 'next-intl';
import {
  Clock,
  AlarmClock,
  UserX,
  Timer,
  CalendarDays,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import { Card, EmptyState } from '@/components/humi';
import { CustomSelect } from '@/components/humi/molecules/custom-select';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import { ALL_PORTED_EMPLOYEES, EMP_BY_LOGIN } from '@/lib/all-ported-employees';
import { pickRosterScope } from '@/lib/roster-scope';
import { ROSTER_ROWS } from '@/data/roster/mock';
import { DEMO_OT_EMPLOYEE } from '@/lib/demo-seed';
import { useOvertimeRequests, type OTRequest } from '@/stores/overtime-requests';
import {
  teamStats,
  teamDetail,
  OT_MULTIPLIERS,
  type OtMultiplier,
  type TeamStats,
} from '@/lib/time/team-stats';
import { periodOptions, demoToday } from '@/lib/time/period';
import { toUtcMidnight, formatWeekRangeBE, type WeekWindow } from '@/lib/time/week';

// SSR-safe client gate: getServerSnapshot → false, getSnapshot → true, so the
// persisted OT store is only read AFTER hydration (server + first client paint
// both see []), avoiding a hydration mismatch without a setState-in-effect.
const EMPTY_OT: readonly OTRequest[] = [];
const subscribeNoop = () => () => {};

/** Cap for the expanded per-employee detail lists (less-is-more; see memory). */
const DETAIL_CAP = 8;

/** Build a WeekWindow-shaped window spanning an arbitrary [start,end] (the
 *  whole-payroll-period window — teamStats/teamDetail only need {start,end,days}). */
function spanWindow(start: Date, end: Date): WeekWindow {
  const days: Date[] = [];
  for (const d = new Date(start.getTime()); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    days.push(new Date(d.getTime()));
  }
  return { start, end, days };
}

type Tone = 'accent' | 'warning' | 'danger' | 'indigo';

const TONE_CLASS: Record<Tone, { icon: string; value: string }> = {
  accent: { icon: 'bg-accent-soft text-accent', value: 'text-accent' },
  warning: { icon: 'bg-warning-soft text-warning', value: 'text-warning' },
  danger: {
    icon: 'bg-[var(--color-danger-soft)] text-[var(--color-danger)]',
    value: 'text-[var(--color-danger)]',
  },
  indigo: {
    icon: 'bg-[var(--color-accent-alt-soft)] text-[var(--color-accent-alt)]',
    value: 'text-[var(--color-accent-alt)]',
  },
};

// OT-multiplier chip tokens — NO-RED: x3 uses pumpkin (danger), never red.
const OT_CHIP_CLASS: Record<OtMultiplier, string> = {
  x1: 'bg-canvas-soft text-ink-muted border-hairline',
  'x1.5': 'bg-accent-soft text-accent border-accent',
  x2: 'bg-warning-soft text-warning border-warning',
  x3: 'bg-[var(--color-danger-soft)] text-[var(--color-danger)] border-[var(--color-danger)]',
};

const OT_CHIP_LABEL: Record<OtMultiplier, string> = {
  x1: 'X1',
  'x1.5': 'X1.5',
  x2: 'X2',
  x3: 'X3',
};

// ── Card registry ──────────────────────────────────────────────────────────
// Data-driven KPI card list: the grid below maps over this array instead of
// literal JSX, so a future card is one appended config object — no layout or
// markup surgery. `TeamOverviewCardContext` bundles everything a card body
// might need (the aggregated stats, locale flag, and the resolved period
// range label) so the registry can grow without changing this shape.
export type TeamOverviewCardContext = {
  stats: TeamStats;
  isTh: boolean;
  rangeLabel: string;
};

export interface TeamOverviewCard {
  id: string;
  testid: string;
  icon: LucideIcon;
  tone: Tone;
  label: (ctx: TeamOverviewCardContext) => string;
  value: (ctx: TeamOverviewCardContext) => string;
  sub: (ctx: TeamOverviewCardContext) => string;
  /** Extra content revealed in the card's EXPANDED state (STA-255 compact-first). */
  body?: (ctx: TeamOverviewCardContext) => React.ReactNode;
}

export const DEFAULT_TEAM_OVERVIEW_CARDS: TeamOverviewCard[] = [
  {
    id: 'on-time-rate',
    testid: 'kpi-on-time-rate',
    icon: Clock,
    tone: 'accent',
    label: ({ isTh }) => (isTh ? 'อัตราเข้างานตรงเวลา' : 'On-time rate'),
    value: ({ stats }) => `${stats.onTimeRatePct}%`,
    sub: ({ stats, isTh }) =>
      isTh
        ? `คำนวณจากทุกกะที่ตอกเข้า (${stats.onTime}/${stats.scheduledDays})`
        : `${stats.onTime} of ${stats.scheduledDays} scheduled shifts`,
  },
  {
    id: 'late-scans',
    testid: 'kpi-late-scans',
    icon: AlarmClock,
    tone: 'warning',
    label: ({ isTh }) => (isTh ? 'การสแกนเข้างานสาย' : 'Late scans'),
    value: ({ stats, isTh }) => (isTh ? `${stats.late} ครั้ง` : `${stats.late}`),
    sub: ({ isTh }) => (isTh ? 'ต้องการการตรวจสอบการตอก' : 'need punch review'),
  },
  {
    id: 'absences',
    testid: 'kpi-absences',
    icon: UserX,
    tone: 'danger',
    label: ({ isTh }) => (isTh ? 'การขาดงาน / ไม่แสกนนิ้ว' : 'Absences / missed scans'),
    value: ({ stats, isTh }) => (isTh ? `${stats.missedScans} ครั้ง` : `${stats.missedScans}`),
    sub: ({ stats, isTh }) =>
      isTh
        ? `ขาด ${stats.absent} · ไม่ครบ ${stats.mismatch} — หักค่าจ้างและประเมินผล`
        : `${stats.absent} absent · ${stats.mismatch} incomplete`,
  },
  {
    id: 'ot-hours',
    testid: 'kpi-ot-hours',
    icon: Timer,
    tone: 'indigo',
    label: ({ isTh }) => (isTh ? 'จำนวนชั่วโมงล่วงเวลา OT' : 'Overtime hours'),
    value: ({ stats, isTh }) => (isTh ? `${stats.otHours} ชม.` : `${stats.otHours} h`),
    sub: ({ isTh }) => (isTh ? 'แยกตามอัตราค่าล่วงเวลา' : 'by pay multiplier'),
    body: ({ stats, isTh }) => (
      <div className="flex flex-wrap gap-1.5">
        {OT_MULTIPLIERS.map((m) => (
          <span
            key={m}
            data-testid={`ot-mult-${m}`}
            className={cn(
              'inline-flex min-w-[3.25rem] flex-col items-center rounded-[var(--radius-sm)] border px-2 py-1',
              OT_CHIP_CLASS[m],
            )}
          >
            <span className="text-xs font-semibold uppercase tracking-wide">{OT_CHIP_LABEL[m]}</span>
            <span className="text-xs font-medium">
              {stats.otHoursByMultiplier[m]}
              {isTh ? ' ชม.' : 'h'}
            </span>
          </span>
        ))}
      </div>
    ),
  },
  {
    id: 'current-period',
    testid: 'kpi-current-period',
    icon: CalendarDays,
    tone: 'indigo',
    label: ({ isTh }) => (isTh ? 'ช่วงเวลาที่เลือก' : 'Selected period'),
    value: ({ rangeLabel }) => rangeLabel,
    sub: ({ stats, isTh }) =>
      isTh
        ? `มีวันหยุดนักขัตฤกษ์ ${stats.holidayCount} วัน · ลา ${stats.leaveCount} รายการ`
        : `${stats.holidayCount} public holiday(s) · ${stats.leaveCount} on leave`,
    body: ({ stats, isTh }) =>
      stats.holidayCount > 0 ? (
        <div className="text-xs font-medium text-[var(--color-danger)]">
          {isTh ? 'อัตราเงินพิเศษวันหยุด ×3' : 'Holiday premium ×3'}
        </div>
      ) : null,
  },
];

// ── Per-employee detail rows (rendered inside the expanded card) ────────────
type DetailRow = { empId: string; name: string; detail: string };

function DetailRows({ rows, isTh, testid }: { rows: DetailRow[]; isTh: boolean; testid: string }) {
  const shown = rows.slice(0, DETAIL_CAP);
  return (
    <div data-testid={testid} className="flex flex-col gap-1.5">
      {rows.length === 0 ? (
        <div className="text-xs text-ink-muted">{isTh ? 'ไม่มีรายการในช่วงนี้' : 'No items this period'}</div>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {shown.map((r) => (
            <li key={r.empId} className="flex items-center justify-between gap-3 text-small">
              <span className="truncate text-ink-soft">{r.name}</span>
              <span className="shrink-0 font-medium text-ink">{r.detail}</span>
            </li>
          ))}
        </ul>
      )}
      {rows.length > DETAIL_CAP && (
        <div className="text-xs text-ink-muted">
          {isTh ? `แสดง ${DETAIL_CAP} จาก ${rows.length}` : `Showing ${DETAIL_CAP} of ${rows.length}`}
        </div>
      )}
    </div>
  );
}

export function TeamOverviewDashboard({
  empIds: empIdsProp,
  cards = DEFAULT_TEAM_OVERVIEW_CARDS,
}: { empIds?: string[]; cards?: TeamOverviewCard[] } = {}) {
  const locale = useLocale();
  const isTh = locale !== 'en';

  // ── Persona scope (mirrors /roster) — narrow the cohort to the manager's slice.
  const roles = useAuthStore((s) => s.roles);
  const email = useAuthStore((s) => s.email);
  const currentEmpId = email ? EMP_BY_LOGIN[email] ?? null : null;
  const scope = useMemo(
    () => pickRosterScope(ALL_PORTED_EMPLOYEES, roles, currentEmpId, ROSTER_ROWS.length),
    [roles, currentEmpId],
  );
  const scopedIds = useMemo(() => {
    const pool = scope.employees.length ? [...scope.employees] : [...ALL_PORTED_EMPLOYEES];
    const scoped = pool.slice(0, Math.max(scope.visibleCount, 1)).map((e) => e.id);
    // Prepend the canonical OT-seeded demo employee so an OT figure is demonstrable.
    return Array.from(new Set([DEMO_OT_EMPLOYEE.id, ...scoped]));
  }, [scope]);
  const empIds = empIdsProp ?? scopedIds;

  // ── Period dropdown — 21st→20th options, −1yr … +3mo, current default.
  const options = useMemo(() => periodOptions(demoToday()), []);
  const [periodKey, setPeriodKey] = useState<string>(
    () => options.find((o) => o.isCurrent)?.key ?? options[0].key,
  );
  const selected = useMemo(
    () => options.find((o) => o.key === periodKey) ?? options[0],
    [options, periodKey],
  );
  const periodWindow = useMemo(
    () => spanWindow(toUtcMidnight(selected.start), toUtcMidnight(selected.end)),
    [selected],
  );

  // ── STA-255 isolated expansion — at most ONE card open at a time.
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // ── OT is store-backed (persisted); read it only after hydration so the SSR /
  //    first client paint (empty store) and the hydrated render agree.
  const storeOt = useOvertimeRequests((s) => s.requests);
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const otRows = hydrated ? storeOt : EMPTY_OT;

  const stats = useMemo(
    () => teamStats(periodWindow, empIds, otRows),
    [periodWindow, empIds, otRows],
  );

  // Only compute the granular per-employee rows while a card is open.
  const detail = useMemo(
    () => (expandedId ? teamDetail(periodWindow, empIds, otRows) : []),
    [expandedId, periodWindow, empIds, otRows],
  );

  // Best-effort display name: employee registry first, then live OT rows (which
  // carry employeeName for the demo-seeded EMP-* namespace), else the raw id.
  const resolveName = useMemo(() => {
    const m = new Map<string, string>();
    for (const e of ALL_PORTED_EMPLOYEES) {
      const en = `${e.firstNameEn ?? e.firstNameTh} ${e.lastNameEn ?? e.lastNameTh}`.trim();
      m.set(e.id, isTh ? `${e.firstNameTh} ${e.lastNameTh}` : en);
    }
    for (const r of otRows) {
      if (r.employeeName && !m.has(r.employeeId)) m.set(r.employeeId, r.employeeName);
    }
    return (id: string) => m.get(id) ?? id;
  }, [isTh, otRows]);

  const lateRows: DetailRow[] = detail
    .filter((d) => d.late > 0 || d.missedScans > 0)
    .sort((a, b) => b.late + b.missedScans - (a.late + a.missedScans))
    .map((d) => ({
      empId: d.empId,
      name: resolveName(d.empId),
      detail: isTh
        ? `สาย ${d.late} · ขาด/ไม่ครบ ${d.missedScans}`
        : `${d.late} late · ${d.missedScans} missed`,
    }));

  const absenceRows: DetailRow[] = detail
    .filter((d) => d.missedScans > 0)
    .sort((a, b) => b.missedScans - a.missedScans)
    .map((d) => ({
      empId: d.empId,
      name: resolveName(d.empId),
      detail: isTh ? `ขาด/ไม่ครบ ${d.missedScans}` : `${d.missedScans} missed`,
    }));

  const otDetailRows: DetailRow[] = detail
    .filter((d) => d.otHours > 0)
    .sort((a, b) => b.otHours - a.otHours)
    .map((d) => ({
      empId: d.empId,
      name: resolveName(d.empId),
      detail: isTh ? `${d.otHours} ชม.` : `${d.otHours} h`,
    }));

  const leaveRows: DetailRow[] = detail
    .filter((d) => d.leaveDays > 0)
    .sort((a, b) => b.leaveDays - a.leaveDays)
    .map((d) => ({
      empId: d.empId,
      name: resolveName(d.empId),
      detail: isTh ? `${d.leaveDays} วัน` : `${d.leaveDays} d`,
    }));

  const rangeLabel = formatWeekRangeBE(periodWindow.start, periodWindow.end, isTh ? 'th' : 'en');

  /** Topic detail revealed inside each expanded card (STA-255 isolated expansion). */
  function cardDetail(cardId: string): React.ReactNode {
    switch (cardId) {
      case 'on-time-rate':
        return (
          <div className="text-xs text-ink-muted">
            {isTh
              ? `ตรงเวลา ${stats.onTime} จาก ${stats.scheduledDays} กะ · สาย ${stats.late} · ขาด/ไม่ครบ ${stats.missedScans}`
              : `${stats.onTime} on time of ${stats.scheduledDays} shifts · ${stats.late} late · ${stats.missedScans} missed`}
          </div>
        );
      case 'late-scans':
        return <DetailRows rows={lateRows} isTh={isTh} testid="detail-late" />;
      case 'absences':
        return <DetailRows rows={absenceRows} isTh={isTh} testid="detail-absent" />;
      case 'ot-hours':
        return <DetailRows rows={otDetailRows} isTh={isTh} testid="detail-ot" />;
      case 'current-period':
        return <DetailRows rows={leaveRows} isTh={isTh} testid="detail-leave" />;
      default:
        return null;
    }
  }

  if (empIds.length === 0) {
    return (
      <EmptyState
        icon={UserX}
        titleTh="ยังไม่มีสมาชิกในทีม"
        titleEn="No team members yet"
        descTh="เมื่อมีพนักงานในทีมของคุณ สรุปการเข้างานจะแสดงที่นี่"
        descEn="Once your team has members, their attendance summary appears here."
      />
    );
  }

  return (
    <section
      data-testid="team-overview-dashboard"
      aria-label={isTh ? 'ภาพรวมทีม' : 'Team overview'}
      className="flex flex-col gap-5"
    >
      {/* Period dropdown — STA-255 Safari fix: CustomSelect (custom-styled
          div/listbox that Safari cannot replace with its native component). */}
      <div className="flex flex-wrap items-center gap-3" data-testid="period-select">
        <span className="text-small font-medium text-ink-muted">
          {isTh ? 'ช่วงเวลา' : 'Period'}
        </span>
        <div className="w-64">
          <CustomSelect
            value={periodKey}
            options={options.map((o) => {
              const label = formatWeekRangeBE(
                toUtcMidnight(o.start),
                toUtcMidnight(o.end),
                isTh ? 'th' : 'en',
              );
              return {
                value: o.key,
                label: o.isCurrent ? `${label} ${isTh ? '• รอบปัจจุบัน' : '• Current'}` : label,
              };
            })}
            onChange={setPeriodKey}
            aria-label={isTh ? 'เลือกช่วงเวลา' : 'Select period'}
          />
        </div>
        <span className="inline-flex items-center gap-1.5 text-small text-ink-muted">
          <CalendarDays size={14} aria-hidden />
          <span data-testid="period-range">{rangeLabel}</span>
        </span>
      </div>

      {/* Summary cards — COMPACT initial state; clicking a card expands ONLY that
          card in place (grid-rows transition pushes the layout down smoothly). */}
      <div className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => {
          const ctx: TeamOverviewCardContext = { stats, isTh, rangeLabel };
          const c = TONE_CLASS[card.tone];
          const isOpen = expandedId === card.id;
          return (
            <Card key={card.id} variant="raised" size="md">
              <div data-testid={card.testid} className="flex flex-col">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`card-detail-${card.id}`}
                  onClick={() => setExpandedId((cur) => (cur === card.id ? null : card.id))}
                  className="flex w-full flex-col gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-small font-medium text-ink-muted">{card.label(ctx)}</div>
                    <span
                      className={cn(
                        'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-md)]',
                        c.icon,
                      )}
                      aria-hidden
                    >
                      <card.icon size={16} />
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className={cn('font-display text-xl font-semibold tracking-tight', c.value)}>
                      {card.value(ctx)}
                    </div>
                    <ChevronDown
                      size={15}
                      aria-hidden
                      className={cn('shrink-0 text-ink-faint transition-transform', isOpen && 'rotate-180')}
                    />
                  </div>
                </button>
                {/* Smooth in-place expansion: grid-rows 0fr→1fr transition. */}
                <div
                  id={`card-detail-${card.id}`}
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    {isOpen && (
                      <div data-testid={`card-detail-${card.id}`} className="flex flex-col gap-3 pt-3">
                        <div className="text-xs text-ink-muted">{card.sub(ctx)}</div>
                        {card.body?.(ctx)}
                        {cardDetail(card.id)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Persona scope note (only when the cohort is narrowed and no explicit override) */}
      {!empIdsProp && scope.mode !== 'all' && (
        <div
          role="note"
          className="rounded-[var(--radius-md)] border border-hairline bg-canvas-soft px-4 py-2.5 text-small text-ink-muted"
        >
          {scope.mode === 'bu'
            ? isTh
              ? 'แสดงเฉพาะสมาชิกในหน่วยงานของคุณ'
              : 'Showing your business unit only'
            : isTh
              ? 'แสดงเฉพาะสมาชิกในทีมของคุณ'
              : 'Showing your team only'}
        </div>
      )}
    </section>
  );
}

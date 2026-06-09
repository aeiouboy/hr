'use client';

// /time/shift-schedule — Weekly Roster Grid (wiki §7.2). The grid shows the
// team (rows) × 7 days of the current period (cols); cells default from the
// Working Hour Template (the single source) and a manager can OVERRIDE per cell
// or APPLY a template to the whole team. Edits become a DRAFT, are VALIDATED
// (DWS red/green/yellow via a rosterRowToSchedule bridge), then PUBLISHED with
// an effective date. Mockup: in-memory non-persisted store, manager-gated, no
// backend, TH/EN, Humi tokens (pumpkin only for understaffing/violations).

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Check, Users, ShieldCheck, Megaphone } from 'lucide-react';
import { Card, Button, Modal } from '@/components/humi';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import { hasAnyRole } from '@/lib/rbac';
import { SCHEDULE_TEMPLATES } from '@/lib/time/schedule-template';
import { validateDwsPeriod, dwsLabel, DWS_LEVEL_CLASS, type DwsLevel } from '@/lib/time/dws-validation';
import { currentPeriod } from '@/lib/time/period';
import {
  weekDates as buildWeekDates,
  seedRosterFromPlan,
  rosterRowToSchedule,
} from '@/lib/time/roster';
import { useShiftRosterStore } from '@/stores/shift-roster';
import { RosterGrid } from '@/components/roster/RosterGrid';
import { CoverageRow } from '@/components/roster/CoverageRow';
import { Legend } from '@/components/roster/Legend';
import { ShiftPopover } from '@/components/roster/ShiftPopover';

// Demo team for one store branch — a realistic retail mix (shift lead, senior
// associate, sales, cashier, part-timer, stock). Roles surface in the grid's
// sticky column so the roster reads like a real branch schedule.
const DEMO_TEAM: { id: string; nameTh: string; nameEn: string; roleTh: string; roleEn: string }[] = [
  { id: 'EMP101', nameTh: 'ก้องภพ วัฒนกุล', nameEn: 'Kongphop W.', roleTh: 'หัวหน้ากะ', roleEn: 'Shift lead' },
  { id: 'EMP102', nameTh: 'นภา ศรีสุข', nameEn: 'Napha S.', roleTh: 'พนักงานขายอาวุโส', roleEn: 'Senior associate' },
  { id: 'EMP103', nameTh: 'วิภา จันทร์เพ็ญ', nameEn: 'Wipha C.', roleTh: 'พนักงานขาย', roleEn: 'Sales associate' },
  { id: 'EMP104', nameTh: 'ธีรพงษ์ มั่นคง', nameEn: 'Teerapong M.', roleTh: 'แคชเชียร์', roleEn: 'Cashier' },
  { id: 'EMP105', nameTh: 'อรุณี พรหมมา', nameEn: 'Arunee P.', roleTh: 'พาร์ทไทม์', roleEn: 'Part-time' },
  { id: 'EMP106', nameTh: 'ศักดิ์ชัย ใจกล้า', nameEn: 'Sakchai J.', roleTh: 'พนักงานคลัง', roleEn: 'Stock' },
];

// Realistic weekly roster (codes by day-of-week slot 0..6 = the displayed week,
// Thu→Wed for the current period). Rotating early/standard/late shifts with
// staggered day-offs ('F') so daily coverage stays balanced (4–5 of 6 on duty).
//   9A0700 early 07–16 · 8A0800 standard 08–17 · 8A1000 late 10–19 · 4C0800 part-time 08–12
const DEMO_WEEK_PLAN: Record<string, (string | null)[]> = {
  EMP101: ['8A0800', '8A0800', '8A1000', 'F', '8A0800', '8A0800', '8A1000'],
  EMP102: ['8A1000', '8A1000', '8A0800', '8A0800', 'F', '8A1000', '8A1000'],
  EMP103: ['9A0700', '9A0700', '9A0700', '8A1000', '8A1000', 'F', '8A0800'],
  EMP104: ['8A0800', 'F', '8A0800', '8A0800', '8A0800', '9A0700', '9A0700'],
  EMP105: ['4C0800', '4C0800', 'F', '4C0800', '4C0800', '4C0800', 'F'],
  EMP106: ['F', '8A0800', '8A1000', '8A1000', '8A0800', '8A0800', 'F'],
};

const TEMPLATE_KEYS = Object.keys(SCHEDULE_TEMPLATES);

const MONTH_TH = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const MONTH_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function weekLabel(startISO: string, endISO: string, isTh: boolean): string {
  const s = new Date(startISO + 'T00:00:00Z');
  const e = new Date(endISO + 'T00:00:00Z');
  const months = isTh ? MONTH_TH : MONTH_EN;
  const prefix = isTh ? 'สัปดาห์ ' : 'Week of ';
  if (s.getUTCMonth() === e.getUTCMonth()) {
    return `${prefix}${s.getUTCDate()}–${e.getUTCDate()} ${months[e.getUTCMonth()]}`;
  }
  return `${prefix}${s.getUTCDate()} ${months[s.getUTCMonth()]} – ${e.getUTCDate()} ${months[e.getUTCMonth()]}`;
}

interface Warning {
  empId: string;
  name: string;
  level: Exclude<DwsLevel, 'green' | 'ok'>;
  date: string;
  reason: string;
}

export default function ShiftSchedulePage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'th';
  const isTh = locale === 'th';
  const roles = useAuthStore((s) => s.roles);
  const canReview = hasAnyRole(roles, ['manager', 'hrbp', 'spd', 'hr_admin', 'hr_manager']);

  const wd = useMemo(() => buildWeekDates(currentPeriod().start), []);
  const period = useMemo(() => currentPeriod(), []);

  const roster = useShiftRosterStore((s) => s.roster);
  const draft = useShiftRosterStore((s) => s.draft);
  const seed = useShiftRosterStore((s) => s.seed);
  const setCell = useShiftRosterStore((s) => s.setCell);
  const applyTemplateToAll = useShiftRosterStore((s) => s.applyTemplateToAll);
  const markPublished = useShiftRosterStore((s) => s.markPublished);

  const [massTemplate, setMassTemplate] = useState<string>(TEMPLATE_KEYS[0]);
  const [effectiveDate, setEffectiveDate] = useState('2026-06-21');
  const [toast, setToast] = useState<string | null>(null);
  const [picker, setPicker] = useState<{ emp: string; date: string } | null>(null);
  const [warnings, setWarnings] = useState<Warning[] | null>(null);
  const [publishOpen, setPublishOpen] = useState(false);

  // Seed the (non-persisted) roster from the realistic weekly plan on mount.
  useEffect(() => {
    seed(seedRosterFromPlan(DEMO_WEEK_PLAN, DEMO_TEAM, wd));
  }, [seed, wd]);

  const flash = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 3000);
  };

  const onApplyAll = () => {
    applyTemplateToAll(DEMO_TEAM, massTemplate, wd);
    flash(isTh ? 'ใช้รูปแบบกับทั้งทีมแล้ว' : 'Applied template to the whole team');
  };

  const onValidate = () => {
    const found: Warning[] = [];
    for (const emp of DEMO_TEAM) {
      const row = roster[emp.id] ?? {};
      const v = validateDwsPeriod(rosterRowToSchedule(row, wd));
      v.perDay.forEach((r, i) => {
        if (r.level === 'red' || r.level === 'yellow') {
          found.push({
            empId: emp.id,
            name: isTh ? emp.nameTh : emp.nameEn,
            level: r.level,
            date: wd[i],
            reason: isTh ? r.reasonTh : r.reasonEn,
          });
        }
      });
    }
    setWarnings(found);
  };

  const touchedEmps = useMemo(() => {
    const set = new Set<string>();
    for (const key of draft) set.add(key.split('|')[0]);
    return Array.from(set);
  }, [draft]);

  const publishTargets = touchedEmps.length > 0 ? touchedEmps : DEMO_TEAM.map((e) => e.id);

  const onConfirmPublish = () => {
    markPublished();
    setPublishOpen(false);
    flash(
      isTh
        ? `ประกาศตารางกะให้ ${publishTargets.length} คน (มีผล ${effectiveDate})`
        : `Published to ${publishTargets.length} employee(s) (effective ${effectiveDate})`,
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <nav className="flex items-center gap-1 text-xs text-ink-muted" aria-label="breadcrumb">
        <Link href={`/${locale}/time`} className="hover:text-ink transition">{isTh ? 'เวลางาน' : 'Time'}</Link>
        <span aria-hidden>›</span>
        <span className="text-ink font-medium">{isTh ? 'ตารางกะทีม' : 'Team shift schedule'}</span>
      </nav>

      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-0.5">{isTh ? 'สำหรับผู้จัดการ' : 'For managers'}</p>
        <h1 className="text-2xl font-bold text-ink">{isTh ? 'ตารางกะทีม' : 'Team shift schedule'}</h1>
        <p className="text-sm text-ink-muted mt-1">{isTh ? 'มุมมองสัปดาห์ · คลิกช่องเพื่อกำหนดกะ ตรวจสอบกฎ แล้วประกาศให้พนักงาน' : 'Weekly grid · click a cell to assign a shift, validate, then publish to the team.'}</p>
      </header>

      {!canReview ? (
        <Card>
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <Users className="text-ink-faint" size={28} aria-hidden />
            <p className="text-body text-ink-muted">{isTh ? 'เฉพาะผู้จัดการ/HR เท่านั้น' : 'Managers / HR only'}</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Top bar */}
          <Card>
            <div className="flex flex-wrap items-end gap-3">
              <div className="mr-2">
                <p className="text-xs text-ink-muted">{isTh ? 'ช่วงสัปดาห์' : 'Week'}</p>
                <p className="text-base font-semibold text-ink" data-testid="week-label">
                  {weekLabel(wd[0], wd[6], isTh)}
                </p>
              </div>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-ink-muted">{isTh ? 'รูปแบบกะ' : 'Template'}</span>
                <select
                  value={massTemplate}
                  onChange={(e) => setMassTemplate(e.target.value)}
                  className="rounded border border-hairline bg-surface px-3 py-2 text-sm text-ink"
                  aria-label={isTh ? 'เลือกรูปแบบกะ' : 'Select template'}
                >
                  {TEMPLATE_KEYS.map((k) => (
                    <option key={k} value={k}>{isTh ? SCHEDULE_TEMPLATES[k].nameTh : SCHEDULE_TEMPLATES[k].nameEn}</option>
                  ))}
                </select>
              </label>
              <Button variant="secondary" size="sm" onClick={onApplyAll}>
                {isTh ? 'ใช้กับทั้งทีม' : 'Apply to all'}
              </Button>
              <div className="flex-1" />
              <Button variant="secondary" size="sm" onClick={onValidate} leadingIcon={<ShieldCheck size={14} />}>
                {isTh ? 'ตรวจสอบกฎ' : 'Validate'}
              </Button>
              <Button variant="primary" size="sm" onClick={() => setPublishOpen(true)} leadingIcon={<Megaphone size={14} />}>
                {isTh ? 'ประกาศ' : 'Publish'}
              </Button>
            </div>
          </Card>

          {/* Grid + coverage + legend */}
          <Card>
            <div className="space-y-3">
              <RosterGrid
                team={DEMO_TEAM}
                weekDates={wd}
                roster={roster}
                draft={draft}
                onCellClick={(emp, date) => setPicker({ emp, date })}
                isTh={isTh}
              />
              <CoverageRow weekDates={wd} roster={roster} isTh={isTh} />
              <Legend isTh={isTh} />
            </div>
          </Card>

          {/* Validation warnings */}
          {warnings !== null && (
            <Card>
              {warnings.length === 0 ? (
                <div className="flex items-center gap-2 rounded-[var(--radius-md)] bg-success-soft px-3 py-2 text-sm font-medium text-success" data-testid="validate-pass">
                  <Check size={16} aria-hidden />
                  {isTh ? 'ผ่าน — ไม่พบปัญหา' : 'Passed — no issues found'}
                </div>
              ) : (
                <div className="space-y-2" data-testid="validate-warnings">
                  <p className="text-sm font-semibold text-ink">
                    {isTh ? `พบ ${warnings.length} รายการที่ต้องตรวจสอบ` : `${warnings.length} item(s) need review`}
                  </p>
                  <ul className="space-y-1">
                    {warnings.map((w, i) => (
                      <li key={`${w.empId}-${w.date}-${i}`} className="flex items-center gap-2 text-sm text-ink">
                        <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', DWS_LEVEL_CLASS[w.level])}>
                          {dwsLabel(w.level, isTh)}
                        </span>
                        <span className="text-ink-muted">{w.name} · {w.date}</span>
                        <span>{w.reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          )}
        </>
      )}

      {/* Shift popover (anchored as a centered floating panel for the mockup) */}
      {picker && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-ink/20"
          onClick={() => setPicker(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ShiftPopover
              isTh={isTh}
              onClose={() => setPicker(null)}
              onPick={(code) => {
                setCell(picker.emp, picker.date, code);
                setPicker(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Publish modal */}
      <Modal
        open={publishOpen}
        onClose={() => setPublishOpen(false)}
        title={isTh ? 'ประกาศตารางกะ' : 'Publish schedule'}
      >
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            {isTh
              ? `จะประกาศตารางกะให้พนักงาน ${publishTargets.length} คน และแจ้งเตือนพนักงาน`
              : `This will publish the schedule to ${publishTargets.length} employee(s) and notify them.`}
          </p>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-ink-muted">{isTh ? 'วันที่มีผล' : 'Effective date'}</span>
            <input
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              className="rounded border border-hairline bg-surface px-3 py-2 text-sm text-ink"
              data-testid="publish-effective-date"
            />
          </label>
          <p className="text-xs text-ink-faint">
            {isTh ? `ช่วงตารางกะ: ${period.start} – ${period.end}` : `Schedule period: ${period.start} – ${period.end}`}
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setPublishOpen(false)}>
              {isTh ? 'ยกเลิก' : 'Cancel'}
            </Button>
            <Button variant="primary" size="sm" onClick={onConfirmPublish} data-testid="publish-confirm">
              {isTh ? 'ยืนยันการประกาศ' : 'Confirm publish'}
            </Button>
          </div>
        </div>
      </Modal>

      {toast && (
        <div role="status" aria-live="polite" className={cn('fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-[var(--radius-md)] px-4 py-3', 'bg-ink text-canvas shadow-[var(--shadow-lg)] text-body font-medium')}>
          <Check size={16} aria-hidden /> {toast}
        </div>
      )}
    </div>
  );
}

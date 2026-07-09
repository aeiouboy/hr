'use client';

// /time/timesheet — My Timesheet (STA-195). A 5-tab document mirroring the BA mock:
//   Schedule · Summary · Time Result · Clock Log (GPS) · Messages.
// Each tab is a component under ./_components. Deterministic seeds, no backend,
// Humi tokens only; danger / out-of-radius / noti-badge = pumpkin, never red.

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Card } from '@/components/humi';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/date';
import { useAuthStore } from '@/stores/auth-store';
import { resolveCurrentEmpId } from '@/lib/scope-filter';
import { getEmployeeTimeAttrs } from '@/lib/time/employee-time-attrs';
import { currentPeriod, periodOptions, demoToday } from '@/lib/time/period';
import { CustomSelect } from '@/components/humi/molecules/custom-select';
import { getAttendanceForPeriod } from '@/lib/time/attendance-seed';
import { periodLateSummary } from '@/lib/time/attendance-math';
import { getClockLogForPeriod, clockLogWarnCount } from '@/lib/time/clock-log-seed';
import { fmtPeriodChip } from './_components/format';
import { ScheduleTab } from './_components/ScheduleTab';
import { SummaryTab } from './_components/SummaryTab';
import { TimeResultTab } from './_components/TimeResultTab';
import { ClockLogTab } from './_components/ClockLogTab';
import { MessagesTab, type TimesheetMessage } from './_components/MessagesTab';

type TabKey = 'schedule' | 'summary' | 'result' | 'gps' | 'messages';

export default function TimesheetPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'th';
  const isTh = locale === 'th';
  const t = useTranslations('timesheet');

  const userId = useAuthStore((s) => s.userId);
  const email = useAuthStore((s) => s.email);
  const empId = resolveCurrentEmpId(email) ?? userId ?? 'EMP001';
  const attrs = getEmployeeTimeAttrs(empId);
  const isClocking = attrs.employeeType === 'clocking';

  const period = useMemo(() => currentPeriod(demoToday()), []);
  // STA-239 (ticket 1) — period selector: −12 cycles back … +3 forward, current
  // pre-selected. Only the current demo period carries seeded attendance, so the
  // Summary tab reacts to the selection; other tabs stay pinned to the demo period.
  const periods = useMemo(() => periodOptions(demoToday()), []);
  const [periodKey, setPeriodKey] = useState(
    () => periodOptions(demoToday()).find((o) => o.isCurrent)!.key,
  );
  const selectedPeriod = periods.find((o) => o.key === periodKey) ?? periods.find((o) => o.isCurrent)!;
  const days = useMemo(() => getAttendanceForPeriod(empId), [empId]);
  const lateSummary = useMemo(() => periodLateSummary(days), [days]);
  const clockLog = useMemo(() => getClockLogForPeriod(empId), [empId]);
  const warnCount = useMemo(() => clockLogWarnCount(clockLog), [clockLog]);

  const messages = useMemo<TimesheetMessage[]>(() => {
    const list: TimesheetMessage[] = [];
    const src = isTh ? 'ระบบ' : 'System';
    const fmt = (iso: string) => formatDate(iso, 'medium', locale);

    if (lateSummary.lateDays > 0) {
      const iso = '2026-06-02';
      list.push({
        level: 'warning',
        badgeTh: 'แจ้งเตือนมาสาย', badgeEn: 'Late Warning',
        titleTh: `บันทึกมาสาย ${lateSummary.lateDays} ครั้งในรอบนี้`,
        titleEn: `${lateSummary.lateDays} late arrival(s) this period`,
        descTh: `รวมสาย ${lateSummary.totalLateMin} นาที — หากสายเกินเกณฑ์จะส่งผลต่อ Allowance`,
        descEn: `${lateSummary.totalLateMin} min late in total — exceeding the threshold affects your allowance.`,
        date: `${src} · ${fmt(iso)}`,
        dateRaw: iso,
      });
    }
    if (warnCount > 0) {
      const iso = '2026-05-28';
      list.push({
        level: 'warning',
        badgeTh: 'นอกรัศมี GPS', badgeEn: 'GPS out of radius',
        titleTh: `พบการลงเวลานอกรัศมี ${warnCount} ครั้ง`,
        titleEn: `${warnCount} punch(es) outside the geofence`,
        descTh: 'ตรวจสอบตำแหน่งการลงเวลาในแท็บ Clock Log',
        descEn: 'Review the punch locations in the Clock Log tab.',
        date: `${src} · ${fmt(iso)}`,
        dateRaw: iso,
      });
    }
    {
      const iso = '2026-06-05';
      list.push({
        level: 'error',
        badgeTh: 'ผิดพลาด', badgeEn: 'Error',
        titleTh: 'ตอกบัตรออกไม่สำเร็จ',
        titleEn: 'Clock-out punch failed',
        descTh: `ระบบไม่สามารถบันทึกเวลาออกงานเมื่อวันที่ ${fmt(iso)} — กรุณาแจ้งหัวหน้างานเพื่อแก้ไขเวลาย้อนหลัง`,
        descEn: `The system could not record your clock-out on ${fmt(iso)} — ask your manager to correct the time.`,
        date: `${src} · ${fmt(iso)}`,
        dateRaw: iso,
      });
    }
    {
      const iso = '2026-05-30';
      list.push({
        level: 'error',
        badgeTh: 'ผิดพลาด', badgeEn: 'Error',
        titleTh: 'พบรายการลงเวลาซ้ำซ้อน',
        titleEn: 'Duplicate clock-in detected',
        descTh: `ระบบพบการลงเวลาเข้างานซ้ำในวันที่ ${fmt(iso)} — กรุณาแจ้งหัวหน้างานเพื่อตรวจสอบ`,
        descEn: `The system detected a duplicate clock-in on ${fmt(iso)} — ask your manager to review it.`,
        date: `${src} · ${fmt(iso)}`,
        dateRaw: iso,
      });
    }
    {
      const iso = '2026-06-01';
      list.push({
        level: 'approve',
        badgeTh: 'อนุมัติแล้ว', badgeEn: 'Approved',
        titleTh: 'คำขอ OT ได้รับการอนุมัติแล้ว',
        titleEn: 'Your OT request has been approved',
        descTh: `OT วันที่ ${fmt(iso)} เวลา 19:00–21:00 ได้รับการอนุมัติจากหัวหน้างานแล้ว`,
        descEn: `OT on ${fmt(iso)}, 19:00–21:00 has been approved by your manager.`,
        date: `${fmt(iso)} · 09:15`,
        dateRaw: iso,
      });
    }
    {
      const iso = '2026-05-27';
      list.push({
        level: 'approve',
        badgeTh: 'อนุมัติแล้ว', badgeEn: 'Approved',
        titleTh: 'คำขอแก้ไขเวลาลงเวลาได้รับการอนุมัติแล้ว',
        titleEn: 'Your time correction request has been approved',
        descTh: `รายการแก้ไขเวลาลงเวลาวันที่ ${fmt(iso)} ได้รับการอนุมัติจากหัวหน้างานแล้ว`,
        descEn: `Your punch-time correction for ${fmt(iso)} has been approved by your manager.`,
        date: `${fmt(iso)} · 10:20`,
        dateRaw: iso,
      });
    }
    {
      const iso = '2026-05-25';
      list.push({
        level: 'information',
        badgeTh: 'ประกาศ', badgeEn: 'Announcement',
        titleTh: 'ปรับปรุงตารางเวลาสำหรับรอบถัดไป',
        titleEn: 'Next period schedule update',
        descTh: 'ฝ่ายบุคคลได้อัปเดตตารางกะสำหรับรอบเดือนถัดไป กรุณาตรวจสอบแท็บ Schedule',
        descEn: 'HR has updated the shift schedule for the next period. Please review the Schedule tab.',
        date: `${src} · ${fmt(iso)}`,
        dateRaw: iso,
      });
    }
    list.push({
      level: 'information',
      badgeTh: 'พร้อมส่ง', badgeEn: 'Ready',
      titleTh: 'ข้อมูลรอบนี้พร้อมให้ผู้จัดการตรวจสอบ',
      titleEn: 'This period is ready for manager review.',
      descTh: 'ระบบรวบรวมเวลาเข้า-ออกและผลคำนวณของรอบนี้เรียบร้อยแล้ว',
      descEn: 'Attendance and computed results for this period have been compiled.',
      date: `${src} · ${fmt(period.end)}`,
      dateRaw: period.end,
    });
    return list;
  }, [lateSummary, warnCount, isTh, locale, period.end]);

  const [tab, setTab] = useState<TabKey>('schedule');

  const TABS: { key: TabKey; label: string; badge?: number }[] = [
    { key: 'schedule', label: t('tabs.schedule') },
    { key: 'summary', label: t('tabs.summary') },
    { key: 'result', label: t('tabs.result') },
    { key: 'gps', label: t('tabs.gps'), badge: warnCount },
    { key: 'messages', label: t('tabs.messages'), badge: messages.length },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-ink-muted" aria-label="breadcrumb">
        <Link href={`/${locale}/time`} className="transition hover:text-ink">{isTh ? 'เวลางาน' : 'Time'}</Link>
        <span aria-hidden>›</span>
        <span className="font-medium text-ink">{t('title')}</span>
      </nav>

      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-ink-muted">{t('eyebrow')}</p>
          <h1 className="text-2xl font-bold text-ink">{t('title')}</h1>
        </div>
        {/* STA-239 — period DROPDOWN (replaces the static chip): pick any of the
            last 12 / next 3 payroll cycles (21st → 20th). */}
        <div className="w-60" data-testid="period-selector">
          <CustomSelect
            value={periodKey}
            options={periods.map((o) => ({
              value: o.key,
              label: fmtPeriodChip(o.start, o.end, isTh),
            }))}
            onChange={setPeriodKey}
            aria-label={isTh ? 'เลือกกะ/รอบเวลา' : 'Select pay period'}
          />
        </div>
      </header>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 border-b border-hairline" role="tablist">
        {TABS.map((tb) => (
          <button
            key={tb.key}
            role="tab"
            aria-selected={tab === tb.key}
            onClick={() => setTab(tb.key)}
            className={cn(
              '-mb-px flex items-center gap-1.5 border-b-2 px-4 py-2 text-sm font-medium transition-colors',
              tab === tb.key ? 'border-accent text-accent' : 'border-transparent text-ink-muted hover:text-ink',
            )}
          >
            {tb.label}
            {typeof tb.badge === 'number' && tb.badge > 0 && (
              <span className="rounded-full bg-danger-soft px-1.5 py-0.5 text-xs font-semibold text-danger">{tb.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* Non-clocking gate */}
      {!isClocking ? (
        <Card>
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <Clock className="text-ink-faint" size={28} aria-hidden />
            <p className="text-sm text-ink-muted">{t('nonClocking')}</p>
          </div>
        </Card>
      ) : (
        <>
          {tab === 'schedule' && <ScheduleTab empId={empId} isTh={isTh} period={period} />}
          {tab === 'summary' && (
            <SummaryTab
              empId={empId}
              isTh={isTh}
              period={{ start: selectedPeriod.start, end: selectedPeriod.end }}
              isCurrentPeriod={selectedPeriod.isCurrent}
            />
          )}
          {tab === 'result' && <TimeResultTab empId={empId} isTh={isTh} />}
          {tab === 'gps' && <ClockLogTab entries={clockLog} isTh={isTh} />}
          {tab === 'messages' && <MessagesTab messages={messages} isTh={isTh} />}
        </>
      )}
    </div>
  );
}

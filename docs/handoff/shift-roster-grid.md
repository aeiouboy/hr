# Handoff — Shift Scheduling: Weekly Roster Grid (slice 1+2)

**Status:** plan APPROVED by consensus (Architect + Critic ×3), **NOT yet built**. Ready to execute.
**Date:** 2026-06-09 · **Branch:** `feat/shift-roster-grid` (off master `d349ee6e`) · **Worktree:** `/Users/tachongrak/Projects/hr-roster`
**Full plan:** `.omc/plans/shift-roster-grid.md` in this worktree (gitignored — content mirrored below).

---

## Context: what shipped this session (all merged to master)
The Time module got the ccg "top set" delivered as 4 PRs:
- **#255** exception-first hero + manager "Needs attention" inbox (`lib/time/exceptions.ts`).
- **#257** inline time-correction journey (`<TimeCorrectionForm>`, `correction-overlay.ts`; edit on the row → /quick-approve → approve reflects in hero).
- **#259** mobile clock-in/out (`/time/clock`, `stores/clock-punches.ts`).
- **#261** leave-balance progress cards on the timesheet Time Off tab (`leaveBalanceCard`).

Then a **ccg on "การจัดกะ" (shift scheduling)**: Codex CLI failed (`agents.max_threads`), Gemini + Claude synthesized → the Weekly Roster Grid direction below. (Note per memory: **payroll is owned by another team** — the remaining ccg "OT/holiday pay rules in Results" item is OUT of scope.)

## Resume how-to
```
# worktree already exists with node_modules symlinked to the repo-root install
cd /Users/tachongrak/Projects/hr-roster/src/frontend
npx vitest run src/lib/time        # tests
npm run build                      # typecheck gate
npx next dev --port 3100           # dev (the `dev` script hardcodes :3000)
```
Reuse the worktree-deps trick: npm-workspace deps live at the repo root; this worktree's `node_modules` is a symlink to `/Users/tachongrak/Projects/hr/node_modules`. Remove the symlink before `git worktree remove`.

Playwright auth seeding for manager surfaces: seed `humi-auth` via `addInitScript` (role `spd` → emp-001, clocking) AND route-block `**/api/auth/session` → `{}` (else AuthSync clobbers the seeded role). Screenshot via `browser_run_code_unsafe` + `page.screenshot({path})`.

---

## The approved plan (buildable)

### Goal
Replace the per-row template-dropdown table on `/time/shift-schedule` with a **weekly roster grid** (employees × the 7 days from `currentPeriod().start`): colored shift cells, click-popover assignment, a coverage row, and a draft→validate→publish journey. Manager-gated, TH/EN, Humi tokens (no red), mockup (no backend).

### Verified baseline (master)
- `src/app/[locale]/time/shift-schedule/page.tsx` (163 ln, manager gate `hasAnyRole(...,['manager','hrbp','spd','hr_admin','hr_manager'])`); only inbound ref = nav tile `time/page.tsx:83-89` → safe to rewrite.
- `schedule-template.ts`: `getScheduleForPeriod(empId)`→31-day `DaySchedule[]`; `SCHEDULE_TEMPLATES` keys `STORE_STD/HO_STD/PART_TIME` (`.id`=`TMPL-*`); `.byWeekday` by getUTCDay (null=day off).
- `shift-codes.ts`: `getShiftCode(code)`→**null** for null/'F'/unknown; ShiftCode `{in,out,workHrs,breakStart,breakEnd,nameTh,nameEn}`; `DAY_OFF_CODE='F'`.
- `dws-validation.ts`: `validateDwsPeriod(days:DaySchedule[])`; `validateDwsDay`→green ONLY if `dayOff===true` else missing shift→RED; exports `DWS_LEVEL_CLASS`,`dwsLabel`.
- `currentPeriod().start` = 2026-05-21 (a **Thursday**). Consumers (attendance-seed, timesheet) read the TEMPLATE directly — not any roster store.

### Day-off sentinel (load-bearing — every helper obeys this)
- cell `'F'` = explicit DAY OFF → `dayOff:true` → validates GREEN → does NOT cover → `cellTone='off'` (dashed).
- cell `null`/absent = EMPTY/UNASSIGNED gap → `dayOff:false, shiftCode:null` → validates RED "fix required" → does NOT cover → `cellTone='empty'` (blank).
- real code → `dayOff:false` + shift fields from `getShiftCode` → COVERS → `cellTone` std/late.
- The seed projects template day-offs to `'F'` (never empty) → no false-red storm; RED only when a manager explicitly clears a working cell.

### Work items
1. **`lib/time/roster.ts`** (pure): `weekDates(startISO)`=`[start..start+6]`; `cellTone(code)`→`'std'|'late'|'off'|'empty'`; `weeklyHours(codes)`=Σ`getShiftCode(code)?.workHrs ?? 0`; `coverageForDay(roster,date,required)` counts emp iff `getShiftCode(cell)!==null`; `seedRosterFromTemplates(team,weekDates)` → `roster[emp][date]=sched.dayOff?'F':sched.shiftCode` (sched=`getScheduleForPeriod(emp)` indexed by date); **`rosterRowToSchedule(row,weekDates):DaySchedule[]`** (validation bridge: `'F'`→dayOff true / null→red gap / real→shift); template projection helper `byWeekday[getUTCDay(date)] ?? 'F'`.
2. **`stores/shift-roster.ts`** NON-persisted Zustand `{ roster: Record<emp,Record<date,string|null>>, draft: Set<`${emp}|${date}`> }`; actions `seed`(set+clear draft), `setCell`, `applyTemplateToRow`, `applyTemplateToAll`, `markPublished`(clear draft), `clear`. setCell/applyTemplate* add to draft. **No `persist`** — seed-on-mount overwrites.
3. **Components**: `RosterGrid` (`grid-cols-[200px_repeat(7,1fr)]`, sticky employee col + weekly-hours), `RosterCell` (code/tone/isDraft), `ShiftPopover` (SHIFT_CODES subset / day-off / clear), `CoverageRow` (assigned vs hardcoded `REQUIRED_PER_DAY`, pumpkin short), `Legend`.
4. **Rewrite `/time/shift-schedule`**: keep manager gate; top bar = week label + apply-template(row/all) + "ตรวจสอบกฎ" + "ประกาศ"; seed on mount; effective date in publish modal. **Remove** the per-row `<select>` + `assigned` state.
5. Coverage row + legend.
6. **Publish**: edited→draft; "ตรวจสอบกฎ" runs `validateDwsPeriod(rosterRowToSchedule(roster[emp],weekDates))` per emp → warnings via `dwsLabel`; "ประกาศ" modal names N emps + effective date → toast → `markPublished()`.
7. **Tests**: Vitest all roster helpers incl. `weeklyHours(['F',null,'8A0800','8A1000'])`=16, `rosterRowToSchedule` ('F'→green/null→red/real→ok), coverage real-shift-only. Playwright TH+EN: popover set cell → grid+coverage+hours update; short day pumpkin; publish→modal→toast; manager gate; no leak.
8. i18n inline bilingual.

### ACs
AC1 grid (emps × 7 days from period.start; headers weekday+date; tinted cells; day-off dashed vs empty blank distinct) · AC2 click→popover→live update · AC3 coverage real-shifts vs required, pumpkin short · AC4 publish draft→validate(via bridge)→modal(N emps+effective date)→toast→draft cleared · AC5 manager-gated · AC6 build+unit(incl null/'F')+Playwright no leak · AC7 reuse libs, no reseeded shift data · AC8 store non-persisted, seed each mount · AC9 per-row dropdown removed; override via popover+apply-template · AC10 draft Set<`emp|date`> · AC11 cellTone≠validation colors (reuse DWS classes); pumpkin only short/violation · AC12 bridge sentinel rules.

### Consensus gotchas (don't re-trip)
- Roster store MUST be non-persisted (persist → stale-seed trap, like the time-corrections localStorage issue).
- `getShiftCode('F')` and `getShiftCode(null)` BOTH return null → guard `.workHrs`/`.in` access (crash otherwise).
- Roster holds **strings**; `validateDwsPeriod` wants **`DaySchedule[]`** → always go through `rosterRowToSchedule`.
- Week = `period.start..+6` (Thu–Wed for this period); headers show actual weekday — NOT Mon–Sun.
- `SCHEDULE_TEMPLATES` keys are `STORE_STD/HO_STD/PART_TIME`, not the `.id`.

## Next slices (future)
- **B** — shift-swap: `stores/shift-swaps.ts` + register `shift_swap` in `approval-registry.ts` (mirror `time_correction`) → `/quick-approve` row + `/workflows/shift-swap/[id]`.
- **C** — employee "ตารางงานสัปดาห์นี้" card (mobile) + widen the roster to the full period + wire timesheet Schedule tab / Late to read the roster (makes roster the real single source).

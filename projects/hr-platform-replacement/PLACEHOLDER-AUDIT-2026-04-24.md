# Placeholder Audit + Decision Register

**Date**: 2026-04-24
**Spec**: `specs/hr-phase1-ris-finish.md` §2 (P-A2 + P-A1 merged)
**Source**: `BRD-COMPREHENSIVE-PLAN-2026-04-24.md` §"Full sidebar inventory" + §"Top-level user-facing"
**Reviewer**: RIS + HR (Apr W4 review)
**Scope**: 18 thin-wrapper routes (audit classify) + 6 pure placeholder routes (decision register)

---

## Section 1 — Thin-Wrapper Audit

Walk 18 routes ที่ `page.tsx` เป็น 12-line wrapper (`<PageLayout>` + domain component) แล้ว classify ตาม content ของ component ที่ delegate ไป

Legend:
- ✅ **Real component** — domain component มี data, interactive state, table/tree/kanban จริง (> 100 บรรทัดและมี logic ไม่ใช่แค่ static copy)
- 🟡 **Bare placeholder** — component มีอยู่แต่ render แค่ header + "Coming soon"
- ❌ **Empty PageLayout** — ไม่มี children / trivial fallback

| # | Route | Status | Evidence | Notes |
|---|---|---|---|---|
| 1 | `/benefits` | ✅ | `src/components/claims/medical-claims-page.tsx` (1185 lines) | Medical claims full UI — สูงสุดในกลุ่ม |
| 2 | `/hrbp-reports` | ✅ | `src/components/hrbp/hrbp-reports-page.tsx` (343 lines) | HRBP reports dashboard |
| 3 | `/idp` | ✅ | `src/components/idp/idp-page.tsx` (150 lines) | IDP tabs: gap/actions/progress + sign-off state |
| 4 | `/learning` | ✅ | `src/components/learning/learning-page.tsx` (220 lines) | 1 "coming soon" hit = placeholder text ใน sub-tab ไม่ใช่ทั้งหน้า |
| 5 | `/locations` | ✅ | `src/components/location/location-page.tsx` (131 lines) | Tree + detail + map placeholder div (1 hit = map-only) |
| 6 | `/manager-dashboard` | ✅ | `src/components/manager/manager-dashboard-page.tsx` (505 lines) | Manager KPI + list views |
| 7 | `/onboarding` | ✅ | `src/components/onboarding/onboarding-page.tsx` (123 lines) | Record selector + checklist phases + progress |
| 8 | `/overtime` | ✅ | `src/components/time/overtime-page.tsx` (199 lines) | OT request/approve flow |
| 9 | `/performance` | ✅ | `src/components/performance/performance-page.tsx` (210 lines) | Performance review list + scores |
| 10 | `/quick-approve` | ✅ | `src/components/manager/quick-approve-page.tsx` (611 lines) | Manager inbox; 3 hits = filter label "Phase 2 only" |
| 11 | `/recruitment` | ✅ | `src/components/recruitment/recruitment-page.tsx` (213 lines) | Requisition + candidate list |
| 12 | `/resignation` | ✅ | `src/components/resignation/resignation-page.tsx` (230 lines) | Resign flow; 2 hits = sub-sections deferred |
| 13 | `/screening` | ✅ | `src/components/recruitment/screening-page.tsx` (88 lines) | Kanban 5-stage pipeline; < 100 lines แต่ logic ครบ |
| 14 | `/spd-management` | ✅ | `src/components/spd/spd-management-page.tsx` (658 lines) | SPD management full |
| 15 | `/succession` | ✅ | `src/components/succession/succession-page.tsx` (273 lines) | Succession matrix; no PageLayout wrap — ใช้ AppShell โดยตรง (fix 2026-04-22) |
| 16 | `/talent-management` | ✅ | `src/components/talent/talent-page.tsx` (172 lines) | Talent 9-box + list |
| 17 | `/time` | ✅ | `src/components/time/time-page.tsx` (801 lines) | Time tracking full |
| 18 | `/training-records` | ✅ | `src/components/training/training-records.tsx` (108 lines) | Training table + filters + cert download |

**Tally Section 1**: 18 ✅ / 0 🟡 / 0 ❌

### Notes on borderline cases

- `/training-records` (108 lines) และ `/screening` (88 lines) ต่ำกว่า 100 บรรทัดแต่ **ทุกหน้ามี real data + interactivity จริง** (filter, kanban move) ไม่ใช่ "Coming soon" จึง classify เป็น ✅
- "Coming soon" hits ใน grep (`/benefits` 6, `/quick-approve` 3, `/resignation` 2, `/time` 2, `/learning` 1, `/locations` 1) ทั้งหมดเป็น **sub-section / placeholder element ภายในหน้าหลัก** (เช่น map preview, filter label, sub-tab content) ไม่ใช่ทั้งหน้า — ยังจัดเป็น ✅
- `/succession` ไม่มี `<PageLayout>` wrap แล้ว (removed 2026-04-22 เพื่อเลี่ยง doubled-nav bug) — ยังนับเป็น thin-wrapper pattern เดิมเพราะ route file 12 lines เท่านั้น
- ทุก domain component ใช้ `useTranslations` + mock hook (`useRecruitment`, `useIdp`, `useLocations`, ...) = wired but mock data, ตรง Phase 1 scope

---

## Section 2 — Placeholder Decision Register

6 routes ที่เป็น **pure placeholder** ("Coming soon" เฉยๆ ไม่มี content จริง) — ต้อง decision keep / enrich / hide

| # | Route | Current Status | Decision | Rationale | Owner |
|---|---|---|---|---|---|
| 1 | `/admin/employment-info` | ❌ 9-line page `<h1>Employment Info</h1><p>Coming soon — Phase 2</p>` | **keep + Phase 2 note** | Sidebar Group 1 item — RIS คาดหวังเห็น link; scope ยังไม่ defined (history of Job/Comp changes? CV?) — รอ Ken/BA confirm ก่อน enrich | Ken+RIS review |
| 2 | `/careers` | ❌ 17-line i18n placeholder (`humi-card` + `placeholders.comingSoon`) | **keep + Phase 2 note** | Top-level user-facing link มี i18n key + card shell ครบ — hide จะทำ sidebar link dead; Phase 2 = careers portal full scope | Ken+RIS review |
| 3 | `/development` | ❌ 17-line i18n placeholder | **keep + Phase 2 note** | Development ผูกกับ IDP (`/idp` ✅) — keep แสดงว่า route reserved; Phase 2 = learning/development hub รวม | Ken+RIS review |
| 4 | `/performance-form` | ❌ 17-line i18n placeholder | **keep + Phase 2 note** | Performance form workflow — ผูก `/performance` (✅ มี list) แต่ form entry รอ Phase 2; hide = broken journey | Ken+RIS review |
| 5 | `/recruiting` | ❌ 17-line i18n placeholder | **keep + Phase 2 note** | แยกจาก `/recruitment` (✅ requisition) และ `/screening` (✅ kanban) — duplicate risk สูง; recommend **RIS ตัดสินใจ hide** หากเห็นว่าซ้ำ | Ken+RIS review |
| 6 | `/reports` | ❌ 17-line i18n placeholder (top-level) | **keep + Phase 2 note** | แยกจาก `/admin/reports` (✅ shipped) — top-level อาจเป็น ESS report hub; ถ้า scope ไม่ชัด **RIS อาจให้ hide** กันสับสนกับ admin report | Ken+RIS review |

**Tally Section 2**: 6 keep / 0 enrich / 0 hide (baseline recommendation — RIS ปรับเป็น enrich/hide ได้ใน review)

### Notes on decision baseline

- Default = **keep + Phase 2 note** ตาม spec §2 Actions (decision ไม่ต้องขอ Ken approve ใน doc; reviewer ปรับได้)
- 2 routes candidate สำหรับ hide ถ้า RIS เห็นว่าซ้ำ: `/recruiting` (vs `/recruitment` + `/screening`) และ `/reports` top-level (vs `/admin/reports`)
- ไม่มี route candidate สำหรับ **enrich now** — ทุกตัวรอ BRD scope / backend decision (Phase 2)
- `/admin/employment-info` แตกต่างจาก 5 top-level — ใช้ raw text ไม่ผ่าน i18n (`t('placeholders.comingSoon')`) → enrich pass แรกควร port ให้ใช้ `humi-card` + i18n key ให้ match visual ของ 5 top-level placeholder

---

## Footer — Combined Tally

- **18 thin-wrapper**: 18 ✅ / 0 🟡 / 0 ❌
- **6 pure placeholder**: 6 keep / 0 enrich / 0 hide
- **Surprises**: ไม่มี bare `<PageLayout>` / empty ❌ case — thin-wrapper ทุก route delegate ไป domain component จริง; spec assumption "mix of ✅/🟡/❌" ไม่ match codebase ปัจจุบัน (post PR #31-#44 ship)
- **Recommendation**: RIS review สามารถเดินผ่าน 18 thin-wrapper ได้เลยโดยไม่ต้องระวัง "Coming soon" dead-end; attention ไปที่ 6 placeholder ว่าจะ enrich/hide อันไหนก่อน

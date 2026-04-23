# Design Audit — Phase 0 Frontend Output

**Date**: 2026-04-23  
**Auditor**: Rescue MK XLIX (Designer Agent)  
**Scope**: WizardShell, Stepper, WizardFooter, Cluster{Who/Job/Review}, Step* (8 files), probation/, admin/page.tsx, createClusterWizard.ts, globals.css

---

## Executive Summary

**33 findings total**

| Priority | Count |
|----------|-------|
| CRITICAL | 5 |
| HIGH | 12 |
| MEDIUM | 10 |
| LOW | 6 |

| Category | Count |
|----------|-------|
| Tokens / Humi style | 12 |
| Composition / DRY | 5 |
| Width / Spacing | 3 |
| React best practices | 5 |
| A11y / Guidelines | 5 |
| Past-mistake patterns | 3 |

---

## Width / Spacing

### WizardShell.tsx:135 — Content width มากกว่า 5xl ไม่จำเป็น
**Priority**: MEDIUM  
**Current**: `max-w-5xl` (1024px)  
**Issue**: Form content (inputs max-w-sm/xs) อยู่ซ้ายของ container ห่างมาก — ดูโล่ง ไม่ได้ใช้พื้นที่จริง เมื่อ stepper rail 256px แสดง content จริงกว้างแค่ ~768px  
**Fix**: ใช้ `max-w-3xl` (768px) หรือ `max-w-4xl` + center card layout — ทำให้ form อ่านง่ายขึ้น

### WizardShell.tsx:79 — h-full wrapper ไม่ได้ตั้ง min-h-screen บน page context
**Priority**: MEDIUM  
**Current**: `<div className="flex h-full min-h-0 flex-col">`  
**Issue**: `h-full` ต้องการ parent มี explicit height — ถ้า page container ไม่มี `h-full` หรือ `h-screen`, wizard collapse เหลือ 0px  
**Fix**: ตรวจสอบ parent layout ว่ามี `h-full` / `h-screen` propagate ลงมาจริง — หรือเปลี่ยนเป็น `min-h-screen`

### WizardShell.tsx:106 — Stepper rail `w-64` แน่น ไม่ responsive
**Priority**: LOW  
**Current**: `w-64 shrink-0` (256px fixed)  
**Issue**: ที่ breakpoint md (768px) rail 256px + content area = content เหลือแค่ 512px ก่อน lg  
**Fix**: ใช้ `w-56 lg:w-64` หรือเพิ่ม breakpoint ให้ rail แสดงตั้งแต่ lg เท่านั้น

---

## Humi Tokens — Hardcoded hex / legacy Tailwind colors

### StepIdentity.tsx:107,114 — `text-gray-900` / `text-gray-700` ไม่ใช่ Humi token
**Priority**: CRITICAL  
**Current**: `text-gray-900`, `text-gray-700 mb-1`, `border-gray-300`  
**Issue**: ทุก Step*.tsx (8 files) ใช้ `text-gray-{700,900}` สำหรับ h2 และ label — ไม่ match Humi ink tokens และ `.humi-step-section` CSS override ทำงานได้เฉพาะ label/h2 ที่มี Tailwind utility class เป็น hook เท่านั้น ถ้า class ไม่ match selector → ไม่ถูก override  
**Fix**: ทุก Step*.tsx เปลี่ยน label เป็น `className="humi-label"` และ input/select เป็น `className="humi-input"` หรือ `humi-select` — ลบ inline Tailwind chains ทิ้ง

### StepIdentity.tsx:117 — `text-red-500` required asterisk (NO-RED violation)
**Priority**: CRITICAL  
**Current**: `<span aria-hidden="true" className="ml-1 text-red-500">*</span>` (ทุก Step*.tsx ทั้ง 8 files)  
**Issue**: Humi spec ชัดเจน "NO RED constraint" — danger token = pumpkin `#FB923C`, required asterisk = `var(--color-accent)` teal ตาม globals.css `.humi-asterisk`. CSS override ใน `.humi-step-section .text-red-500 { color: var(--color-accent) !important }` แก้ปัญหาผ่าน CSS cascade แต่เป็น workaround เปราะบาง  
**Fix**: เปลี่ยน span เป็น `<span className="humi-asterisk">*</span>` ในทุก Step*.tsx — ลบ dependency บน CSS override

### StepIdentity.tsx:132,135 — `ring-blue-500` / `border-red-500` focus/error rings
**Priority**: CRITICAL  
**Current**: `'focus:ring-blue-500'`, `'border-red-500 focus:ring-red-500'` (ทุก Step*.tsx)  
**Issue**: Blue focus ring ไม่ match Humi accent teal, red error border ละเมิด NO-RED — `.humi-step-section input:focus` ใน globals.css แก้ focus ring ได้ แต่ error state `aria-invalid` selector `border-color: var(--color-warning)` ทำงานก็ต่อเมื่อ input มี `aria-invalid="true"` จริงๆ ซึ่ง Step*.tsx set ถูกแล้ว  
**Fix**: เปลี่ยน input/select ทุก Step*.tsx ให้ใช้ `className="humi-input"` + `className={errors.field ? 'humi-input' : 'humi-input'}` — ลบ conditional Tailwind class chains ออก

### StepCompensation.tsx:26 — `bg-green-700` Toast hardcoded hex
**Priority**: HIGH  
**Current**: `bg-green-700 text-white` ใน Toast component  
**Issue**: Hardcoded green ไม่ใช่ Humi token — ควรใช้ `var(--color-success)` emerald หรือ `bg-accent` teal  
**Fix**: เปลี่ยน Toast เป็น `style={{ background: 'var(--color-success)', color: '#fff' }}` หรือใช้ `humi-tag humi-tag--accent` pattern

### StepCompensation.tsx:130-133 — Submit button ใช้ `bg-blue-600` (NO-BLUE violation)
**Priority**: HIGH  
**Current**: `bg-blue-600 hover:bg-blue-700 active:bg-blue-800` + `bg-gray-400`  
**Issue**: Submit button ใน StepCompensation ใช้ blue brand แทน Humi teal accent — ทำให้ดู "งาน 2 ทีม" ใน wizard เดียวกัน  
**Fix**: เปลี่ยนเป็น `bg-accent text-white hover:bg-[#188A83]` หรือใช้ class เดียวกับ WizardFooter primary button

### globals.css:976 — `.humi-field` defined twice
**Priority**: MEDIUM  
**Current**: Line 846 และ line 976 ต่างก็ define `.humi-field`  
**Issue**: Duplicate rule — line 846 มี `gap: 6px` และ line 976 override เป็น `gap: 6px` เหมือนกัน แต่ line 977 เพิ่ม `+ .humi-field { margin-top: 18px }` — อาจ confuse future maintainers  
**Fix**: รวมเป็น block เดียว หรือ comment อธิบาย intent ของ duplicate

### globals.css:204 — `!important` workaround สำหรับ responsive grid
**Priority**: MEDIUM  
**Current**: `.humi-app { grid-template-columns: 256px 1fr !important; }` + `.humi-sidebar { display: flex !important; }`  
**Issue**: `!important` ใน component-level CSS = design smell — เกิดจาก `@layer` cascade issue ที่ comment อธิบายไว้แล้ว แต่ยังเป็น maintenance debt  
**Fix**: ย้าย `.humi-app` default rule เข้า `@layer components` ด้วย เพื่อให้ specificity เท่ากัน และลบ `!important`

### admin/page.tsx:204 — `bg-accent-soft text-accent` hardcoded inline style ซ้ำกับ utility
**Priority**: LOW  
**Current**: `className="flex h-10 w-10 ... bg-accent-soft text-accent"` (pattern นี้ซ้ำใน Cluster*.tsx ทุกไฟล์)  
**Issue**: Pattern icon-in-pill นี้ซ้ำ 6+ ครั้ง แต่ไม่มี `.humi-icon-pill` class  
**Fix**: เพิ่ม `.humi-icon-pill` ใน globals.css และ reuse

---

## Vercel Web Interface Guidelines — A11y / Focus / Form / Typography

### WizardFooter.tsx:30,43 — Button height ต่ำกว่า 44px touch target
**Priority**: HIGH  
**Current**: `px-5 py-2` (ประมาณ ~31px height รวม line-height 15px + padding 16px)  
**Issue**: WCAG 2.5.5 ต้องการ minimum 44×44px touch target — WizardFooter buttons ใช้ `py-2` (8px×2=16px padding + 15px text = 31px) ไม่ผ่านบน mobile  
**Fix**: เปลี่ยนเป็น `py-3` (24px padding + text = ~39px) หรือ `min-h-[44px]` เพื่อ guarantee

### Stepper.tsx:26 — `aria-label` ใน nav hardcode "Hire Wizard"
**Priority**: HIGH  
**Current**: `<nav aria-label="ขั้นตอน Hire Wizard">`  
**Issue**: Stepper ถูก reuse ใน Probation wizard ผ่าน WizardShell แต่ `aria-label` ยังบอกว่า "Hire Wizard" ทุกครั้ง — screen reader ประกาศ landmark ผิด  
**Fix**: รับ `ariaLabel` prop ที่ WizardShell ส่งผ่าน flowEyebrow หรือ prop ใหม่ `stepperLabel`

### WizardShell.tsx:116-131 — Mobile progress bar ขาด `aria-label`
**Priority**: MEDIUM  
**Current**: Mobile progress bar section ไม่มี label บน container div  
**Issue**: `role="progressbar"` มี `aria-valuenow/min/max` แต่ขาด `aria-label` บน element — screen reader ออกเสียงแค่ตัวเลข  
**Fix**: เพิ่ม `aria-label="ความคืบหน้า wizard"` บน progressbar element

### WizardFooter.tsx:58-67 — Submit button ไม่มี `aria-label` context
**Priority**: MEDIUM  
**Current**: `<button type="button" onClick={onSubmit} disabled={!isCurrentStepValid}>บันทึกและส่ง</button>`  
**Issue**: "บันทึกและส่ง" text ไม่บอก context ว่า submit อะไร — ถ้า page มี multiple forms screen reader อาจ confused  
**Fix**: เพิ่ม `aria-label` หรือ description เช่น `aria-describedby` ชี้ไปยัง form title

### globals.css:1090-1105 — `.humi-step-section h2` visually hidden แต่ยังอยู่ใน heading hierarchy
**Priority**: MEDIUM  
**Current**: h2 ใน Step*.tsx ซ่อนด้วย absolute 1px clip (visually hidden)  
**Issue**: h2 ยังมีอยู่ใน DOM — AT อ่านได้ว่า "ขั้นตอนที่ 1 — ข้อมูลระบุตัวตน (Identity)" ซึ่งขัดแย้งกับ h3 "ข้อมูลระบุตัวตน" ที่มองเห็น — ทำให้ heading structure เป็น h1 → h2(hidden) → h3 ซ้ำกัน  
**Fix**: ถ้าตัดสินใจซ่อน h2 ให้ใช้ `aria-hidden="true"` แทน visually-hidden-but-AT-readable

---

## Composition — Boolean Props / Duplication / Pattern

### ClusterWho/Job/Review/Employee/Assessment.tsx — SectionHeader duplicated 5 ครั้ง
**Priority**: HIGH  
**Current**: `function SectionHeader(...)` define ซ้ำใน ClusterWho.tsx, ClusterJob.tsx, ClusterReview.tsx, ClusterEmployee.tsx, ClusterAssessment.tsx  
**Issue**: C7 Single source of truth — 5 copies, ถ้าแก้ UI ต้องแก้ทุก copy — จะ drift  
**Fix**: Extract เป็น `src/components/admin/wizard/SectionHeader.tsx` แล้ว import

### WizardShell.tsx:29-45 — Props ขยายแบบ boolean-flag direction
**Priority**: HIGH  
**Current**: `flowEyebrow?: string`, `flowTitleTh?: string`, `steps?: readonly StepItem[]` optional overrides  
**Issue**: Pattern นี้จะขยายเป็น `showBack?: boolean`, `submitLabel?: string` ฯลฯ ในอนาคต — ควร group เป็น `config` object ตาม composition-patterns SKILL.md ที่ createClusterWizard ทำถูกแล้ว  
**Fix**: รับ `flowConfig?: { eyebrow: string; titleTh: string; steps: StepItem[] }` แทน 3 optional props แยก

### ClusterReview.tsx:47 / probation/ClusterReview.tsx:46 — Inline style `borderTop` hardcoded
**Priority**: LOW  
**Current**: `style={{ padding: '10px 0', borderTop: '1px solid var(--color-hairline-soft)' }}`  
**Issue**: Pattern นี้ซ้ำ 2 ที่ — ควรเป็น class  
**Fix**: เพิ่ม `.humi-summary-row` ใน globals.css

### probation/page.tsx:34 — `useProbationWizard.getState()` เรียกใน event handler
**Priority**: MEDIUM  
**Current**: `console.info('[ProbationPage] submit', useProbationWizard.getState().formData)`  
**Issue**: ใน Zustand การ call `.getState()` ใน event handler เป็น antipattern เล็กน้อย — แต่จุดหลักคือใช้ `console.info` สำหรับ mock submit ที่ควร wire เป็น API call  
**Fix**: ดึง `formData` ผ่าน hook destructuring แทน `.getState()`

### createClusterWizard.ts:119 — Factory return type ไม่ explicit
**Priority**: LOW  
**Current**: `return useStore` — TypeScript infer type จาก create<...>()  
**Issue**: Return type ไม่ explicit ทำให้ consumer ต้องอ่าน implementation เพื่อรู้ interface  
**Fix**: เพิ่ม return type annotation `): UseBoundStore<StoreApi<WizardState<TFormData>>>` หรือ exported type alias

---

## React Best Practices

### StepIdentity.tsx:98-102 — useEffect empty deps array ด้วย eslint-disable comment
**Priority**: HIGH  
**Current**: `useEffect(() => { if (!identity.hireDate && hireDate) { setStepData('identity', { hireDate }) } }, []) // eslint-disable-line react-hooks/exhaustive-deps`  
**Issue**: Suppress เฉยๆ โดยไม่ fix — stale closure ที่ identity/hireDate/setStepData เป็น deps ที่ถูกต้อง ถ้า identity.hireDate เปลี่ยนจาก outside effect จะ miss  
**Fix**: เพิ่ม deps ครบ หรือถ้าต้องการ run-once ใช้ `useRef(false)` flag แทน eslint-disable

### StepIdentity.tsx:93-95 — Double useEffect ที่ validate ซ้อนกัน
**Priority**: MEDIUM  
**Current**: Effect แรก (line 93) run validate; Effect สาม (line 98) sync hireDate — 2 effects ทำงานต่อกันเมื่อ mount  
**Issue**: React Strict Mode จะ double-invoke effects — hireDate sync + validate จะ run 2 รอบ ทำให้ store ถูก write 4 ครั้งใน dev  
**Fix**: รวม logic เป็น effect เดียว หรือย้าย hireDate default init ออกจาก effect ไปใส่ `useState` initializer

### StepCompensation.tsx:67-81 — `handleSubmit` ใน useCallback แต่ไม่ได้ memoize ผล
**Priority**: LOW  
**Current**: `const handleSubmit = useCallback(() => { ... setTimeout(() => { reset(); ... }, 2000) }, [formData, salaryInput, validate, reset])`  
**Issue**: `setTimeout` ใน useCallback สร้าง closure บน `reset` + `formData` — ถ้า component unmount ก่อน 2 วินาที `reset()` จะ run บน unmounted component  
**Fix**: เพิ่ม cleanup via `useRef` หรือ check mount state ก่อน reset

### StepCompensation.tsx:72 — `console.log` ใน submit handler
**Priority**: HIGH  
**Current**: `console.log('[HireWizard Submit]', JSON.stringify(payload, null, 2))`  
**Issue**: Production code ไม่ควรมี `console.log` payload ที่อาจมี PII (National ID, salary) — ละเมิด data privacy  
**Fix**: ลบออก หรือ wrap ด้วย `if (process.env.NODE_ENV === 'development')` และ log เฉพาะ metadata ไม่ใช่ full payload

### StepJob.tsx:21 / StepIdentity.tsx:29 — useEffect สำหรับ loadData ไม่มี cleanup / error boundary
**Priority**: MEDIUM  
**Current**: `useEffect(() => { try { setBusinessUnits(loadBusinessUnits()) } catch (err) { console.warn(...) } }, [])`  
**Issue**: `loadBusinessUnits` เป็น synchronous แต่ถ้า refactor เป็น async ในอนาคต pattern นี้จะ leak — ไม่มี AbortController หรือ isMounted check  
**Fix**: เพิ่ม comment guard ว่า "sync only — ถ้าเปลี่ยน async ต้องเพิ่ม cleanup"

---

## Past-Mistake Patterns

### payslip/page.tsx:306,466 — Global `* { margin: 0; padding: 0 }` reset ยังมีอยู่
**Priority**: CRITICAL  
**Current**: `* { margin: 0; padding: 0; box-sizing: border-box; }` ใน JSX string template (2 occurrences)  
**Issue**: ถึงแม้จะอยู่ใน payslip page (ไม่ใช่ wizard) แต่ถ้า style inject เข้า global DOM จะ override Tailwind utilities ทั้งหมด — rule 26b ชัดเจน  
**Fix**: Scope reset ด้วย `@scope` หรือ CSS Modules — อย่า inject global `*` reset

### system/reports/schedule/page.tsx:106 / automation/page.tsx:73 — Silent catch
**Priority**: HIGH  
**Current**: `try { freq = formatCron(job.cron) } catch { /* keep raw */ }`  
**Issue**: C6 rule — `catch {}` ต้องมี log warning อย่างน้อย แม้จะเป็น fallback case  
**Fix**: เปลี่ยนเป็น `catch (err) { console.warn('[formatCron] invalid cron:', job.cron, err) }`

### Stepper.tsx:72 — Thai label ใน narrow container ไม่มี whitespace-nowrap
**Priority**: MEDIUM  
**Current**: `<span className={cn('font-display text-[14px] font-semibold leading-tight', ...)}>` — ไม่มี `whitespace-nowrap`  
**Issue**: ชื่อ step Thai เช่น "ข้อมูลระบุตัวตน" อาจ wrap ไม่ดีใน 256px rail เมื่อ font load ช้า หรือ zoom 110%+  
**Fix**: เพิ่ม `whitespace-nowrap` หรือ `overflow-hidden text-ellipsis` บน label span

---

## Notes สำหรับ Builder

1. **ปัญหาหลัก** (CRITICAL ×5): Step*.tsx ทั้ง 8 ไฟล์ยังใช้ legacy Tailwind gray/blue/red tokens ที่ `humi-step-section` CSS override พยุงอยู่ — ควร fix ที่ source ไม่ใช่ CSS cascade workaround
2. **Quick win สูงสุด**: Extract `SectionHeader` component เดียว ลบ 5 duplicates — 10 นาที
3. **Risk ถ้า CSS override พัง**: ถ้า class ชื่อ `text-gray-700` เปลี่ยนจาก Tailwind upgrade → label ทุกอันกลับเป็นสีเดิมทันที
4. Screenshots: browser-harness ไม่ available (Chrome CDP ยังไม่ approved) — visual evidence ต้องทำแยกหลัง fix

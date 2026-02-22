# Module Documentation Agent Team Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** สร้างเอกสารภาษาไทยสำหรับ Product Owner / Business ที่อธิบายว่าแต่ละ module ของ RIS HR System ทำอะไรได้บ้าง โดยใช้ parallel agents 6 ทีม + 1 index agent

**Architecture:** ใช้ superpowers:dispatching-parallel-agents — 6 domain agents ทำงานพร้อมกัน แต่ละ agent อ่าน source code ของ pages ใน domain ตัวเอง แล้วเขียนไฟล์ Markdown ภาษาไทย 1 ไฟล์ต่อ domain ไปยัง `specs/docs/` จากนั้น index agent รวมเป็นสารบัญ

**Tech Stack:** Vanilla JavaScript source reading, Markdown output, Thai language

---

## Template เนื้อหาแต่ละ Module

แต่ละ agent ต้องเขียนเนื้อหาแต่ละ module ในรูปแบบนี้:

```markdown
## [ชื่อ Module ภาษาไทย] (`route-name`)

**หน้าที่หลัก:** [1-2 ประโยคอธิบายว่า module ทำอะไร]

**ใครใช้ได้บ้าง:** [Employee / Manager / HR Admin / HR Manager — ดูจาก rbac checks ใน source]

**สิ่งที่ทำได้:**
- [feature ที่ผู้ใช้ทำได้จริง เน้น user-facing action]
- ...

**ข้อมูลที่แสดง:**
- [ข้อมูลหรือรายงานที่เห็นใน UI]
- ...

**หมายเหตุ:** [workflow approvals, ข้อจำกัด หรือ special behaviors — ถ้ามี]
```

---

### Task 1: Agent 1 — Employee Self-Service Documentation

**Files:**
- Read: `apps/js/pages/profile.js`
- Read: `apps/js/pages/personal-info.js`
- Read: `apps/js/pages/payslip.js`
- Read: `apps/js/pages/leave-request.js`
- Read: `apps/js/pages/overtime.js`
- Read: `apps/js/utils/rbac.js` (สำหรับ role checks)
- Create: `specs/docs/employee-self-service.md`

**Step 1: อ่าน source code ทั้ง 5 modules**

อ่านไฟล์ทั้งหมดและสังเกต:
- UI elements ที่ render (buttons, forms, tables)
- Role checks (`rbac.can()`, `rbac.hasRole()`)
- Workflow triggers (approval flows)
- Data fields ที่แสดงหรือ edit ได้

**Step 2: สร้างไฟล์ `specs/docs/employee-self-service.md`**

เริ่มต้นด้วย header:
```markdown
# Employee Self-Service (การบริการตนเองของพนักงาน)

เอกสารนี้อธิบาย module ที่พนักงานใช้จัดการข้อมูลส่วนตัวและดูข้อมูลของตัวเอง

---
```

จากนั้นเขียนเนื้อหาตาม template ด้านบนสำหรับแต่ละ module:
- โปรไฟล์พนักงาน (`profile`)
- ข้อมูลส่วนตัว (`personal-info`)
- สลิปเงินเดือน (`payslip`)
- การลา (`leave-request`)
- โอทีและทำงานล่วงเวลา (`overtime`)

**Step 3: ตรวจสอบ**

ไฟล์ `specs/docs/employee-self-service.md` ต้องมีครบทุก module, เขียนเป็นภาษาไทย, และมีหัวข้อ "สิ่งที่ทำได้" กับ "ใครใช้ได้บ้าง" ในทุก section

---

### Task 2: Agent 2 — Payroll & Finance Documentation

**Files:**
- Read: `apps/js/pages/payroll-setup.js`
- Read: `apps/js/pages/payroll-processing.js`
- Read: `apps/js/pages/government-reports.js`
- Read: `apps/js/pages/compensation.js`
- Read: `apps/js/pages/benefits.js`
- Read: `apps/js/utils/rbac.js`
- Create: `specs/docs/payroll-finance.md`

**Step 1: อ่าน source code ทั้ง 5 modules**

สังเกตเป็นพิเศษ:
- การคำนวณเงินเดือน, ภาษี, ประกันสังคม
- ใครมีสิทธิ์ดูและแก้ไขข้อมูลเงินเดือน
- รายงานที่ generate ได้

**Step 2: สร้างไฟล์ `specs/docs/payroll-finance.md`**

```markdown
# Payroll & Finance (เงินเดือนและการเงิน)

เอกสารนี้อธิบาย module ที่เกี่ยวกับการจัดการเงินเดือน ค่าตอบแทน และรายงานทางการเงิน

---
```

Modules:
- ตั้งค่าเงินเดือน (`payroll-setup`)
- ประมวลผลเงินเดือน (`payroll-processing`)
- รายงานราชการ (`government-reports`)
- ค่าตอบแทน (`compensation`)
- สวัสดิการ (`benefits`)

**Step 3: ตรวจสอบ**

ตรวจว่ามีครบทุก module และระบุ role permissions อย่างชัดเจน

---

### Task 3: Agent 3 — Performance & Talent Documentation

**Files:**
- Read: `apps/js/pages/performance.js`
- Read: `apps/js/pages/scorecard.js`
- Read: `apps/js/pages/talent-management.js`
- Read: `apps/js/pages/succession-planning.js`
- Read: `apps/js/pages/idp.js`
- Read: `apps/js/pages/learning.js`
- Read: `apps/js/pages/training-records.js`
- Read: `apps/js/utils/rbac.js`
- Create: `specs/docs/performance-talent.md`

**Step 1: อ่าน source code ทั้ง 7 modules**

สังเกต:
- KPI และ goal setting
- การประเมินผล (self-assessment, manager review)
- แผนพัฒนาบุคลากร

**Step 2: สร้างไฟล์ `specs/docs/performance-talent.md`**

```markdown
# Performance & Talent Management (การประเมินผลและการจัดการบุคลากร)

เอกสารนี้อธิบาย module ที่เกี่ยวกับการประเมินผลงาน การพัฒนาศักยภาพ และการวางแผนบุคลากร

---
```

Modules:
- การประเมินผลงาน (`performance`)
- Scorecard และ KPI (`scorecard`)
- การจัดการความสามารถพิเศษ (`talent-management`)
- การวางแผนสืบทอดตำแหน่ง (`succession-planning`)
- แผนพัฒนารายบุคคล (`idp`)
- การเรียนรู้และฝึกอบรม (`learning`)
- บันทึกการฝึกอบรม (`training-records`)

**Step 3: ตรวจสอบ**

ตรวจว่ามีครบทุก module

---

### Task 4: Agent 4 — HR Operations Documentation

**Files:**
- Read: `apps/js/pages/workflows.js`
- Read: `apps/js/pages/position-management.js`
- Read: `apps/js/pages/transfer-request.js`
- Read: `apps/js/pages/org-chart.js`
- Read: `apps/js/pages/manager-dashboard.js`
- Read: `apps/js/pages/settings.js`
- Read: `apps/js/workflow/engine.js`
- Read: `apps/js/utils/rbac.js`
- Create: `specs/docs/hr-operations.md`

**Step 1: อ่าน source code ทั้ง 6 modules + workflow engine**

สังเกต:
- Approval workflow steps (Manager → HR Admin → HR Manager)
- Position hierarchy และ org structure
- การย้ายงาน และ transfer process

**Step 2: สร้างไฟล์ `specs/docs/hr-operations.md`**

```markdown
# HR Operations (การดำเนินงานฝ่ายบุคคล)

เอกสารนี้อธิบาย module ที่ใช้ในการบริหารงานบุคคล การอนุมัติ และการจัดการโครงสร้างองค์กร

---
```

Modules:
- การอนุมัติและ workflow (`workflows`)
- การจัดการตำแหน่ง (`position-management`)
- คำขอโอนย้าย (`transfer-request`)
- แผนผังองค์กร (`org-chart`)
- แดชบอร์ดผู้จัดการ (`manager-dashboard`)
- การตั้งค่าระบบ (`settings`)

**Step 3: ตรวจสอบ**

ตรวจว่ามีครบทุก module และระบุ approval flow อย่างชัดเจน

---

### Task 5: Agent 5 — Recruitment & Onboarding Documentation

**Files:**
- Read: `apps/js/pages/recruitment.js`
- Read: `apps/js/pages/candidate-screening.js`
- Read: `apps/js/pages/onboarding.js`
- Read: `apps/js/pages/resignation.js`
- Read: `apps/js/utils/rbac.js`
- Create: `specs/docs/recruitment-onboarding.md`

**Step 1: อ่าน source code ทั้ง 4 modules**

สังเกต:
- ขั้นตอนการสรรหาพนักงาน
- กระบวนการ onboarding
- กระบวนการลาออก

**Step 2: สร้างไฟล์ `specs/docs/recruitment-onboarding.md`**

```markdown
# Recruitment & Onboarding (การสรรหาและการรับพนักงานใหม่)

เอกสารนี้อธิบาย module ที่ครอบคลุมวงจรชีวิตพนักงานตั้งแต่การสมัครงานจนถึงการลาออก

---
```

Modules:
- การสรรหาพนักงาน (`recruitment`)
- การคัดกรองผู้สมัคร (`candidate-screening`)
- การปฐมนิเทศพนักงานใหม่ (`onboarding`)
- การลาออก (`resignation`)

**Step 3: ตรวจสอบ**

ตรวจว่ามีครบทุก module

---

### Task 6: Agent 6 — Time & Attendance Documentation

**Files:**
- Read: `apps/js/pages/time-management.js`
- Read: `apps/js/pages/location-management.js`
- Read: `apps/js/utils/rbac.js`
- Create: `specs/docs/time-attendance.md`

**Step 1: อ่าน source code ทั้ง 2 modules**

สังเกต:
- การบันทึกเวลาเข้า-ออกงาน
- การจัดการกะงาน (shifts)
- การจัดการสถานที่และสาขา

**Step 2: สร้างไฟล์ `specs/docs/time-attendance.md`**

```markdown
# Time & Attendance (การบริหารเวลาและการเข้างาน)

เอกสารนี้อธิบาย module ที่เกี่ยวกับการบันทึกเวลาทำงานและการจัดการสถานที่

---
```

Modules:
- การบริหารเวลา (`time-management`)
- การจัดการสถานที่ (`location-management`)

**Step 3: ตรวจสอบ**

ตรวจว่ามีครบทุก module

---

### Task 7: Index Agent — สร้างสารบัญรวม

> **รอจนกว่า Task 1–6 จะเสร็จทั้งหมดก่อน**

**Files:**
- Read: `specs/docs/employee-self-service.md`
- Read: `specs/docs/payroll-finance.md`
- Read: `specs/docs/performance-talent.md`
- Read: `specs/docs/hr-operations.md`
- Read: `specs/docs/recruitment-onboarding.md`
- Read: `specs/docs/time-attendance.md`
- Create: `specs/docs/index.md`

**Step 1: อ่านไฟล์ทั้ง 6 domain files**

รวบรวมชื่อ module และ one-liner description จากแต่ละไฟล์

**Step 2: สร้าง `specs/docs/index.md`**

```markdown
# RIS HR System — คู่มือ Capability สำหรับ Product Owner

ระบบ HR ของ Central Group ครอบคลุม **[X] module** ใน **6 กลุ่มหลัก** ดังนี้

## สารบัญ

| กลุ่ม | Module | ไฟล์รายละเอียด |
|-------|--------|----------------|
| Employee Self-Service | โปรไฟล์, ข้อมูลส่วนตัว, สลิปเงินเดือน, การลา, OT | [employee-self-service.md](./employee-self-service.md) |
| Payroll & Finance | ตั้งค่าเงินเดือน, ประมวลผล, รายงาน, ค่าตอบแทน, สวัสดิการ | [payroll-finance.md](./payroll-finance.md) |
| Performance & Talent | ประเมินผล, KPI, Talent, สืบทอด, IDP, อบรม | [performance-talent.md](./performance-talent.md) |
| HR Operations | Workflow, ตำแหน่ง, โอนย้าย, Org Chart, Dashboard | [hr-operations.md](./hr-operations.md) |
| Recruitment & Onboarding | สรรหา, คัดกรอง, ปฐมนิเทศ, ลาออก | [recruitment-onboarding.md](./recruitment-onboarding.md) |
| Time & Attendance | บริหารเวลา, จัดการสถานที่ | [time-attendance.md](./time-attendance.md) |

## Role ที่มีในระบบ

| Role | คำอธิบาย |
|------|----------|
| Employee | พนักงานทั่วไป — ดูและแก้ไขข้อมูลของตัวเอง |
| Manager | ผู้จัดการ — ดูข้อมูลทีม อนุมัติคำขอ |
| HR Admin | เจ้าหน้าที่ HR — จัดการข้อมูลพนักงานทั้งหมด |
| HR Manager | ผู้จัดการ HR — อนุมัติการเปลี่ยนแปลงสำคัญ เช่น เงินเดือน |

---
*เอกสารนี้สร้างโดย AI Documentation Agent Team — อ้างอิงจาก source code ณ วันที่ 2026-02-22*
```

**Step 3: ตรวจสอบ**

ตรวจว่า index.md มีลิงก์ครบ 6 ไฟล์ และตารางสารบัญถูกต้อง

---

## Execution Order

```
Task 1 ──┐
Task 2 ──┤
Task 3 ──┤──► (parallel) ──► Task 7 (index)
Task 4 ──┤
Task 5 ──┤
Task 6 ──┘
```

Tasks 1–6 ทำงานพร้อมกัน → Task 7 รอจนครบแล้วค่อยรัน

**ใช้ skill:** `superpowers:dispatching-parallel-agents` สำหรับ Tasks 1–6

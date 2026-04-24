# RIS Reviewer Walkthrough — HR Platform Phase 1

**URL ทดสอบ**: https://hr-opal-gamma.vercel.app
**Commit**: `107d2a9`
**วัตถุประสงค์**: ให้ RIS reviewer เดินผ่าน UI ได้ครบทุก route ก่อนเข้า review meeting
**ขอบเขต Phase 1**: scaffold + mock data เท่านั้น ยังไม่มี backend จริง (backend = Phase 2)

---

## Admin Journey

ล็อกอินแล้ว navigate ไปที่ `/th/admin` เพื่อเริ่ม

### Group 1 — Lifecycle Actions + Employee Data

#### `/admin` — Admin Center (Landing)

![screenshot-TBD](./screenshots/admin.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/admin` | 1. เปิด URL `/th/admin` | - หน้าแสดง hero card "ศูนย์จัดการพนักงาน" พร้อม Humi grain texture |
| | 2. ดู stat widgets มุมขวาบน | - stat widgets แสดง: พนักงาน 240K+ / Workflow รอดำเนินการ 0 / บริษัท 164 / แผนก 17K |
| | 3. คลิก card ใด card หนึ่งใน section grid | - section grid มี 6 card: การจ้างพนักงาน / ข้อมูลพนักงาน / Self-Service / ผู้ใช้และสิทธิ์ / จัดการระบบ / รายงาน |
| | 4. สังเกต Recent Activity ด้านล่าง | - card hover แสดง `-translate-y-0.5` animation; navigate ไปยัง route ที่เลือกได้ถูกต้อง |
| | | - Recent Activity แสดงข้อความ "ยังไม่มีกิจกรรมในระบบ" (mock data) |

---

#### `/admin/hire` — จ้างพนักงานใหม่

![screenshot-TBD](./screenshots/admin-hire.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/admin/hire` | 1. คลิก "จ้างพนักงานใหม่" จาก Admin Center | - WizardShell แสดง 3 step tabs: "ใครคือพนักงาน" / "ข้อมูลงาน" / "ตรวจสอบ" |
| | 2. กรอกข้อมูล Cluster Who (step 1) | - step tab แสดง status ว่า step ไหน completed / locked; draft บันทึก auto ทุก input (Zustand persist) |
| | 3. คลิก "ถัดไป" ผ่าน step 2 | - ปุ่ม "ถัดไป" disabled ถ้า step ยังไม่ valid; step ที่ยังไม่ unlock คลิก jump ไม่ได้ |
| | 4. ถึง Cluster Review (step 3) แล้วคลิก "ส่ง" | - submit แสดงข้อมูล draft ใน console.log (Phase 2 จะ wire API); wizard reset กลับ step 1 หลัง submit |
| | | - last saved timestamp แสดงที่ WizardShell header |

---

#### `/admin/employees` — ข้อมูลพนักงาน

![screenshot-TBD](./screenshots/admin-employees.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/admin/employees` | 1. เปิด route — ตาราง **ว่างเปล่า** โดย default | - หน้าแสดง search bar "ค้นหาด้วยชื่อ หรือรหัสพนักงาน..." พร้อม header "ข้อมูลพนักงาน" |
| | 2. พิมพ์ชื่อหรือรหัสพนักงานใน search box | - empty state บอก "เริ่มต้นด้วยการค้นหา" พร้อมแสดงจำนวนพนักงานทั้งหมดในระบบ |
| | 3. รายการปรากฏ — คลิก row | - ผล debounce 200ms; virtualized list รองรับ 1,000+ rows แบบ smooth scroll |
| | | - columns: รหัสพนักงาน / ชื่อ (TH) / ประเภท / วันที่เริ่มงาน / บริษัท / ตำแหน่ง / ทดลองงาน / สถานะ |
| | | - row click navigate ไป `/admin/employees/[id]` (detail page) |

---

#### `/admin/employment-info` — ข้อมูลการจ้างงาน

![screenshot-TBD](./screenshots/admin-employment-info.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/admin/employment-info` | 1. เปิด route | - แสดงข้อความ "Employment Info — Coming soon — Phase 2" |
| | 2. ตรวจสอบว่า layout ไม่พัง | - AdminShell sidebar + topbar render ปกติ ไม่มี error |
| | | - route นี้เป็น placeholder Phase 2 — ไม่มี interaction จริง |

---

### Group 2 — Master Data (Organization / Jobs / Positions)

#### `/admin/organization` — โครงสร้างหน่วยงาน

![screenshot-TBD](./screenshots/admin-organization.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/admin/organization` | 1. เปิด route — tree expand โดย default 5 บริษัท | - tree แสดง node ชื่อภาษาไทย + code badge (เช่น `CEN.HR`); inactive node มี badge "ไม่ใช้งาน" |
| | 2. พิมพ์ใน search box "HR" | - auto-expand ancestor nodes ของผลที่ตรงกัน; footer แสดงจำนวน match |
| | 3. คลิก node ใด node หนึ่ง | - drawer เลื่อนจากขวา (480px); แสดง breadcrumb path ของ node ที่เลือก |
| | 4. แก้ไข field ใน drawer แล้วกด "บันทึกการแก้ไข" | - Escape / คลิก scrim ถ้ามี unsaved change → confirm dialog; ลบได้จากปุ่ม "ลบ" ในครึ่งล่างซ้ายของ drawer |
| | 5. คลิก "+ เพิ่มหน่วยงาน" | - form เปิดพร้อม fields: รหัสหน่วยงาน / ชื่อ (TH) / ชื่อ (EN) / บริษัท / หน่วยงานแม่ / วันที่มีผล / ใช้งาน |

---

#### `/admin/jobs` — งาน (Jobs Master)

![screenshot-TBD](./screenshots/admin-jobs.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/admin/jobs` | 1. เปิด route — table แสดง ~108 entries | - columns: รหัส / ชื่องาน (TH) / ชื่องาน (EN) / กลุ่ม / ระดับ / สถานะ |
| | 2. พิมพ์ใน search box เพื่อ filter | - search filter ครอบคลุม code / titleTh / titleEn / family |
| | 3. คลิก row หรือ "+ เพิ่มรายการ" | - drawer เปิดจากขวา; form fields: รหัส* / ชื่องาน (TH)* / ชื่องาน (EN)* / กลุ่มงาน / ระดับ / ใช้งาน |
| | 4. บันทึก job ใหม่ | - สถานะ badge: ใช้งาน (เขียว) / ปิด (เทา); ระดับ: เจ้าหน้าที่ / นักวิเคราะห์ / อาวุโส / หัวหน้า / ผู้จัดการ / ผู้อำนวยการ |

---

#### `/admin/positions` — ตำแหน่ง (Positions Master)

![screenshot-TBD](./screenshots/admin-positions.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/admin/positions` | 1. เปิด route — table แสดง ~324 entries | - columns: รหัส / ชื่อตำแหน่ง (TH) / ชื่อตำแหน่ง (EN) / บริษัท / งาน / หน่วยงาน / จำนวนพนักงาน / สถานะ |
| | 2. search + เปิด drawer | - จำนวนพนักงาน column แสดง `currentHeadcount/defaultHeadcount` |
| | 3. กรอก form ใน drawer | - dropdown "งาน" อ้างอิง Jobs store (active jobs เท่านั้น); dropdown "หน่วยงาน" อ้างอิง OrgUnits store |
| | 4. field "จำนวนพนักงานปัจจุบัน" | - field นี้ readOnly — คำนวณจาก active employees ในตำแหน่ง ไม่สามารถแก้ไขได้ |
| | | - บริษัท dropdown ดึงจาก `PICKLIST_COMPANY` shared picklist |

---

### Group 3 — Reports / Self-Service / Users / System

#### `/admin/reports` — ศูนย์รายงาน

![screenshot-TBD](./screenshots/admin-reports.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/admin/reports` | 1. เปิด route | - stat cards แสดง: กำลังคนทั้งหมด / ทดลองงาน / งาน / ตำแหน่ง / หน่วยงาน / ความเคลื่อนไหว 30 วัน |
| | 2. ดู section breakdowns | - "กำลังคนตามบริษัท" แสดง horizontal bar chart ตามสัดส่วน; "สัดส่วนประเภทการจ้าง" แสดง ประจำ vs บางเวลา |
| | 3. ดู timeline activity | - "กิจกรรมย้อนหลัง 30 วัน" นับ event kinds จาก timeline store (hire / transfer / terminate ฯลฯ) |
| | 4. ดู headcount capacity | - "ความจุกำลังคน" แสดง progress bar currentHeadcount / totalCapacity พร้อม fill rate % |
| | | - footer note: "ข้อมูลจากฐานข้อมูลจำลอง" — ยังไม่ใช่ข้อมูลจริง |

---

#### `/admin/self-service` — การตั้งค่าแบบกำหนดเอง

![screenshot-TBD](./screenshots/admin-self-service.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/admin/self-service` | 1. เปิด route | - hub แสดง 6 editor cards: รายการฟิลด์ (BRD #178) / การมองเห็นฟิลด์ (BRD #179) / ฟิลด์บังคับกรอก (BRD #180) / ฟิลด์อ่านอย่างเดียว (BRD #181) / ทางลัดเมนูด่วน (BRD #182) / ไทล์หน้าแรก (BRD #183) |
| | 2. แก้ไขค่าใด card หนึ่ง แล้วยังไม่กดบันทึก | - dirty indicator (banner สีเหลือง) แจ้งเตือน "มีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก" |
| | 3. คลิก card เพื่อเข้า editor sub-route | - แต่ละ card link ไปยัง sub-route `/admin/self-service/<editor>` |
| | | - footer: "การตั้งค่าทั้งหมดจะมีผลทันทีเมื่อบันทึก" |

---

#### `/admin/users` — ผู้ใช้และสิทธิ์

![screenshot-TBD](./screenshots/admin-users.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/admin/users` | 1. เปิด route | - hub แสดง 6 tool cards: กลุ่มสิทธิ์ข้อมูล (BRD #184) / กลุ่มสิทธิ์แอปพลิเคชัน (BRD #185) / กำหนดสิทธิ์ผู้ใช้ (BRD #186) / จัดการตัวแทนดำเนินการ (BRD #187) / ประวัติการแก้ไขข้อมูลพื้นฐาน (BRD #188) / รายงานบันทึกการใช้งาน (BRD #189) |
| | 2. สังเกต alert badges | - ถ้ามี proxy รอ อนุมัติ → badge สีส้มแสดงจำนวน; ถ้ามี audit log วันนี้ → badge สีน้ำเงินแสดงจำนวน |
| | 3. คลิก card เพื่อเข้า sub-tool | - แต่ละ card แสดง actor (ผู้ใช้: HRIS Admin / SPD Admin / Admin) ที่ footer |
| | | - hover card เปลี่ยน border เป็น accent color |

---

#### `/admin/system` — ระบบ

![screenshot-TBD](./screenshots/admin-system.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/admin/system` | 1. เปิด route | - stat widgets แสดง 5 ตัวเลข: รายงานทั้งหมด / งานตั้งเวลา (active) / รายงานโปรด / จุดเชื่อมต่อ / การยินยอมรอดำเนินการ |
| | 2. ดู hub cards | - 4 hub cards: รายงาน / การเชื่อมต่อระบบ / ฟีเจอร์ระบบ / ความปลอดภัย |
| | 3. คลิก card | - navigate ไปยัง sub-route `/admin/system/<section>` |
| | | - hover border เปลี่ยนเป็น accent; sub-routes ให้ดูรายละเอียดในแต่ละหน้า |

---

## ESS Journey (Employee Self-Service)

พนักงานทั่วไป login แล้วเดิน 4 routes ต่อไปนี้

#### `/home` — หน้าแรก

![screenshot-TBD](./screenshots/home.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/home` | 1. เปิด URL `/th/home` หลัง login | - hero card แสดง greeting ตามช่วงเวลา (สวัสดีตอนเช้า/บ่าย/เย็น) + ชื่อผู้ใช้จาก auth store |
| | 2. ดู Today Presence widget | - ring chart แสดงสัดส่วน present / absent / off-shift พร้อม avatar stack |
| | 3. ดู pending requests + pending docs | - requests section แสดง 2 รายการ พร้อมปุ่ม "อนุมัติ" / "ปฏิเสธ" (mock); docs section แสดงเอกสารรอลงนาม |
| | 4. ดู announcements + calendar | - ประกาศ 2 รายการ (pinned tag / ไม่ pinned); mini-calendar แสดงเดือนปัจจุบัน + event dots |
| | | - Week Recognition card (ink background) แสดงพนักงานที่ได้รับการยกย่องประจำสัปดาห์ |

---

#### `/profile/me` — โปรไฟล์ของฉัน

![screenshot-TBD](./screenshots/employees-me-profile.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/profile/me` | 1. เปิด route | - header แสดงชื่อพนักงาน (TH) + eyebrow "โปรไฟล์ของฉัน" |
| | 2. ดู 3 section cards | - section 1 "ข้อมูลติดต่อ": ชื่อ (TH) / อีเมล / โทรศัพท์ / ที่อยู่ |
| | 3. ดู section ตำแหน่งงาน | - section 2 "ตำแหน่งงาน": ตำแหน่ง / บริษัท / หน่วยงาน |
| | 4. ดู section ข้อมูลส่วนตัว | - section 3 "ข้อมูลส่วนตัว": วันเกิด / วันเริ่มงาน / chip "อายุงาน N ปี" |
| | | - ทั้งหมด read-only ไม่มีปุ่ม edit (Phase 2 จะเพิ่ม edit flow) |

---

#### `/employees/me/payslip` — สลิปเงินเดือน

![screenshot-TBD](./screenshots/employees-me-payslip.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/employees/me/payslip` | 1. เปิด route | - header "สลิปเงินเดือน" + eyebrow "เงินเดือนของฉัน" |
| | 2. ดูตาราง 6 เดือน | - table columns: งวดเงินเดือน / รายได้รวม / รายรับสุทธิ / สถานะ |
| | 3. คลิก row สลิป | - status badge: "พร้อมดาวน์โหลด" (เขียว) / "รอประมวลผล" (เทา) |
| | | - ตัวเลข format เป็น Thai locale พร้อม "บาท"; footer: "รายละเอียดสลิปจะพร้อมใน Phase 2" |

---

#### `/employees/me/benefits` — สวัสดิการ

![screenshot-TBD](./screenshots/employees-me-benefits.png)

| Path | Happy Path Steps | Expected Behavior |
|------|-----------------|-------------------|
| `/employees/me/benefits` | 1. เปิด route | - header "เงินเดือนและสวัสดิการ" + eyebrow "สวัสดิการของฉัน" |
| | 2. ดู 3 benefit cards | - card 1 "ประกันกลุ่ม": badge "มีผล" (เขียว) / stat "คุ้มครอง" |
| | 3. ดู card กองทุน | - card 2 "กองทุนสำรองเลี้ยงชีพ": badge "มีผล" / stat "5% อัตราสมทบบริษัท" |
| | 4. ดู card สวัสดิการพิเศษ | - card 3 "สวัสดิการพิเศษ": badge "เร็ว ๆ นี้" (เทา) / note "รายละเอียด Phase 2" |
| | | - ทุก card มี placeholder note ท้าย card บอกว่า Phase 2 จะเพิ่มรายละเอียด |

---

## Out of Scope

สิ่งต่อไปนี้ยังไม่อยู่ใน Phase 1 — จะ deliver ใน Phase 2:

- **Backend wire**: audit log, cron jobs, email notifications, RBAC enforcement จริง
- **API integration**: ข้อมูล mock ทั้งหมดจะถูกแทนที่ด้วย API calls จริง
- **Real screenshots**: placeholder image tags ในเอกสารนี้ ให้ RIS reviewer หรือทีม HR ถ่ายเองระหว่าง walkthrough
- **Sub-routes ของ self-service**: `/admin/self-service/field-config`, `/visibility`, `/mandatory`, `/readonly`, `/quick-actions`, `/tiles`
- **Sub-routes ของ users**: `/admin/users/data-permissions`, `/role-groups`, `/user-assignment`, `/proxy`, `/foundation-audit`, `/audit-report`
- **Sub-routes ของ system**: `/admin/system/reports`, `/integration`, `/features`, `/security`

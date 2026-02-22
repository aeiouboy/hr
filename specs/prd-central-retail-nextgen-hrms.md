# Central Retail Next-Gen HR System (HRMS)
# Product Requirements Document — ฉบับสมบูรณ์

---

| รายการ | ข้อมูล |
|--------|--------|
| เวอร์ชัน | 2.0 |
| วันที่ | 2026-02-22 |
| สถานะ | Draft |
| เจ้าของเอกสาร | Product Team — RIS |
| อ้างอิง | docs/prd.md (v1.0), specs/docs/ (AI Documentation Agent) |

---

## สารบัญ

1. [Executive Summary](#1-executive-summary)
2. [System Architecture — Multi-Tier Microservices](#2-system-architecture)
3. [Module Inventory — Mapping 29 Modules → Microservices](#3-module-inventory)
4. [Data Model](#4-data-model)
5. [Functional Requirements](#5-functional-requirements)
6. [User Stories](#6-user-stories)
7. [Workflows](#7-workflows)
8. [API Design](#8-api-design)
9. [UX/UI Design — Wireframes](#9-uxui-design)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Integration Map](#11-integration-map)
12. [Implementation Roadmap](#12-implementation-roadmap)
13. [Role-Based Access Control](#13-role-based-access-control)
14. [Appendix](#14-appendix)

---

# 1. Executive Summary

## 1.1 Vision Statement

Central Retail Next-Gen HR System คือแพลตฟอร์ม Human Capital Management ระดับ Enterprise สำหรับกลุ่มธุรกิจ Central Group ที่ออกแบบเพื่อทดแทนระบบ SuccessFactors ด้วยสถาปัตยกรรม Microservices ที่ยืดหยุ่น รองรับพนักงาน 70,000+ คน ทั่วประเทศไทยและภูมิภาค

**Vision:** _"Empower every employee and manager with intelligent, self-service HR tools — reducing administrative burden by 60% while ensuring 99.9% data accuracy."_

## 1.2 Business Objectives

| วัตถุประสงค์ | เป้าหมาย | Baseline |
|-------------|---------|---------|
| ลดภาระงาน HR Admin | 60% | จากการประเมินปัจจุบัน |
| เพิ่มความถูกต้องของข้อมูลพนักงาน | 95%+ | ปัจจุบัน ~75% |
| ลดเวลาอัปเดตข้อมูล | จาก 3-5 วัน → 1 วัน | ผ่าน Workflow |
| First Contentful Paint | < 1.5 วินาที | ปัจจุบัน 3-4 วินาที |
| Approval cycle time | < 24 ชั่วโมง | ปัจจุบัน 3-5 วัน |
| Employee Satisfaction Score | > 4.0/5.0 | ไม่มีข้อมูล |

## 1.3 Target Users

| Role | ภาษาไทย | จำนวน (ประมาณ) | Primary Actions |
|------|---------|----------------|-----------------|
| Employee | พนักงาน | 65,000+ | ดู/แก้ไขข้อมูลส่วนตัว, ยื่นขอลา/OT, ดูสลิปเงินเดือน |
| Manager | ผู้จัดการ | 4,000+ | อนุมัติคำขอทีม, ดู Dashboard, ติดตามผลงาน |
| HR Admin | เจ้าหน้าที่ HR | 500+ | จัดการข้อมูลพนักงาน, ประมวลผลเงินเดือน, รายงาน |
| HR Manager | ผู้จัดการ HR | 100+ | อนุมัติ Workflow สำคัญ, ดูรายงานระดับองค์กร |

## 1.4 Key Differentiators

เปรียบเทียบกับ Prototype (Vanilla JS) ที่มีอยู่:

| ด้าน | Prototype (ปัจจุบัน) | Next-Gen System |
|------|---------------------|----------------|
| Architecture | Monolithic SPA (Vanilla JS) | Microservices (Next.js 16 + NestJS 11) |
| Database | Mock Data (JavaScript arrays) | PostgreSQL 17 (Production) |
| Authentication | Simulated login | OAuth2 / SAML 2.0 (Keycloak) |
| Scalability | Single server | Kubernetes auto-scaling |
| AI Features | ไม่มี | Smart Claims (AI OCR), Policy Validation |
| Approval Speed | Manual, หลายวัน | Quick Approve (1-tap batch) |
| Observability | Console.log | Grafana + ELK + Jaeger (full trace) |
| Thai Compliance | Simulated | PIT, SSO, PDPA สมบูรณ์ |

---

# 2. System Architecture

## 2.1 Architecture Diagram (Multi-Tier Microservices)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          LAYER 1: CLIENT TIER                                   │
├─────────────────────────┬───────────────────────────┬───────────────────────────┤
│   Web Application       │   Mobile Application      │   Admin Portal            │
│   Next.js 16 (RSC)      │   React Native 0.77       │   Next.js 16              │
│   Tailwind CSS 4.1      │   Expo SDK 54             │   Internal Tools          │
└─────────────────────────┴───────────────────────────┴───────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                       LAYER 2: API GATEWAY TIER                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│   Kong API Gateway / AWS API Gateway                                            │
│   • Rate Limiting (1000 req/min/user)    • SSL Termination                     │
│   • Request Routing                      • Load Balancing                       │
│   • JWT Validation                       • Circuit Breaker                      │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     LAYER 3: AUTHENTICATION & AUTHORIZATION                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│   Keycloak (OAuth2 / OpenID Connect / SAML 2.0)                                │
│   • Azure AD SSO Integration            • MFA Support                          │
│   • RBAC Token Claims                   • Session Management (30 min timeout)  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                          ┌─────────────┼──────────────┐
                          ▼             ▼              ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      LAYER 4: MICROSERVICES TIER                                │
├───────────────────┬────────────────┬──────────────────┬─────────────────────────┤
│ Employee Center   │ Payroll Mgmt   │ Time & Attendance │ Workflow Engine         │
│ NestJS            │ NestJS         │ NestJS            │ NestJS                  │
├───────────────────┼────────────────┼──────────────────┼─────────────────────────┤
│ Leave Management  │ Performance    │ L&D Service      │ Recruitment &           │
│ NestJS            │ & Talent       │ NestJS            │ Onboarding NestJS       │
│                   │ NestJS         │                   │                         │
├───────────────────┼────────────────┼──────────────────┼─────────────────────────┤
│ Document Service  │ Org Service    │ Benefits Mgmt    │ Settings Service        │
│ NestJS            │ NestJS         │ NestJS            │ NestJS                  │
└───────────────────┴────────────────┴──────────────────┴─────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        LAYER 5: DATA TIER                                       │
├───────────────────┬────────────────┬──────────────────┬─────────────────────────┤
│ PostgreSQL 17     │ Redis Cache    │ Elasticsearch    │ Apache Kafka            │
│ (Primary DB)      │ (Session/Cache)│ (Search/Log)     │ (Message Bus)           │
├───────────────────┼────────────────┼──────────────────┼─────────────────────────┤
│ AWS S3 / MinIO    │ AWS RDS        │                  │                         │
│ (File Storage)    │ (Read Replica) │                  │                         │
└───────────────────┴────────────────┴──────────────────┴─────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     LAYER 6: OBSERVABILITY TIER                                 │
├───────────────────┬────────────────┬──────────────────┬─────────────────────────┤
│ Grafana           │ ELK Stack      │ Jaeger           │ Prometheus              │
│ (Dashboards)      │ (Log Mgmt)     │ (Distributed     │ (Metrics)               │
│                   │                │  Tracing)        │                         │
└───────────────────┴────────────────┴──────────────────┴─────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    LAYER 7: INFRASTRUCTURE TIER                                 │
├───────────────────┬────────────────┬──────────────────┬─────────────────────────┤
│ Kubernetes (EKS)  │ GitHub Actions │ ArgoCD           │ AWS VPC                 │
│ (Container Orch.) │ (CI Pipeline)  │ (CD/GitOps)      │ (Network Security)      │
└───────────────────┴────────────────┴──────────────────┴─────────────────────────┘
```

## 2.2 Tech Stack

| Layer | Technology | เวอร์ชัน | วัตถุประสงค์ |
|-------|-----------|---------|------------|
| **Frontend** | Next.js | 16.1 | React Server Components, App Router |
| **Frontend UI** | Tailwind CSS + shadcn/ui | 4.1 | Utility-first styling |
| **Mobile** | React Native + Expo | 0.77 / SDK 54 | iOS/Android employee app |
| **API Gateway** | Kong | 3.9 | Rate limiting, routing, auth |
| **Backend** | NestJS (TypeScript) | 11.1 | RESTful microservices |
| **ORM** | Prisma | 6.19 | Database abstraction |
| **Primary DB** | PostgreSQL | 17.2 | Relational data store |
| **Cache** | Redis | 7.4 | Session, API cache, rate limiting |
| **Message Bus** | Apache Kafka | 3.9 | Async event streaming |
| **Search** | Elasticsearch | 8.17 | Full-text search, log aggregation |
| **Auth** | Keycloak | 26.5 | OAuth2, SAML 2.0, RBAC |
| **File Storage** | AWS S3 / MinIO | RELEASE.2025-01 | Documents, payslips, certificates |
| **Metrics** | Prometheus + Grafana | 3.1 / 11.5 | Performance monitoring |
| **Logging** | ELK Stack (Elasticsearch + Logstash + Kibana) | 8.17 | Centralized log management |
| **Tracing** | Jaeger | 2.3 | Distributed request tracing |
| **Container** | Docker + Kubernetes (EKS) | 27.5 / 1.32 | Container orchestration |
| **CI/CD** | GitHub Actions + ArgoCD | — / 2.13 | Automated deployment pipeline |

## 2.3 Layer Descriptions

### Layer 1: Client Tier
- **Web**: Next.js 16 App Router ใช้ React Server Components สำหรับ Server-side rendering เพื่อให้ FCP < 1.5 วินาที รองรับ Thai/English i18n
- **Mobile**: React Native แอปสำหรับพนักงาน (leave request, payslip, profile) รองรับ iOS 15+ และ Android 10+
- **Admin**: Internal portal สำหรับ HR ทำ bulk operations, รายงาน

### Layer 2: API Gateway Tier
- Single entry point ทุก request จาก Client ผ่าน API Gateway
- Rate limiting ป้องกัน abuse
- JWT validation ก่อน forward ไปยัง services

### Layer 3: Authentication Tier
- Keycloak เป็น Identity Provider หลัก
- รองรับ Azure AD SSO สำหรับ CG Group employees
- RBAC claims ฝังใน JWT token

### Layer 4: Microservices Tier
- แต่ละ service เป็น NestJS แยก deployment บน Kubernetes
- Communication: REST (synchronous) + Kafka (asynchronous)
- แต่ละ service มี database schema ของตัวเอง

### Layer 5: Data Tier
- PostgreSQL หลักสำหรับ transactional data
- Redis สำหรับ session management และ API response caching
- Elasticsearch สำหรับ search และ log aggregation
- Kafka สำหรับ async events ระหว่าง services
- S3/MinIO สำหรับ file storage

### Layer 6: Observability Tier
- Prometheus scrapes metrics จากทุก service
- Grafana dashboards สำหรับ real-time monitoring
- ELK Stack สำหรับ centralized logging
- Jaeger สำหรับ distributed tracing end-to-end

### Layer 7: Infrastructure Tier
- Kubernetes (EKS) จัดการ container lifecycle
- GitHub Actions + ArgoCD สำหรับ GitOps CI/CD pipeline
- AWS VPC สำหรับ network isolation

## 2.4 Architecture Principles

| Principle | Description |
|-----------|-------------|
| **Microservices** | แต่ละ domain แยก service อิสระ deploy/scale แยกกันได้ |
| **Event-Driven** | ใช้ Kafka สำหรับ async communication ลด coupling |
| **API-First** | ทุก feature expose ผ่าน REST API ก่อน build UI |
| **Security by Default** | TLS everywhere, encryption at rest, PII masking |
| **Thai Compliance** | PDPA, PIT calculation, SSO reporting, Buddhist calendar |
| **Observability First** | Metrics, Logs, Traces ทุก service ตั้งแต่วันแรก |

---

# 3. Module Inventory

## 3.1 Module → Microservice Mapping (ครบ 29 modules)

| # | Module Key | ชื่อภาษาไทย | Domain Group | Target Microservice | สถานะ |
|---|------------|------------|-------------|---------------------|-------|
| 1 | `profile` | โปรไฟล์พนักงาน | Employee Self-Service | Employee Center | Migrate |
| 2 | `personal-info` | ข้อมูลส่วนตัว | Employee Self-Service | Employee Center | Migrate |
| 3 | `payslip` | สลิปเงินเดือน | Employee Self-Service | Document Service | Migrate |
| 4 | `leave-request` | การลา | Employee Self-Service | Leave Management | Migrate |
| 5 | `overtime` | โอทีและทำงานล่วงเวลา | Employee Self-Service | Time & Attendance | Migrate |
| 6 | `payroll-setup` | ตั้งค่าเงินเดือน | Payroll & Finance | Payroll Management | Migrate |
| 7 | `payroll-processing` | ประมวลผลเงินเดือน | Payroll & Finance | Payroll Management | Migrate |
| 8 | `government-reports` | รายงานราชการ | Payroll & Finance | Payroll Management | Migrate |
| 9 | `compensation` | ค่าตอบแทน | Payroll & Finance | Payroll Management | Migrate |
| 10 | `benefits` | สวัสดิการ | Payroll & Finance | Benefits Management | Migrate |
| 11 | `performance` | การประเมินผลงาน | Performance & Talent | Performance & Talent | Migrate |
| 12 | `scorecard` | Scorecard และ KPI | Performance & Talent | Performance & Talent | Migrate |
| 13 | `talent-management` | การจัดการความสามารถพิเศษ | Performance & Talent | Performance & Talent | Migrate |
| 14 | `succession-planning` | การวางแผนสืบทอดตำแหน่ง | Performance & Talent | Performance & Talent | Migrate |
| 15 | `idp` | แผนพัฒนารายบุคคล | Performance & Talent | Performance & Talent | Migrate |
| 16 | `learning` | การเรียนรู้และฝึกอบรม | Performance & Talent | L&D Service | Migrate |
| 17 | `training-records` | บันทึกการฝึกอบรม | Performance & Talent | L&D Service | Migrate |
| 18 | `workflows` | การอนุมัติและ Workflow | HR Operations | Workflow Engine | Migrate |
| 19 | `position-management` | การจัดการตำแหน่ง | HR Operations | Organization Service | Migrate |
| 20 | `transfer-request` | คำขอโอนย้าย | HR Operations | Organization Service | Migrate |
| 21 | `org-chart` | แผนผังองค์กร | HR Operations | Organization Service | Migrate |
| 22 | `manager-dashboard` | แดชบอร์ดผู้จัดการ | HR Operations | Manager Self-Service | **Enhanced** |
| 23 | `settings` | การตั้งค่าระบบ | HR Operations | Settings Service | Migrate |
| 24 | `recruitment` | การสรรหาพนักงาน | Recruitment & Onboarding | Recruitment & Onboarding | Migrate |
| 25 | `candidate-screening` | การคัดกรองผู้สมัคร | Recruitment & Onboarding | Recruitment & Onboarding | Migrate |
| 26 | `onboarding` | การปฐมนิเทศพนักงานใหม่ | Recruitment & Onboarding | Recruitment & Onboarding | Migrate |
| 27 | `resignation` | การลาออก | Recruitment & Onboarding | Recruitment & Onboarding | Migrate |
| 28 | `time-management` | การบริหารเวลา | Time & Attendance | Time & Attendance | Migrate |
| 29 | `location-management` | การจัดการสถานที่ | Time & Attendance | Time & Attendance | Migrate |
| 30 | `smart-claims` | Smart Claims | — | Benefits Management | **New** |
| 31 | `quick-approve` | Quick Approve Hub | — | Workflow Engine | **New** |

## 3.2 Microservice Descriptions

### MS-01: Employee Center
**Modules:** `profile`, `personal-info`
**หน้าที่:** เป็น single source of truth สำหรับข้อมูลพนักงาน ทั้งข้อมูลส่วนตัว การจ้างงาน และโครงสร้างองค์กรของพนักงานแต่ละคน
**Database:** `employee_db` (PostgreSQL)
**Key Events Published:** `EMPLOYEE_UPDATED`, `PERSONAL_INFO_CHANGED`, `EMPLOYMENT_CHANGED`

### MS-02: Payroll Management
**Modules:** `payroll-setup`, `payroll-processing`, `government-reports`, `compensation`
**หน้าที่:** จัดการวงจรเงินเดือนทั้งหมด ตั้งแต่ master data ไปจนถึงการประมวลผลและรายงานภาษีราชการไทย
**Database:** `payroll_db` (PostgreSQL)
**Key Events Published:** `PAYROLL_PROCESSED`, `PAYSLIP_GENERATED`, `TAX_REPORT_CREATED`

### MS-03: Benefits Management
**Modules:** `benefits`, `smart-claims` (New)
**หน้าที่:** จัดการสวัสดิการ การเบิก-จ่าย พร้อม AI OCR สำหรับ Smart Claims
**Database:** `benefits_db` (PostgreSQL)
**Key Events Published:** `CLAIM_SUBMITTED`, `CLAIM_APPROVED`, `BENEFIT_ENROLLED`

### MS-04: Time & Attendance
**Modules:** `time-management`, `location-management`, `overtime`
**หน้าที่:** จัดการกะ บันทึกเข้า-ออกงาน โครงสร้างสถานที่ และการทำงานล่วงเวลา
**Database:** `time_db` (PostgreSQL) + ข้อมูล real-time ใน Redis
**Key Events Published:** `ATTENDANCE_RECORDED`, `OT_APPROVED`, `SHIFT_CHANGED`

### MS-05: Leave Management
**Modules:** `leave-request`
**หน้าที่:** จัดการคำขอลา 8 ประเภท พร้อม calendar integration และ balance calculation
**Database:** `leave_db` (PostgreSQL)
**Key Events Published:** `LEAVE_REQUESTED`, `LEAVE_APPROVED`, `LEAVE_CANCELLED`

### MS-06: Document Service
**Modules:** `payslip` (document generation aspect)
**หน้าที่:** สร้างและจัดเก็บเอกสาร PDF ทุกประเภท ทั้ง payslips, tax forms, certificates
**Storage:** AWS S3 / MinIO
**Key Events Published:** `DOCUMENT_GENERATED`, `DOCUMENT_DOWNLOADED`

### MS-07: Workflow Engine
**Modules:** `workflows`, `quick-approve` (New)
**หน้าที่:** Orchestrate approval workflows ทุกประเภท รองรับ multi-level approval, delegation, bulk operations
**Database:** `workflow_db` (PostgreSQL) + Kafka สำหรับ async routing
**Key Events Published:** `WORKFLOW_CREATED`, `STEP_APPROVED`, `WORKFLOW_COMPLETED`

### MS-08: Performance & Talent
**Modules:** `performance`, `scorecard`, `talent-management`, `succession-planning`, `idp`
**หน้าที่:** Goal setting, performance evaluation, talent identification, succession planning, individual development
**Database:** `talent_db` (PostgreSQL)
**Key Events Published:** `GOAL_SUBMITTED`, `PERFORMANCE_EVALUATED`, `IDP_APPROVED`

### MS-09: L&D Service
**Modules:** `learning`, `training-records`
**หน้าที่:** Course catalog, enrollment, training history, Kirkpatrick evaluation, certificate management
**Database:** `lnd_db` (PostgreSQL)
**Key Events Published:** `ENROLLED`, `COURSE_COMPLETED`, `CERTIFICATE_ISSUED`

### MS-10: Recruitment & Onboarding
**Modules:** `recruitment`, `candidate-screening`, `onboarding`, `resignation`
**หน้าที่:** End-to-end employee lifecycle ตั้งแต่สรรหา ปฐมนิเทศ จนถึงลาออก
**Database:** `hiring_db` (PostgreSQL)
**Key Events Published:** `CANDIDATE_HIRED`, `ONBOARDING_COMPLETED`, `RESIGNATION_APPROVED`

### MS-11: Organization Service
**Modules:** `position-management`, `transfer-request`, `org-chart`
**หน้าที่:** จัดการโครงสร้างองค์กร ตำแหน่งงาน และการโอนย้าย
**Database:** `org_db` (PostgreSQL)
**Key Events Published:** `POSITION_UPDATED`, `TRANSFER_APPROVED`, `ORG_RESTRUCTURED`

### MS-12: Manager Self-Service (Enhanced)
**Modules:** `manager-dashboard`
**หน้าที่:** Dashboard สำหรับผู้จัดการ รวม team metrics, pending approvals, bulk actions
**Database:** อ่านจาก services อื่นผ่าน API aggregation
**Key Events Published:** `BULK_APPROVED`, `MANAGER_ACTION_TAKEN`

### MS-13: Settings Service
**Modules:** `settings`
**หน้าที่:** System configuration: company info, leave policies, payroll settings, notification preferences
**Database:** `settings_db` (PostgreSQL)
**Key Events Published:** `POLICY_UPDATED`, `SETTINGS_CHANGED`

---

# 4. Data Model

## 4.1 Personal Information

### Sub-Sections

| Section | คำอธิบาย |
|---------|---------|
| Personal Information | ข้อมูลส่วนตัวพื้นฐาน |
| Advanced Information | ข้อมูลเพิ่มเติม (ศาสนา กรุ๊ปเลือด ทหาร วีซ่า) |
| Dependents | ข้อมูลผู้พึ่งพิง |
| Contact Information | ข้อมูลติดต่อ |
| Address Information | ที่อยู่ |
| Work Permit Information | ใบอนุญาตทำงาน |
| Emergency Contact | ผู้ติดต่อฉุกเฉิน |

### Data Fields — Personal Information
```
┌─────────────────────────────────────────────────────────────┐
│ Field Name              │ Type        │ Required │ Notes   │
├─────────────────────────────────────────────────────────────┤
│ employee_id             │ string      │ Yes      │ PK, Auto│
│ salutation_en           │ enum        │ Yes      │ Mr/Mrs/ │
│ salutation_th           │ enum        │ No       │ นาย/นาง │
│ firstname_en            │ string(100) │ Yes      │         │
│ firstname_th            │ string(100) │ No       │         │
│ middlename_en           │ string(100) │ No       │         │
│ lastname_en             │ string(100) │ Yes      │         │
│ lastname_th             │ string(100) │ No       │         │
│ nickname                │ string(50)  │ No       │         │
│ gender                  │ enum        │ Yes      │ M/F/O   │
│ date_of_birth           │ date        │ No       │         │
│ nationality             │ string      │ Yes      │ FK      │
│ national_id             │ string      │ No       │ Encrypt │
│ marital_status          │ enum        │ No       │         │
│ marital_status_since    │ date        │ No       │         │
└─────────────────────────────────────────────────────────────┘
```

### Data Fields — Contact Information
```
┌─────────────────────────────────────────────────────────────┐
│ Field Name              │ Type        │ Required │ Notes   │
├─────────────────────────────────────────────────────────────┤
│ business_email          │ string      │ Yes      │ Email   │
│ personal_email          │ string      │ No       │ Email   │
│ business_phone          │ string      │ No       │ Phone   │
│ personal_mobile         │ string      │ Yes      │ Phone   │
│ home_phone              │ string      │ No       │ Phone   │
└─────────────────────────────────────────────────────────────┘
```

### Data Fields — Address Information
```
┌─────────────────────────────────────────────────────────────┐
│ Field Name              │ Type        │ Required │ Notes   │
├─────────────────────────────────────────────────────────────┤
│ address_type            │ enum        │ Yes      │ Perm/Cur│
│ address_line_1          │ string(200) │ Yes      │         │
│ address_line_2          │ string(200) │ No       │         │
│ district                │ string(100) │ No       │         │
│ sub_district            │ string(100) │ No       │         │
│ province                │ string(100) │ Yes      │         │
│ postal_code             │ string(10)  │ Yes      │         │
│ country                 │ string      │ Yes      │ FK      │
│ attachment_url          │ string      │ No       │ File    │
│ effective_date          │ date        │ Yes      │         │
└─────────────────────────────────────────────────────────────┘
```

### Data Fields — Work Permit (สำหรับชาวต่างชาติ)
```
┌─────────────────────────────────────────────────────────────┐
│ Field Name              │ Type        │ Required │ Notes   │
├─────────────────────────────────────────────────────────────┤
│ permit_number           │ string      │ Yes      │ Unique  │
│ permit_type             │ string      │ Yes      │         │
│ issued_date             │ date        │ Yes      │         │
│ expiry_date             │ date        │ Yes      │ Alert   │
│ issuing_authority       │ string      │ Yes      │         │
│ document_url            │ string      │ No       │ S3 URL  │
└─────────────────────────────────────────────────────────────┘
```

## 4.2 Employment Information

### Sub-Sections

| Section | คำอธิบาย |
|---------|---------|
| Org. Chart | โครงสร้างองค์กร |
| Employment Details | รายละเอียดการจ้างงาน |
| Organization Information | ข้อมูลหน่วยงาน |
| Job Information | ข้อมูลตำแหน่งงาน |
| Job Relationship | ความสัมพันธ์ในงาน |

### Data Fields — Employment Details
```
┌─────────────────────────────────────────────────────────────┐
│ Field Name                    │ Type   │ Description       │
├─────────────────────────────────────────────────────────────┤
│ hire_date                     │ date   │ วันที่เริ่มงาน      │
│ original_start_date           │ date   │ วันเริ่มงานครั้งแรก  │
│ seniority_start_date          │ date   │ วันเริ่มนับอายุงาน   │
│ year_of_service               │ calc   │ อายุงาน (คำนวณ)    │
│ pass_probation_date           │ date   │ วันผ่านทดลองงาน    │
│ current_job_effective_date    │ date   │ วันมีผลตำแหน่งปัจจุบัน│
│ current_years_in_job          │ calc   │ อายุงานในตำแหน่ง    │
│ current_position_effective    │ date   │ วันมีผล Position   │
│ current_years_in_position     │ calc   │ อายุใน Position    │
└─────────────────────────────────────────────────────────────┘
```

### Data Fields — Organization Information
```
┌─────────────────────────────────────────────────────────────┐
│ Field Name              │ Example                           │
├─────────────────────────────────────────────────────────────┤
│ company                 │ RIS (C015)                        │
│ position                │ Product Manager (40128307)        │
│ group                   │ CG Thailand (60000000)            │
│ business_unit           │ RIS (10000019)                    │
│ function                │ RIS (20000106)                    │
│ organization            │ Product Management (30040490)     │
│ store_branch_code       │ HO (T020_1295)                    │
│ hr_district             │ CU - CG Corporate unit - RIS      │
│ cost_centre             │ 90991 (C01590991)                 │
│ work_location           │ Silom Tower (50000128)            │
└─────────────────────────────────────────────────────────────┘
```

### Data Fields — Job Information
```
┌─────────────────────────────────────────────────────────────┐
│ Field Name              │ Example                           │
├─────────────────────────────────────────────────────────────┤
│ employee_status         │ Active                            │
│ supervisor_id           │ FK to Employee                    │
│ country                 │ Thailand                          │
│ job_family              │ Digital & IT - Product Owner      │
│ job_code                │ Product Owner/Manager TL3         │
│ job_role                │ Product Owner/Manager TL3         │
│ job_type                │ Back Office                       │
│ employee_group          │ A - Permanent (A)                 │
│ contract_type           │ Regular                           │
│ contract_end_date       │ (nullable)                        │
└─────────────────────────────────────────────────────────────┘
```

## 4.3 Compensation

| Section | Data Fields |
|---------|-------------|
| Payment Information | Job Country/Region, Payment Method, Pay Type, Bank, Account Number (masked) |
| Payroll Information | Gross Amount (encrypted), Payslips, E-Letter, Tax Deduction |

## 4.4 Benefits

| Section | Data Fields |
|---------|-------------|
| Benefits Overview | My Active Enrolments, Plan Name, Coverage, Effective Date |
| Dependents | Name, Relationship, Coverage Status |

## 4.5 Profile

| Section | คำอธิบาย |
|---------|---------|
| Personal Information | Summary ข้อมูลส่วนตัว |
| E-Letter | Annual Bonus and Merit Increment Letters |
| Org Chart & Tags | โครงสร้างองค์กรและ Tags |
| Formal Education | ประวัติการศึกษา |
| Previous Employment | ประวัติการทำงานก่อนหน้า |
| Learning History | ประวัติการอบรม |
| Language Skills | ทักษะภาษา |
| Certification/License | ใบรับรองและใบอนุญาต |
| OHS Certificate | เอกสารความปลอดภัย |
| OHS Document | เอกสาร OHS |
| Honours/Awards | รางวัลและเกียรติยศ |
| Mobility | ความพร้อมในการย้าย |
| Individual Document | เอกสารส่วนตัว |

## 4.6 Scorecard

| Section | คำอธิบาย |
|---------|---------|
| CG Competency | Driving for Profitable Growth, Striving to Meet Customer Satisfaction, Building Organization Excellence, Promoting Sustainable Collaborations, Developing People, Leading Innovation |
| Personal Assessment History | Assessment Program |
| Personal Assessment Summary | Summary |
| Key Successes | ความสำเร็จ |
| Top Strengths & Development | จุดแข็งและการพัฒนา |
| Career Aspirations | เป้าหมายอาชีพ |
| Development Objectives | วัตถุประสงค์การพัฒนา |
| Talent Reference | อ้างอิง Talent |
| Performance-Potential Matrix | 9-Box Grid |
| Overall Final Calibration | Calibration สุดท้าย |

## 4.7 New Entities (ใหม่ — สำหรับ F6-F9)

### ClaimRequest (Smart Claims)
```
┌─────────────────────────────────────────────────────────────┐
│ Field Name              │ Type        │ Notes               │
├─────────────────────────────────────────────────────────────┤
│ claim_id                │ uuid        │ PK                  │
│ employee_id             │ string      │ FK → Employee       │
│ claim_type              │ enum        │ medical/travel/meal │
│ amount                  │ decimal     │ THB                 │
│ currency                │ string      │ THB                 │
│ receipt_date            │ date        │ วันที่ใบเสร็จ         │
│ receipt_url             │ string      │ S3 URL              │
│ ocr_result              │ jsonb       │ OCR extracted data  │
│ ocr_confidence          │ float       │ 0.0-1.0             │
│ policy_rule_id          │ uuid        │ FK → PolicyRule     │
│ status                  │ enum        │ draft/submitted/... │
│ submitted_at            │ timestamp   │                     │
│ approved_at             │ timestamp   │                     │
│ approved_by             │ string      │ FK → Employee       │
└─────────────────────────────────────────────────────────────┘
```

### PolicyRule (Real-time Policy Validation)
```
┌─────────────────────────────────────────────────────────────┐
│ Field Name              │ Type        │ Notes               │
├─────────────────────────────────────────────────────────────┤
│ rule_id                 │ uuid        │ PK                  │
│ rule_name               │ string      │                     │
│ claim_type              │ enum        │                     │
│ max_amount              │ decimal     │ THB per claim       │
│ max_amount_per_month    │ decimal     │ THB/month cap       │
│ requires_receipt        │ boolean     │                     │
│ requires_doctor_cert    │ boolean     │ สำหรับลาป่วย         │
│ min_days_notice         │ integer     │ สำหรับคำขอลา         │
│ effective_from          │ date        │                     │
│ effective_to            │ date        │                     │
│ eligible_grades         │ jsonb       │ ["A","B","C"]       │
│ is_active               │ boolean     │                     │
└─────────────────────────────────────────────────────────────┘
```

### ApprovalAction
```
┌─────────────────────────────────────────────────────────────┐
│ Field Name              │ Type        │ Notes               │
├─────────────────────────────────────────────────────────────┤
│ action_id               │ uuid        │ PK                  │
│ workflow_id             │ uuid        │ FK → Workflow       │
│ step_number             │ integer     │                     │
│ actor_id                │ string      │ FK → Employee       │
│ action                  │ enum        │ approve/reject/back │
│ comment                 │ text        │                     │
│ acted_at                │ timestamp   │                     │
│ ip_address              │ string      │ Audit               │
│ device_info             │ string      │ Audit               │
└─────────────────────────────────────────────────────────────┘
```

### OCRResult (AI OCR สำหรับ Smart Claims)
```
┌─────────────────────────────────────────────────────────────┐
│ Field Name              │ Type        │ Notes               │
├─────────────────────────────────────────────────────────────┤
│ ocr_id                  │ uuid        │ PK                  │
│ claim_id                │ uuid        │ FK → ClaimRequest   │
│ raw_text                │ text        │ Full OCR output     │
│ extracted_amount        │ decimal     │ ยอดเงินที่อ่านได้     │
│ extracted_date          │ date        │ วันที่ในใบเสร็จ       │
│ extracted_merchant      │ string      │ ชื่อร้านค้า          │
│ extracted_tax_id        │ string      │ เลขที่ผู้เสียภาษี    │
│ confidence_score        │ float       │ 0.0-1.0             │
│ model_version           │ string      │ AI model used       │
│ processing_time_ms      │ integer     │ ms                  │
│ needs_manual_review     │ boolean     │ confidence < 0.8    │
└─────────────────────────────────────────────────────────────┘
```

---

# 5. Functional Requirements

## 5.1 F1: Profile Dashboard (เดิม)

| Req ID | คำอธิบาย | Priority |
|--------|---------|---------|
| F1.1 | แสดง Profile Header พร้อมรูปภาพ, ชื่อ, ตำแหน่ง, แผนก | Must Have |
| F1.2 | แสดง Quick Stats (อายุงาน, วันลาคงเหลือ, etc.) | Should Have |
| F1.3 | Navigation Tabs สำหรับ 6 sections | Must Have |
| F1.4 | Effective Date selector สำหรับดูข้อมูลย้อนหลัง | Should Have |
| F1.5 | Support Thai / English language toggle | Must Have |

## 5.2 F2: Personal Information Management (เดิม)

| Req ID | คำอธิบาย | Priority |
|--------|---------|---------|
| F2.1 | CRUD สำหรับ Personal Information (HR only) | Must Have |
| F2.2 | Self-edit สำหรับ Contact Information (Employee) | Must Have |
| F2.3 | CRUD สำหรับ Address Information พร้อม Attachment + Approval | Must Have |
| F2.4 | CRUD สำหรับ Emergency Contacts (Employee direct) | Must Have |
| F2.5 | CRUD สำหรับ Dependents | Should Have |
| F2.6 | CRUD สำหรับ Work Permit (HR only) พร้อม expiry alert | Must Have |
| F2.7 | History tracking สำหรับทุกการเปลี่ยนแปลง | Must Have |

## 5.3 F3: Employment Information (เดิม)

| Req ID | คำอธิบาย | Priority |
|--------|---------|---------|
| F3.1 | แสดง Employment Details (read-only สำหรับ Employee) | Must Have |
| F3.2 | แสดง Organization Information | Must Have |
| F3.3 | แสดง Job Information | Must Have |
| F3.4 | แสดง Org Chart แบบ Interactive Tree | Should Have |

## 5.4 F4: Compensation Information (เดิม)

| Req ID | คำอธิบาย | Priority |
|--------|---------|---------|
| F4.1 | แสดง Payment Information (Bank, Account - masked) | Must Have |
| F4.2 | แสดง Payroll Summary (Gross — HR Manager only) | Must Have |
| F4.3 | Download Payslips (PDF) พร้อม Audit Log | Must Have |
| F4.4 | Download Tax Documents (50 ทวิ, ประกันสังคม, กองทุน) | Should Have |

## 5.5 F5: Workflow Engine (เดิม)

| Req ID | คำอธิบาย | Priority |
|--------|---------|---------|
| F5.1 | Multi-level Approval workflow (ขึ้นอยู่กับประเภท) | Must Have |
| F5.2 | Configurable Approval Rules ผ่าน Settings | Must Have |
| F5.3 | Auto-routing based on Change Type + Employee Org | Must Have |
| F5.4 | Email + In-app Notifications | Must Have |
| F5.5 | Delegation of Approval | Should Have |
| F5.6 | Bulk Approval | Could Have |
| F5.7 | Audit trail ทุก approval action | Must Have |

## 5.6 F6: Smart Claims (ใหม่)

ระบบ AI-powered expense claim ที่ใช้ OCR สแกนใบเสร็จอัตโนมัติ

| Req ID | คำอธิบาย | Priority |
|--------|---------|---------|
| F6.1 | อัปโหลดรูปใบเสร็จ (JPG, PNG, PDF) และ AI OCR สกัดข้อมูล | Must Have |
| F6.2 | แสดง OCR result พร้อม Confidence Score และ manual override | Must Have |
| F6.3 | Validate ยอดเงินกับ Policy Rule แบบ real-time | Must Have |
| F6.4 | แจ้งเตือน error ก่อน submit (ยอดเกินสิทธิ์, เอกสารไม่ครบ) | Must Have |
| F6.5 | Track claim status: Draft → Submitted → Processing → Approved/Rejected | Must Have |
| F6.6 | รายงาน claim history และ YTD spending per category | Should Have |
| F6.7 | Mobile upload ด้วย camera capture | Could Have |

## 5.7 F7: Manager Self-Service (ใหม่/Enhanced)

| Req ID | คำอธิบาย | Priority |
|--------|---------|---------|
| F7.1 | Team Dashboard: headcount, attendance, pending approvals | Must Have |
| F7.2 | Quick Action Bar: approve leave, OT, claims ด้วย 1 คลิก | Must Have |
| F7.3 | Team Calendar รวม leave + shift ทุกคนในทีม | Must Have |
| F7.4 | Alert ลำดับความสำคัญ: urgent approvals, expiring docs | Should Have |
| F7.5 | Mini Org Chart แสดง direct reports พร้อม quick profile | Should Have |

## 5.8 F8: Quick Approve (ใหม่)

| Req ID | คำอธิบาย | Priority |
|--------|---------|---------|
| F8.1 | Approval Hub รวมทุก pending request ในหน้าเดียว | Must Have |
| F8.2 | Bulk Select + Bulk Approve/Reject (สูงสุด 50 รายการ) | Must Have |
| F8.3 | Filter by type, urgency, date range | Must Have |
| F8.4 | Preview request detail ใน slide-over panel | Should Have |
| F8.5 | Mobile push notification เพื่อ approve จากมือถือ | Could Have |
| F8.6 | Delegation: มอบหมาย approvals ให้ผู้อื่นชั่วคราว | Should Have |

## 5.9 F9: Real-time Policy Validation (ใหม่)

| Req ID | คำอธิบาย | Priority |
|--------|---------|---------|
| F9.1 | ตรวจ policy ก่อน submit: leave balance, OT limit, claim cap | Must Have |
| F9.2 | แสดง inline warnings และ suggestions ขณะกรอกฟอร์ม | Must Have |
| F9.3 | ป้องกัน submit หากละเมิด hard rules | Must Have |
| F9.4 | Soft rules → warn แต่ให้ submit พร้อม justification | Should Have |
| F9.5 | Policy rules configurable โดย HR Manager | Should Have |

---

# 6. User Stories

## 6.1 Epic 1: View Personal Information (เดิม)

| ID | User Story | Priority |
|----|------------|---------|
| US-001 | As an employee, I want to view my personal profile so that I can verify my information is correct | Must Have |
| US-002 | As an employee, I want to see my employment history so that I can track my career progression | Must Have |
| US-003 | As an employee, I want to view my org chart so that I know my reporting structure | Should Have |

## 6.2 Epic 2: Edit Personal Information (เดิม)

| ID | User Story | Priority |
|----|------------|---------|
| US-004 | As an employee, I want to update my contact information so that HR can reach me | Must Have |
| US-005 | As an employee, I want to update my emergency contacts so that they are current | Must Have |
| US-006 | As an employee, I want to add my dependents so that I can claim benefits | Should Have |

## 6.3 Epic 3: Workflow Management (เดิม)

| ID | User Story | Priority |
|----|------------|---------|
| US-007 | As an employee, I want to track my pending requests so that I know the status | Must Have |
| US-008 | As an employee, I want to be notified when my request is approved/rejected | Must Have |

## 6.4 Epic 4: Manager Functions (เดิม)

| ID | User Story | Priority |
|----|------------|---------|
| US-009 | As a manager, I want to view my team's information so that I can manage them effectively | Must Have |
| US-010 | As a manager, I want to approve/reject employee requests so that changes can be processed | Must Have |
| US-011 | As a manager, I want to see pending approvals so that I don't miss any requests | Must Have |

## 6.5 Epic 5: Smart Claims (ใหม่)

| ID | User Story | Priority |
|----|------------|---------|
| US-012 | As an employee, I want to upload a receipt photo and have it auto-filled so that I save time on expense claims | Must Have |
| US-013 | As an employee, I want to see if my claim exceeds policy limits before submitting so that I don't waste time on invalid claims | Must Have |
| US-014 | As an HR admin, I want to see OCR confidence scores so that I know which claims need manual review | Should Have |
| US-015 | As a manager, I want to approve multiple claims at once so that I process them efficiently | Must Have |

## 6.6 Epic 6: Manager Self-Service (ใหม่)

| ID | User Story | Priority |
|----|------------|---------|
| US-016 | As a manager, I want a dashboard that shows all my team metrics at a glance so that I don't have to check multiple screens | Must Have |
| US-017 | As a manager, I want to see team leave calendar so that I can plan coverage | Must Have |
| US-018 | As a manager, I want urgent alerts at the top so that I don't miss time-sensitive approvals | Should Have |
| US-019 | As a manager, I want quick action buttons so that I can take action without navigating away | Must Have |

## 6.7 Epic 7: Quick Approve (ใหม่)

| ID | User Story | Priority |
|----|------------|---------|
| US-020 | As a manager, I want to see all pending requests in one place, filtered by type, so that I can prioritize my work | Must Have |
| US-021 | As a manager, I want to bulk approve multiple requests so that I can process them efficiently | Must Have |
| US-022 | As a manager, I want to delegate my approvals when I'm on leave so that work doesn't stop | Should Have |

## 6.8 Epic 8: Policy Compliance (ใหม่)

| ID | User Story | Priority |
|----|------------|---------|
| US-023 | As an employee, I want to see my remaining leave balance and OT limit while filling a request so that I know if I'm eligible | Must Have |
| US-024 | As an employee, I want to be warned if my claim amount exceeds my monthly cap before I submit | Must Have |
| US-025 | As an HR manager, I want to configure policy rules in the system so that they're automatically enforced | Should Have |

---

# 7. Workflows

## 7.1 Standard Approval Process (เดิม)

```
┌─────────────────────────────────────────────────────────────┐
│                  WORKFLOW APPROVAL PROCESS                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. REQUEST SUBMISSION                                      │
│     │                                                       │
│     │  พนักงานส่งคำขอเปลี่ยนแปลงข้อมูล / ลา / OT / Claims    │
│     │  - ระบุ Effective Date                                │
│     │  - กรอกข้อมูลที่ต้องการ                               │
│     │  - แนบเอกสาร (ถ้ามี)                                  │
│     │  - [F9] Real-time Policy Validation ก่อน Submit        │
│     ▼                                                       │
│  2. WORKFLOW ROUTING                                        │
│     │                                                       │
│     │  ระบบส่งคำขอไปยังผู้อนุมัติตาม Configuration          │
│     │  - Based on Change Type (simple vs sensitive)         │
│     │  - Based on Employee's Organization Unit              │
│     │  - Based on Approval Rules (configured in Settings)   │
│     ▼                                                       │
│  3. APPROVAL / REJECTION                                    │
│     │                                                       │
│     │  ผู้อนุมัติพิจารณาและดำเนินการ                         │
│     │  ┌─────────┬─────────┬─────────┐                      │
│     │  │ Approve │ Reject  │Send Back│                      │
│     │  └────┬────┴────┬────┴────┬────┘                      │
│     │       │         │         │                           │
│     ▼       ▼         ▼         ▼                           │
│  4. NOTIFICATION                                            │
│                                                             │
│     แจ้งผลไปยังผู้เกี่ยวข้อง                                │
│     - Email Notification (immediate / daily digest)        │
│     - In-app Notification (bell icon badge)                │
│     - Kafka event → downstream services                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Approval Levels by Change Type

| ประเภทคำขอ | Level 1 | Level 2 | Level 3 |
|-----------|---------|---------|---------|
| Contact Info (ข้อมูลติดต่อส่วนตัว) | Auto-approve | — | — |
| Emergency Contact | Auto-approve | — | — |
| Address Change | Manager | — | — |
| Leave Request | Manager | HR (ถ้าเกิน 5 วัน) | — |
| OT Request | Manager | — | — |
| Expense Claim | Manager | Finance | — |
| Transfer Request (Internal) | Manager | New Manager | HR |
| Transfer Request (Cross-company) | Manager | New Manager | HR Source + HR Dest |
| Compensation Change | HR Manager | Finance Director | — |
| Termination | HR Manager | — | — |

## 7.2 Smart Claims Workflow (ใหม่)

```
┌─────────────────────────────────────────────────────────────┐
│                    SMART CLAIMS WORKFLOW                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. RECEIPT UPLOAD                                          │
│     │  พนักงานอัปโหลดรูปใบเสร็จ (Camera / File Upload)     │
│     ▼                                                       │
│  2. AI OCR PROCESSING (< 3 วินาที)                         │
│     │  - Extract: amount, date, merchant, tax ID           │
│     │  - Confidence Score: 0.0 - 1.0                       │
│     │  - If < 0.8 → flag for manual review                 │
│     ▼                                                       │
│  3. REAL-TIME POLICY CHECK [F9]                             │
│     │  - ตรวจสอบ claim type และ policy rule                 │
│     │  - ตรวจสอบยอดเงินกับ max_amount                      │
│     │  - ตรวจสอบ YTD spending vs. monthly cap              │
│     │  - If violation → show inline warning                 │
│     ▼                                                       │
│  4. EMPLOYEE REVIEW & SUBMIT                                │
│     │  พนักงานตรวจสอบ OCR result                            │
│     │  แก้ไขได้หากต้องการ                                   │
│     │  กด Submit                                           │
│     ▼                                                       │
│  5. APPROVAL ROUTING                                        │
│     │                                                       │
│     ├─→ Amount ≤ Policy Auto-Approve Threshold → Auto-approve│
│     │                                                       │
│     └─→ Amount > Threshold → Manager → Finance             │
│     ▼                                                       │
│  6. SETTLEMENT                                              │
│     │  โอนเงินเข้าบัญชีพนักงานในรอบเงินเดือนถัดไป           │
│     │  หรือ Advance Payment (ตาม Policy)                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 7.3 Quick Approve Workflow (ใหม่)

```
┌─────────────────────────────────────────────────────────────┐
│                   QUICK APPROVE WORKFLOW                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. MANAGER OPENS APPROVAL HUB                              │
│     │  ดู list รวม pending requests ทุกประเภท              │
│     │  - Filter: type / urgency / date range               │
│     │  - Sort: date submitted / urgency level              │
│     ▼                                                       │
│  2. REVIEW (Optional)                                       │
│     │  คลิก Preview → Slide-over panel แสดงรายละเอียด      │
│     │  เห็น Before/After สำหรับข้อมูลที่เปลี่ยนแปลง          │
│     ▼                                                       │
│  3. BULK ACTION                                             │
│     │  □ Select all / Select filtered                      │
│     │  [Bulk Approve] → ต้องกรอก reason (optional)         │
│     │  [Bulk Reject] → ต้องกรอก reason (required)          │
│     ▼                                                       │
│  4. CONFIRMATION                                            │
│     │  Modal confirmation แสดงจำนวนรายการ                   │
│     │  [Confirm] → ส่ง batch action → Kafka                 │
│     ▼                                                       │
│  5. RESULT                                                  │
│     │  Toast notification: "Approved 23 requests"           │
│     │  Kafka events fired → notify employees                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 7.4 Leave Request Workflow

```
Employee → Submit Request
     │
     ├─ [F9] ตรวจสอบ: balance, calendar conflict, min notice
     │
     ▼
Workflow Engine → Route to Manager
     │
     ├─ ≤ 5 วัน → Manager approval only
     │
     └─ > 5 วัน → Manager + HR approval
          │
          ▼
Notification sent → Employee
     │
     ├─ Approved → Leave balance deducted → Calendar updated
     └─ Rejected → Employee gets reason → Can resubmit
```

## 7.5 Payroll Processing Workflow (4 Stages)

```
Stage 1: เลือกงวด (Period Selection)
  → HR Admin เลือกเดือน/ปี + กรองแผนก

Stage 2: คำนวณ (Calculation)
  → ระบบคำนวณอัตโนมัติ
  → ตรวจสอบ variance > 10%
  → สร้าง draft payroll run

Stage 3: ตรวจสอบ (Review)
  → HR Admin ดู exception list
  → แก้ไขรายการที่ผิดปกติ
  → ยืนยัน Draft

Stage 4: อนุมัติ (Approval)
  → Level 1: HR Manager อนุมัติ
  → Level 2: Finance Director อนุมัติ
  → Payroll finalized → Payslips generated → Bank transfer initiated
```

---

# 8. API Design

## 8.1 API Gateway Design

```
Client → API Gateway (Kong)
         ├─ /api/v1/employees/*       → Employee Center
         ├─ /api/v1/payroll/*         → Payroll Management
         ├─ /api/v1/benefits/*        → Benefits Management
         ├─ /api/v1/leave/*           → Leave Management
         ├─ /api/v1/overtime/*        → Time & Attendance
         ├─ /api/v1/workflows/*       → Workflow Engine
         ├─ /api/v1/performance/*     → Performance & Talent
         ├─ /api/v1/recruitment/*     → Recruitment & Onboarding
         ├─ /api/v1/org/*             → Organization Service
         ├─ /api/v1/documents/*       → Document Service
         └─ /api/v1/settings/*        → Settings Service
```

## 8.2 REST Conventions

| Convention | Description |
|-----------|-------------|
| Base URL | `https://hrms.centralgroup.com/api/v1` |
| Auth Header | `Authorization: Bearer {jwt_token}` |
| Content-Type | `application/json` |
| Date Format | ISO 8601: `2026-02-22T10:30:00Z` |
| Pagination | `?page=1&limit=20` |
| Sorting | `?sortBy=createdAt&order=desc` |
| Response Envelope | `{ data, meta, errors }` |
| Error Format | `{ code, message, details }` |

## 8.3 JSON Payload Examples

### Employee Profile (GET /api/v1/employees/{id})
```json
{
  "data": {
    "employeeId": "EMP001",
    "personalInfo": {
      "firstnameTh": "สมชาย",
      "lastnameTh": "ใจดี",
      "firstnameEn": "Somchai",
      "lastnameEn": "Jaidee",
      "nationalId": "3-1234-56789-01-2",
      "dateOfBirth": "1990-05-15",
      "gender": "M",
      "nationality": "TH",
      "maritalStatus": "married"
    },
    "employmentInfo": {
      "company": "RIS",
      "companyCode": "C015",
      "position": "Product Manager",
      "positionCode": "40128307",
      "department": "Digital & IT",
      "businessUnit": "RIS",
      "hireDate": "2020-01-01",
      "employeeGroup": "A",
      "contractType": "Regular",
      "supervisorId": "EMP000",
      "workLocation": "Silom Tower"
    },
    "contactInfo": {
      "businessEmail": "somchai.j@central.co.th",
      "personalMobile": "081-234-5678"
    }
  },
  "meta": {
    "requestId": "req-uuid-1234",
    "timestamp": "2026-02-22T10:30:00Z"
  }
}
```

### Leave Request (POST /api/v1/leave/requests)
```json
{
  "employeeId": "EMP001",
  "leaveType": "annual",
  "startDate": "2026-03-01",
  "endDate": "2026-03-03",
  "halfDay": null,
  "reason": "Family vacation",
  "substituteId": "EMP002",
  "attachments": []
}
```

### Leave Request Response
```json
{
  "data": {
    "requestId": "LR-2026-001",
    "employeeId": "EMP001",
    "leaveType": "annual",
    "startDate": "2026-03-01",
    "endDate": "2026-03-03",
    "workingDays": 3,
    "status": "pending",
    "policyCheck": {
      "passed": true,
      "remainingBalance": 12,
      "afterBalance": 9,
      "warnings": []
    },
    "workflow": {
      "currentStep": 1,
      "steps": [
        {
          "stepNumber": 1,
          "role": "manager",
          "actorId": "EMP000",
          "actorName": "นายสมศักดิ์ ผู้จัดการ",
          "status": "pending"
        }
      ]
    },
    "submittedAt": "2026-02-22T10:30:00Z"
  }
}
```

### Smart Claim (POST /api/v1/benefits/claims)
```json
{
  "employeeId": "EMP001",
  "claimType": "medical",
  "receiptImageUrl": "s3://hrms-docs/receipts/EMP001/20260222_receipt.jpg",
  "ocrData": {
    "extractedAmount": 1500.00,
    "extractedDate": "2026-02-20",
    "extractedMerchant": "Bangkok Hospital",
    "confidenceScore": 0.92
  },
  "confirmedAmount": 1500.00,
  "confirmedDate": "2026-02-20",
  "description": "ค่าตรวจสุขภาพประจำปี"
}
```

## 8.4 Kafka Event Patterns

### Event Published: LEAVE_REQUEST_SUBMITTED
```json
{
  "eventType": "LEAVE_REQUEST_SUBMITTED",
  "version": "1.0",
  "timestamp": "2026-02-22T10:30:00Z",
  "correlationId": "uuid-1234-5678",
  "source": "leave-management-service",
  "payload": {
    "requestId": "LR-2026-001",
    "employeeId": "EMP001",
    "managerId": "EMP000",
    "leaveType": "annual",
    "startDate": "2026-03-01",
    "endDate": "2026-03-03",
    "workingDays": 3
  }
}
```

### Event Published: LEAVE_REQUEST_APPROVED
```json
{
  "eventType": "LEAVE_REQUEST_APPROVED",
  "version": "1.0",
  "timestamp": "2026-02-22T11:00:00Z",
  "correlationId": "uuid-1234-5678",
  "source": "workflow-engine",
  "payload": {
    "requestId": "LR-2026-001",
    "employeeId": "EMP001",
    "approvedBy": "EMP000",
    "approvedAt": "2026-02-22T11:00:00Z",
    "leaveBalanceAfter": 9
  }
}
```

### Event Published: PAYROLL_PROCESSED
```json
{
  "eventType": "PAYROLL_PROCESSED",
  "version": "1.0",
  "timestamp": "2026-02-28T20:00:00Z",
  "correlationId": "uuid-payroll-feb",
  "source": "payroll-management-service",
  "payload": {
    "payrollRunId": "PR-2026-02",
    "period": "2026-02",
    "totalEmployees": 1250,
    "totalGrossPay": 45000000.00,
    "totalNetPay": 38500000.00,
    "processedAt": "2026-02-28T20:00:00Z",
    "approvedBy": "HR001",
    "status": "completed"
  }
}
```

---

# 9. UX/UI Design

## 9.1 Manager Dashboard Wireframe (ใหม่)

```
┌─────────────────────────────────────────────────────────────────────┐
│ HEADER: [CG Logo] Employee Files ▼      🔔 ⚙ [Avatar: MGR]         │
├─────────────────────────────────────────────────────────────────────┤
│ MANAGER DASHBOARD               [Quick Approve Hub]  [Team Calendar] │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ⚠ URGENT ALERTS                                                    │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │ 🔴 3 leave requests expiring today — [View All]              │    │
│  │ 🟡 2 OT claims require your approval                         │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  TEAM SUMMARY                                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ 45       │ │ 41       │ │ 4        │ │ 7        │ │ 2        │  │
│  │ Members  │ │ Present  │ │ On Leave │ │ Pending  │ │ Probation│  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                                      │
│  PENDING APPROVALS        TEAM MEMBERS                              │
│  ┌─────────────────────┐  ┌───────────────────────────────────────┐  │
│  │ □ Leave (3)         │  │ 🔵 Somchai J.    Product Mgr  Active  │  │
│  │ □ OT (2)            │  │ 🔵 Somying S.    UX Designer  Active  │  │
│  │ □ Claims (2)        │  │ 🟡 Pisit K.      Dev Lead     On Leave│  │
│  │ □ Info Change (0)   │  │ ...                                    │  │
│  │                     │  └───────────────────────────────────────┘  │
│  │ [Approve Selected]  │                                            │
│  │ [Reject Selected]   │  MINI ORG CHART                           │
│  └─────────────────────┘  ┌──────────────────────┐                  │
│                           │       [MGR]           │                  │
│  TEAM CALENDAR            │   ┌────┴───────┐      │                  │
│  ┌─────────────────────┐  │ [EMP1]    [EMP2]     │                  │
│  │ Mar 2026   ← →      │  └──────────────────────┘                  │
│  │ M T W T F S S       │                                            │
│  │ ...calendar view... │                                            │
│  └─────────────────────┘                                            │
└─────────────────────────────────────────────────────────────────────┘
```

## 9.2 Smart Claim Form Wireframe (ใหม่)

```
┌─────────────────────────────────────────────────────────────────────┐
│ HEADER: [CG Logo]                              🔔 ⚙ [Avatar]        │
├─────────────────────────────────────────────────────────────────────┤
│ < Back    SMART CLAIM — เบิกค่าใช้จ่าย                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  STEP 1: อัปโหลดใบเสร็จ                                             │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │                                                              │    │
│  │            📷 ถ่ายรูป  /  📎 อัปโหลดไฟล์                    │    │
│  │                                                              │    │
│  │         ลากและวางไฟล์ที่นี่ หรือคลิกเพื่อเลือก               │    │
│  │         รองรับ JPG, PNG, PDF (ไม่เกิน 10MB)                  │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  STEP 2: ผล AI OCR (อัตโนมัติ)           Confidence: 94% ✅        │
│  ┌────────────────────┐  ┌──────────────────────────────────────┐    │
│  │ [Receipt Preview]  │  │ ร้านค้า: Bangkok Hospital            │    │
│  │ (Scanned image)    │  │ วันที่:  20 ก.พ. 2569               │    │
│  │                    │  │ ยอดเงิน: ฿ 1,500.00                  │    │
│  │                    │  │ เลขที่ผู้เสียภาษี: 0-1054-12345     │    │
│  └────────────────────┘  └──────────────────────────────────────┘    │
│                                                                      │
│  STEP 3: รายละเอียดการเบิก                                          │
│  ┌────────────────────────────┐ ┌────────────────────────────────┐   │
│  │ ประเภท: ค่ารักษาพยาบาล  ▼ │ │ ยอดเบิก: ฿ [    1,500.00   ] │   │
│  └────────────────────────────┘ └────────────────────────────────┘   │
│                                                                      │
│  ⚡ POLICY CHECK (Real-time)                                         │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │ ✅ ยอดเงินไม่เกินสิทธิ์ต่อครั้ง (฿2,000)                    │    │
│  │ ✅ ยอดสะสมเดือนนี้: ฿3,500 / ฿5,000                          │    │
│  │ ✅ แนบใบเสร็จครบถ้วน                                         │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                      │
│                              [Save Draft]    [Submit Claim]          │
└─────────────────────────────────────────────────────────────────────┘
```

## 9.3 Quick Approve Hub Wireframe (ใหม่)

```
┌─────────────────────────────────────────────────────────────────────┐
│ HEADER: [CG Logo]                              🔔 ⚙ [Avatar: MGR]   │
├─────────────────────────────────────────────────────────────────────┤
│ QUICK APPROVE HUB                     7 pending approvals           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  FILTER: [All Types ▼] [All Urgency ▼] [Date Range ▼]  [Search...]  │
│                                                                      │
│  □ SELECT ALL (7)          [✅ Bulk Approve] [❌ Bulk Reject]        │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │ □ 🔴 URGENT  Leave Request — Somchai J.                       │    │
│  │   Annual Leave: 1-3 Mar 2026 (3 วัน)  Submitted: 22 Feb      │    │
│  │   [Preview ▶]  [✅ Approve]  [❌ Reject]                      │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │ □ 🔴 URGENT  OT Request — Pisit K.                            │    │
│  │   Overtime: 22 Feb 2026, 18:00-22:00 (4h)                    │    │
│  │   [Preview ▶]  [✅ Approve]  [❌ Reject]                      │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │ □ 🟡 NORMAL  Expense Claim — Somying S.                       │    │
│  │   Medical Claim: ฿1,500 (Bangkok Hospital, 20 Feb)           │    │
│  │   [Preview ▶]  [✅ Approve]  [❌ Reject]                      │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │ □ 🟢 LOW     Contact Info Change — Wichai P.                  │    │
│  │   Update personal mobile number                              │    │
│  │   [Preview ▶]  [✅ Approve]  [❌ Reject]                      │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  Showing 4 of 7    [Load more]                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## 9.4 Profile Page Layout (เดิม — จาก docs/prd.md)

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER: Logo | Navigation | Search | Icons | Avatar        │
├─────────────────────────────────────────────────────────────┤
│ PROFILE HEADER: Photo | Name | Title | ID | Location       │
│                                        Actions | Header | Date│
├─────────────────────────────────────────────────────────────┤
│ TABS: Personal | Employment | Compensation | Benefits | ... │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ CARD: Section Title                    [Edit][History]│  │
│  │ Effective Date: DD MMM YYYY                           │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │                                                       │  │
│  │  Label 1        Value 1       Label 2        Value 2  │  │
│  │  Label 3        Value 3       Label 4        Value 4  │  │
│  │  ...                                                  │  │
│  │                                                       │  │
│  │                                         [Show More]   │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ CARD: Next Section...                                 │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│                                                      [FAB]  │
└─────────────────────────────────────────────────────────────┘
```

## 9.5 Edit Modal Layout (เดิม — จาก docs/prd.md)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌───────────────────────────────────────────────────┐     │
│   │ Section Title                               [X]   │     │
│   ├───────────────────────────────────────────────────┤     │
│   │                                                   │     │
│   │  When should these changes take effect? *         │     │
│   │  ┌─────────────────────────────┐                  │     │
│   │  │ DD MMM YYYY              📅 │                  │     │
│   │  └─────────────────────────────┘                  │     │
│   │                                                   │     │
│   │  ─────────────────────────────────────────────    │     │
│   │                                                   │     │
│   │  ┌─────────────────┐  ┌─────────────────┐        │     │
│   │  │ Field 1 *     ▼ │  │ Field 2       ▼ │        │     │
│   │  └─────────────────┘  └─────────────────┘        │     │
│   │                                                   │     │
│   │  ┌─────────────────┐  ┌─────────────────┐        │     │
│   │  │ Field 3         │  │ Field 4         │        │     │
│   │  └─────────────────┘  └─────────────────┘        │     │
│   │                                                   │     │
│   │  Attachment                                       │     │
│   │  ┌───────────────────────────────────────────┐   │     │
│   │  │  📎 Drag files here or click to upload    │   │     │
│   │  └───────────────────────────────────────────┘   │     │
│   │                                                   │     │
│   ├───────────────────────────────────────────────────┤     │
│   │                           [Save]    [Cancel]      │     │
│   └───────────────────────────────────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 9.6 Information Architecture (เดิม — จาก docs/prd.md)

```
┌─────────────────────────────────────────────────────────────┐
│                 EMPLOYEE INFORMATION MODULE                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │   HOME   │  │ PROFILE  │  │ WORKFLOWS│  │ SETTINGS │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
│       │             │             │             │           │
│       ▼             ▼             ▼             ▼           │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Quick   │  │Personal │  │ Pending │  │Notifica-│        │
│  │ Actions │  │  Info   │  │Requests │  │  tions  │        │
│  ├─────────┤  ├─────────┤  ├─────────┤  └─────────┘        │
│  │ For You │  │Employm- │  │  Sent   │                     │
│  │  Today  │  │  ent    │  │  Back   │                     │
│  ├─────────┤  ├─────────┤  ├─────────┤                     │
│  │  Team   │  │Compensa-│  │Approved │                     │
│  │Summary  │  │  tion   │  ├─────────┤                     │
│  └─────────┘  ├─────────┤  │Reassign │                     │
│               │Benefits │  └─────────┘                     │
│               ├─────────┤                                  │
│               │ Profile │                                  │
│               ├─────────┤                                  │
│               │Scorecard│                                  │
│               └─────────┘                                  │
└─────────────────────────────────────────────────────────────┘
```

---

# 10. Non-Functional Requirements

## 10.1 Performance

| Requirement | Target | วิธีวัด |
|-------------|--------|--------|
| First Contentful Paint (FCP) | < 1.5 วินาที | Lighthouse / Core Web Vitals |
| Time to Interactive (TTI) | < 3 วินาที | Lighthouse |
| API Response Time (p95) | < 200ms | APM Metrics |
| API Response Time (p99) | < 500ms | APM Metrics |
| Concurrent Users | 10,000+ | Load Testing |
| Payroll Processing (1,000 employees) | < 30 วินาที | E2E Test |
| Document Generation (PDF) | < 5 วินาที | E2E Test |
| Bulk Approve (50 items) | < 3 วินาที | E2E Test |

## 10.2 Security

| Requirement | Implementation |
|-------------|---------------|
| Authentication | OAuth2 / OpenID Connect via Keycloak |
| Authorization | RBAC ด้วย JWT claims |
| Transport Encryption | TLS 1.3 everywhere (HTTPS) |
| Data at Rest (PII) | AES-256 encryption (national_id, bank_account) |
| Data at Rest (Salary) | AES-256 encryption สำหรับ salary fields |
| Session Management | 30 นาที inactivity timeout |
| Audit Trail | Log ทุก read/write action พร้อม actor_id, timestamp |
| PDPA Compliance | Data consent tracking, right to erasure, data portability |
| Penetration Testing | ทุก 6 เดือน + ก่อน major release |
| Dependency Scanning | GitHub Dependabot + SAST ใน CI pipeline |

## 10.3 Availability

| Requirement | Target |
|-------------|--------|
| System Uptime | 99.9% (ไม่เกิน 8.7 ชั่วโมง/ปี downtime) |
| Recovery Time Objective (RTO) | < 1 ชั่วโมง |
| Recovery Point Objective (RPO) | < 15 นาที |
| Backup Frequency | ทุก 1 ชั่วโมง (incremental), ทุกวัน (full) |
| Backup Retention | 30 วัน (incremental), 1 ปี (monthly) |
| Database Replication | Multi-AZ PostgreSQL (primary + read replica) |
| Service Redundancy | Minimum 2 pods per microservice |

## 10.4 Accessibility

- WCAG 2.1 Level AA compliance
- Keyboard navigation ทุก interactive element
- Screen reader support (ARIA labels)
- Minimum color contrast ratio 4.5:1
- Responsive design: Desktop (≥ 1280px), Tablet (768-1279px), Mobile (< 768px)
- Touch target size: minimum 44×44px (WCAG success criterion 2.5.5)

## 10.5 Internationalization

| Aspect | Specification |
|--------|--------------|
| Languages | Thai (th) และ English (en) |
| Date Format | Buddhist Era (พ.ศ.) สำหรับ Thai, CE (ค.ศ.) สำหรับ English |
| Number Format | `,` เป็น thousand separator, `.` เป็น decimal (en) |
| Currency | THB ฿ สำหรับ Thai, USD $ เป็น reference |
| Phone Format | +66 format สำหรับ Thai numbers |
| Default Language | Thai |

## 10.6 Data Retention

| Data Type | Retention Period |
|-----------|----------------|
| Employee Records (Active) | ตลอดอายุการจ้างงาน + 10 ปี |
| Payroll Records | 10 ปี (กฎหมายภาษีไทย) |
| Audit Logs | 7 ปี |
| Approval History | 7 ปี |
| Session Logs | 90 วัน |
| Temp Files / OCR | 24 ชั่วโมง |

---

# 11. Integration Map

## 11.1 Internal Systems

| ระบบ | Acronym | วัตถุประสงค์ | Integration Type |
|------|---------|------------|----------------|
| Retail Enterprise Core | REC | Organization structure, employee master | REST API (pull) |
| Learning Management System | LMS | Course sync, completion events | Kafka events |
| Retail Management System | RMS | Store/branch hierarchy | REST API (pull) |
| Time & Notification Service | TNS | Push notifications, SMS | REST API (push) |

## 11.2 CG Group Systems

| ระบบ | วัตถุประสงค์ | Integration Type |
|------|------------|----------------|
| CG File Gateway | เอกสาร HR ที่ต้องส่งกลุ่ม | SFTP / S3 sync |
| CG Data Hub | Analytics และ reporting รวม | Data pipeline (Kafka → Data Hub) |
| Informatica | ETL สำหรับ data migration จาก SuccessFactors | Batch ETL |
| CG SSO | Azure AD SSO สำหรับ authentication | SAML 2.0 |
| CG Finance | อนุมัติ payroll, budget management | REST API |

## 11.3 External Systems

| ระบบ | วัตถุประสงค์ | Integration Type |
|------|------------|----------------|
| Thai Revenue Department (กรมสรรพากร) | E-Filing ภ.ง.ด.1, ภ.ง.ด.1ก | HTTPS API / XML |
| Social Security Office (ประกันสังคม) | สปส.1-10 submission | HTTPS API |
| Thai Banks (15+ banks) | Bank transfer สำหรับเงินเดือน | BAHTNET / Prompt Pay |
| Google Workspace | Calendar sync, Email notifications | REST API |
| Twilio / DTAC | SMS notifications | REST API |

## 11.4 Integration Diagram (ASCII)

```
┌────────────────────────────────────────────────────────────────────┐
│                    CENTRAL GROUP HRMS                              │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    MICROSERVICES                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│              │                     │                    │          │
│              ▼                     ▼                    ▼          │
│  ┌─────────────────┐   ┌────────────────┐   ┌───────────────────┐  │
│  │  INTERNAL       │   │  CG GROUP      │   │  EXTERNAL         │  │
│  │                 │   │                │   │                   │  │
│  │  REC → Org Data │   │  CG Data Hub   │   │  Revenue Dept.    │  │
│  │  LMS → Courses  │   │  CG File GW    │   │  SSO (Prov. Fund) │  │
│  │  RMS → Stores   │   │  Informatica   │   │  Thai Banks       │  │
│  │  TNS → Notifs.  │   │  CG SSO (AAD)  │   │  Google Workspace │  │
│  │  CG Finance     │   │                │   │  SMS Gateway      │  │
│  └─────────────────┘   └────────────────┘   └───────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

---

# 12. Implementation Roadmap

## 12.1 Phase 1: Foundation (Q2 2026 — เม.ย.-มิ.ย. 2026)

**เป้าหมาย:** ตั้งระบบพื้นฐาน + Employee Center + Authentication

| รายการ | คำอธิบาย |
|--------|---------|
| Infrastructure Setup | Kubernetes cluster, PostgreSQL, Redis, Kafka, monitoring stack |
| Auth Service | Keycloak + Azure AD SSO + RBAC framework |
| Employee Center (MS-01) | profile, personal-info migration จาก prototype |
| Organization Service (MS-11) | org-chart, position-management |
| API Gateway | Kong setup, rate limiting, SSL |
| Developer Portal | API documentation, SDK |

**Milestone:** พนักงาน 100 คน (pilot group) ใช้ Employee Profile ได้บน Next-Gen System

## 12.2 Phase 2: Core HR (Q3 2026 — ก.ค.-ก.ย. 2026)

**เป้าหมาย:** Leave, Payroll, Workflow Engine

| รายการ | คำอธิบาย |
|--------|---------|
| Leave Management (MS-05) | leave-request + leave calendar |
| Payroll Management (MS-02) | payroll-setup, payroll-processing, compensation |
| Document Service (MS-06) | payslip PDF generation |
| Workflow Engine (MS-07) | workflows + approval routing |
| Settings Service (MS-13) | system configuration |
| Government Reports | ภ.ง.ด.1, สปส.1-10 integration |

**Milestone:** HR สามารถประมวลผลเงินเดือนรอบแรกผ่าน Next-Gen System

## 12.3 Phase 3: Talent & Recruitment (Q4 2026 — ต.ค.-ธ.ค. 2026)

**เป้าหมาย:** Performance, Learning, Recruitment modules

| รายการ | คำอธิบาย |
|--------|---------|
| Performance & Talent (MS-08) | performance, scorecard, talent-management, succession, idp |
| L&D Service (MS-09) | learning, training-records |
| Recruitment & Onboarding (MS-10) | recruitment, candidate-screening, onboarding, resignation |
| Time & Attendance (MS-04) | time-management, location-management, overtime |
| Benefits Management (MS-03) | benefits + enrollment |

**Milestone:** Full HR lifecycle ทำงานได้ครบ 29 modules

## 12.4 Phase 4: Advanced Features — AI & Enhanced UX (Q1 2027 — ม.ค.-มี.ค. 2027)

**เป้าหมาย:** New features F6-F9 + Mobile app

| รายการ | คำอธิบาย |
|--------|---------|
| Smart Claims (F6) | AI OCR receipt scanning + policy validation |
| Quick Approve Hub (F8) | Batch approval UX |
| Real-time Policy Validation (F9) | Pre-submit checking engine |
| Manager Self-Service (F7) | Enhanced dashboard + quick actions |
| Mobile App | React Native app สำหรับ Employee + Manager |
| Analytics Dashboard | Grafana dashboards สำหรับ HR insights |

**Milestone:** Employee NPS score > 4.0 จากการใช้ระบบใหม่

## 12.5 Phase 5: Integration & Go-Live (Q2 2027 — เม.ย.-มิ.ย. 2027)

**เป้าหมาย:** Full production rollout + SuccessFactors migration

| รายการ | คำอธิบาย |
|--------|---------|
| Data Migration | Informatica ETL จาก SuccessFactors → PostgreSQL |
| CG Data Hub Integration | Analytics pipeline setup |
| CG File Gateway | Document exchange |
| Performance Testing | Load test 10K concurrent users |
| Security Audit | Penetration testing + PDPA compliance audit |
| Training & Change Management | HR Admin + Manager training |
| Go-Live (Phased) | Rollout by business unit: RIS → ROW → CPN |

**Milestone:** 100% พนักงาน (70,000+) ใช้งาน Next-Gen HRMS

---

# 13. Role-Based Access Control

## 13.1 Role Hierarchy

```
HR Manager
  └─ สืบทอดสิทธิ์จาก HR Admin
        └─ สืบทอดสิทธิ์จาก Manager
              └─ สืบทอดสิทธิ์จาก Employee
```

## 13.2 RBAC Matrix — ครบ 29 Modules (+2 New)

| Module | Employee | Manager | HR Admin | HR Manager |
|--------|----------|---------|----------|------------|
| `profile` | ดูของตัวเอง | ดูทีม | ดูทั้งหมด | ดู+แก้ไขทั้งหมด |
| `personal-info` | แก้ไขติดต่อ/ฉุกเฉิน | ดูทีม | แก้ไขทั้งหมด | แก้ไขทั้งหมด |
| `payslip` | ดูของตัวเอง | — | ดูทั้งหมด | ดูทั้งหมด |
| `leave-request` | ยื่นขอลาของตัวเอง | ดู+อนุมัติทีม | ดู+อนุมัติทั้งหมด | อนุมัติ HR-level |
| `overtime` | ยื่นขอ OT | ดู+อนุมัติทีม | ดู+อนุมัติทั้งหมด | อนุมัติ HR-level |
| `payroll-setup` | — | — | ดู | ดู |
| `payroll-processing` | — | — | Run+ดู | Run+อนุมัติ |
| `government-reports` | — | — | สร้าง+ดาวน์โหลด | สร้าง+ดาวน์โหลด |
| `compensation` | ดู payment info | — | ดู | ดู+แก้ไขเงินเดือน |
| `benefits` | ดูของตัวเอง | — | ดูทั้งหมด | ดู+จัดการ |
| `performance` | ตั้งเป้าหมาย, Sign-Off | ดูทีม, อนุมัติ Goal | ดูทั้งหมด | ดูทั้งหมด |
| `scorecard` | ดูของตัวเอง | ดูทีม | ดูทั้งหมด | ดูทั้งหมด |
| `talent-management` | — | ดูทีม, 9-Box | จัดการ Talent Pool | กำหนดเกณฑ์ Hi-Po |
| `succession-planning` | — | ดูและ Nominate | จัดการ | อนุมัติ Sensitive |
| `idp` | สร้าง IDP, Sign-Off | ดูทีม, อนุมัติ | ดูทั้งหมด | ดูทั้งหมด |
| `learning` | ดู+สมัครเรียน | ดูทีม | ดู+จัดการ | ดูทั้งหมด |
| `training-records` | ดูของตัวเอง | ดูทีม | ดูรายงาน | ดูรายงานทั้งหมด |
| `workflows` | ส่งคำขอ, ดูของตัวเอง | อนุมัติทีม | อนุมัติ HR-level | อนุมัติ Sensitive |
| `position-management` | — | ดู | ดู+แก้ไข | ดู+แก้ไข |
| `transfer-request` | ส่งคำขอ | ส่ง+อนุมัติทีม | อนุมัติ | อนุมัติ |
| `org-chart` | ดู | ดู | ดู | ดู |
| `manager-dashboard` | — | ใช้งาน | ใช้งาน | ใช้งาน |
| `settings` | Notifications tab เท่านั้น | Workflow tab เท่านั้น | ทุก tab | ทุก tab |
| `recruitment` | ดู Job Board, สมัคร | ดู+สมัคร | จัดการทั้งหมด | จัดการทั้งหมด |
| `candidate-screening` | — | — | Screening+Offers | Screening+Offers |
| `onboarding` | — | — | จัดการ Onboarding | จัดการ Onboarding |
| `resignation` | ยื่นใบลาออก | ยื่น+อนุมัติทีม | จัดการ Clearance | จัดการ Settlement |
| `time-management` | ดูกะของตัวเอง | ดูทีม | สร้าง+จัดการกะ | จัดการทั้งหมด |
| `location-management` | ดูข้อมูล | ดูข้อมูล | มอบหมายพนักงาน | มอบหมายพนักงาน |
| `smart-claims` (New) | ยื่น Claim ของตัวเอง | ดู+อนุมัติทีม | ดูทั้งหมด | กำหนด Policy |
| `quick-approve` (New) | — | ใช้งาน Bulk Approve | ใช้งาน | ใช้งาน |

## 13.3 Sensitive Workflows (ต้องการ HR Manager)

| Workflow Type | เหตุผล |
|--------------|--------|
| `compensation_change` | แก้ไขข้อมูลเงินเดือน — ข้อมูลการเงินสำคัญ |
| `termination` | การออกจากงาน — ผลกระทบทางกฎหมาย |
| `promotion` | การเลื่อนตำแหน่ง — ผลต่อเงินเดือนและสิทธิ์ |
| `inter_company_transfer` | โอนย้ายข้ามบริษัท — ซับซ้อนทางกฎหมาย |
| `payroll_approval` | อนุมัติเงินเดือน — ข้อมูลการเงินสำคัญ |

## 13.4 Data Access Levels

| Role | PII Fields | Salary Fields | Org Data | All Employees |
|------|-----------|--------------|---------|--------------|
| Employee | ของตัวเอง (บางส่วน masked) | ไม่เห็น | ผ่าน Org Chart | ไม่ |
| Manager | ทีม (limited) | ไม่เห็น | ทีม | ไม่ (เฉพาะทีม) |
| HR Admin | ทุกคน | ไม่เห็น gross | ทั้งหมด | ใช่ |
| HR Manager | ทุกคน | เห็น gross | ทั้งหมด | ใช่ |

---

# 14. Appendix

## 14.1 Glossary (คำศัพท์)

| คำ | คำอธิบาย |
|----|---------|
| **Microservices** | รูปแบบสถาปัตยกรรมซอฟต์แวร์ที่แยก application เป็น services ขนาดเล็กอิสระ |
| **RBAC** | Role-Based Access Control — ควบคุมการเข้าถึงตาม role ของผู้ใช้ |
| **JWT** | JSON Web Token — token มาตรฐานสำหรับ authentication |
| **OCR** | Optical Character Recognition — เทคโนโลยีอ่านข้อความจากรูปภาพ |
| **Kafka** | Apache Kafka — ระบบ message streaming แบบ distributed |
| **Kubernetes (K8s)** | ระบบ orchestration สำหรับ container deployment |
| **PII** | Personally Identifiable Information — ข้อมูลส่วนตัวที่สามารถระบุตัวตนได้ |
| **PDPA** | Personal Data Protection Act — พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (พ.ร.บ.) |
| **PIT** | Personal Income Tax — ภาษีเงินได้บุคคลธรรมดา |
| **SSO** | Social Security Office — สำนักงานประกันสังคม (ย่อต่างจาก Single Sign-On) |
| **9-Box Grid** | เมทริกซ์ 3×3 ประเมิน Performance vs. Potential |
| **IDP** | Individual Development Plan — แผนพัฒนาศักยภาพรายบุคคล |
| **FCP** | First Contentful Paint — เวลาที่ content แรกแสดงบนหน้าจอ |
| **ETL** | Extract, Transform, Load — กระบวนการย้ายและแปลงข้อมูล |
| **WCAG** | Web Content Accessibility Guidelines — มาตรฐาน accessibility |
| **Hi-Po** | High Potential — พนักงานที่มีศักยภาพสูง |
| **OT** | Overtime — การทำงานล่วงเวลา |
| **Kirkpatrick** | โมเดลประเมินการฝึกอบรม 4 ระดับ (Reaction, Learning, Behavior, Results) |

## 14.2 References

| รายการ | แหล่งที่มา |
|--------|----------|
| PRD เดิม | `docs/prd.md` — Employee Information Module v1.0 |
| Module Documentation | `specs/docs/index.md` + domain files (2026-02-22) |
| Thai Labor Law | พระราชบัญญัติคุ้มครองแรงงาน พ.ศ. 2541 (แก้ไข 2562) |
| Thai Tax Law | ประมวลรัษฎากร มาตรา 40(1) |
| PDPA | พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 |
| WCAG 2.1 | W3C Web Content Accessibility Guidelines 2.1 |
| SuccessFactors | SAP SuccessFactors HR Module Reference (Central Group) |

## 14.3 Migration Notes

### จาก Vanilla JS Prototype → Next-Gen System

| Aspect | Prototype | Next-Gen | Migration Approach |
|--------|-----------|----------|-------------------|
| **Data** | Mock JavaScript arrays | PostgreSQL 17 | Informatica ETL จาก SuccessFactors → PostgreSQL |
| **Auth** | Simulated login | Keycloak OAuth2 | Cutover ช่วง Phase 1 |
| **State** | AppState (in-memory) | Redux (client) + Database | Gradual migration per module |
| **Routing** | Hash-based (#/profile) | Next.js 16 App Router | Full rewrite |
| **i18n** | Custom IIFE (apps/js/i18n.js) | next-intl | Keys compatible (dot notation) |
| **API** | Mock API (300ms delay) | Real NestJS REST APIs | Implement per microservice |
| **File Storage** | Mock URLs | AWS S3 / MinIO | Migrate existing docs |

### Key Migration Risks

| Risk | Mitigation |
|------|-----------|
| Data Loss ระหว่าง migration | Triple-verify ETL, parallel run 30 วัน |
| User adoption | Change management program, training วิดีโอ |
| Performance regression | Load testing ก่อน go-live |
| Integration failures | End-to-end integration testing สำหรับทุก external system |

### API Compatibility

- REST API ใหม่จะ follow conventions เดียวกับ prototype ที่เป็นไปได้
- i18n keys ที่มีอยู่ (dot notation) จะ carry forward เพื่อลด rework
- RBAC roles (employee/manager/hr_admin/hr_manager) คงเดิม

## 14.4 Change Log

| เวอร์ชัน | วันที่ | การเปลี่ยนแปลง |
|---------|-------|--------------|
| 1.0 | 2026-01-10 | PRD เดิม — Employee Information Module only |
| 2.0 | 2026-02-22 | ขยายเป็น Full HRMS PRD ครอบคลุม 29 modules + Architecture + New Features (F6-F9) |

---

*เอกสารนี้สร้างโดย Product Team — RIS*
*อ้างอิง source code และ documentation ณ วันที่ 2026-02-22*
*สำหรับข้อสงสัย ติดต่อ: product@ris.co.th*

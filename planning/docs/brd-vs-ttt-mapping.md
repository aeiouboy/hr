# BRD 207 Requirements → SAP EC Core TTT Manual Mapping

> **Purpose**: Map ทุก BRD requirement กลับไปหา EC Core TTT process เพื่อระบุว่า as-is documentation ครอบคลุมแค่ไหน
> **Source**: BRD-EC-summary.md (207 reqs) × sap-ec-core-summary.md (11 TTT processes)
> **Generated**: 2026-04-10

---

## Coverage Summary

| Flow | Title | BRDs | Full | Partial | Gap | Primary TTT Process |
|------|-------|------|------|---------|-----|---------------------|
| flow-01 | EC Core & Foundation | 3 | 0 | 0 | **3** | — (config, no TTT) |
| flow-02 | EC Data Management | 18 | 0 | 5 | **13** | 11 (Reports partial) |
| flow-03 | EC Reporting | 44 | 13 | 26 | 5 | **11 EC Report** |
| flow-04 | EC Self Service | 19 | 3 | 5 | **11** | 03 (Master Data) |
| flow-05 | EC User Management | 6 | 0 | 1 | **5** | — (admin config) |
| flow-06 | EC Personal Information | 23 | **19** | 4 | 0 | **03 Maintain Master Data** |
| flow-07 | EC Special Information | 50 | **46** | 4 | 0 | **03 Maintain Master Data** |
| flow-08 | EC Employment Information | 24 | 14 | 8 | 2 | 01, 03, 04, 05, 06 (mixed) |
| flow-09 | EC Employee Lifecycle | 9 | **8** | 1 | 0 | 01, 02, 04, 09, 10 |
| flow-10 | EC Compensation | 3 | **3** | 0 | 0 | 03, 05 |
| flow-11 | EC Organization & Position | 8 | 2 | 4 | 2 | — (foundation + 11) |
| **Total** | | **207** | **108** | **58** | **41** | |

### Coverage Rate
- **Full**: 108 / 207 = **52%** — TTT manual covers the process step-by-step
- **Partial**: 58 / 207 = **28%** — TTT touches the data/concept but not the specific BRD requirement
- **Gap**: 41 / 207 = **20%** — TTT has zero coverage (mostly admin config, integration, security)

---

## Detailed Mapping by Flow

### flow-01 — EC Core & Foundation (3 BRDs) → Gap: 3

| BRD # | Feature | EC Core TTT | Coverage |
|-------|---------|-------------|----------|
| 1 | Organization Foundation Object | — | **Gap** (system config) |
| 6 | Payment Foundation Object | — | **Gap** (system config) |
| 7 | EC Picklist | — | **Gap** (system config) |

> TTT manuals ไม่ cover foundation object setup — เป็น implementation/admin task

---

### flow-02 — EC Data Management (18 BRDs) → Gap: 13

| BRD # | Feature | EC Core TTT | Coverage |
|-------|---------|-------------|----------|
| 191 | API / IC (Integration Center) | — | **Gap** |
| 162 | Story Report | 11 EC Report | Partial |
| 199 | Consent Form | — | **Gap** |
| 190 | Customize Report | 11 EC Report | Partial |
| 203 | Data Encryption | — | **Gap** |
| 198 | Data Migration | — | **Gap** |
| 202 | Direct User | — | **Gap** |
| 201 | Hidden Profile | — | **Gap** |
| 194 | MS-Team Viva connections | — | **Gap** |
| 192 | Schedule Report | 11 EC Report | Partial |
| 193 | Survey form | — | **Gap** |
| 195 | Switch Language | — | **Gap** |
| 196 | Show Favourite Report | 11 EC Report | Partial |
| 197 | E-Document | — | **Gap** |
| 204 | Security Feature | — | **Gap** |
| 205 | UX/UI | — | **Gap** |
| 206 | Edit / Copy | 03 Master Data | Partial |
| 200 | Traffic Report | 11 EC Report | Partial |

---

### flow-03 — EC Reporting (44 BRDs) → Full: 13, Partial: 26, Gap: 5

| BRD # | Feature | EC Core TTT | Coverage |
|-------|---------|-------------|----------|
| 121 | Organization Master Data Report | 11 | Partial |
| 122 | Org Relation & Hierarchy Report | 11 | Partial |
| 123 | Position Master Data Report | 11 | Partial |
| 124 | Position Budget, Headcount & FTE | 11 | Partial |
| 125 | Basic Personal Info Report | 11 + 03 | **Full** |
| 126 | Contact Information Report | 11 + 03 | **Full** |
| 127 | Address Information Report | 11 + 03 | **Full** |
| 128 | Work Permit Information Report | 11 + 03 | **Full** |
| 129 | Assignment Details Report | 11 + 08 | Partial |
| 130 | Alt Cost Distribution Report | 11 + 03 | **Full** |
| 131 | Employee Movement Report | 11 + 04 | **Full** |
| 132 | Payment Information Report | 11 + 05 | Partial |
| 133 | Payroll Information Report | 11 + 05 | Partial |
| 134 | Pending Workflow Approval | 11 | Partial |
| 135 | Disability Employee (Active) | 11 + 03 | Partial |
| 136 | Disability Employee (Inactive) | 11 + 10 | Partial |
| 137 | Acting Employee Report | 11 + 08 | **Full** |
| 138 | Benefit Special Privilege Info | 11 | Partial |
| 139 | Active Employee Report | 11 + 01 | **Full** |
| 140 | Salary Changed Details | 11 + 05 | **Full** |
| 141 | EMP Work Experience | 11 + 03 | Partial |
| 142 | EC Disciplinary | 11 | Partial |
| 143 | EMP Guarantee | 11 | Partial |
| 144 | EMP Compensation Info | 11 + 05 | **Full** |
| 145 | EMP Hiring & Rehire | 11 + 01 | **Full** |
| 146 | EMP Job Relationships | 11 + 03 | **Full** |
| 147 | EMP Movement Employee | 11 + 04 | **Full** |
| 148 | EMP Resignation Employee | 11 + 10 | **Full** |
| 149 | Performance Appraisal Grade | 11 | Partial (PM module) |
| 150 | FTE Report by Position | 11 | Partial |
| 151 | EMP Employment Detail | 11 + 03 | **Full** |
| 152 | Foundation Structure | 11 | Partial |
| 153–161 | Foundation Structure (Position/Org/Function/Store/Location/CostCenter/Brand/HR District/Section) | 11 | Partial (×9) |
| 163 | Report Automation | 11 | Partial |
| 164 | Role-based Data Control | 11 | Partial |
| 207 | Employee Profile Report | 11 + 03 | Partial |

---

### flow-04 — EC Self Service (19 BRDs) → Full: 3, Gap: 11

| BRD # | Feature | EC Core TTT | Coverage |
|-------|---------|-------------|----------|
| 165 | View Personal Information | 03 | Partial (ESS layer) |
| 166 | Update Personal Information | 03 | **Full** |
| 167 | Manage Emergency Contact | 03 | **Full** |
| 168 | View Employment Information | 03 | Partial |
| 169 | View Organization Chart | — | **Gap** |
| 170 | View Compensation & Payroll | 05 | Partial |
| 171 | View Quick Actions Tile | — | **Gap** |
| 172 | Termination Request | 10 | **Full** |
| 173 | Document Access | — | **Gap** |
| 174 | View Team Information | — | **Gap** |
| 175 | Team Organization Chart | — | **Gap** |
| 176 | View Team Reports | 11 | Partial |
| 177 | Position & Vacancy Overview | — | **Gap** |
| 178 | Manage Field Configuration | — | **Gap** |
| 179 | Field Visibility Control | — | **Gap** |
| 180 | Field Mandatory Rule | — | **Gap** |
| 181 | Field Read-Only Control | — | **Gap** |
| 182 | Manage Quick Actions | — | **Gap** |
| 183 | Manage Tile & Home Page | — | **Gap** |

---

### flow-05 — EC User Management (6 BRDs) → Gap: 5

| BRD # | Feature | EC Core TTT | Coverage |
|-------|---------|-------------|----------|
| 184 | Data Permission Group | — | **Gap** |
| 185 | Application Role Group | — | **Gap** |
| 186 | User Assignment | — | **Gap** |
| 187 | Proxy | — | **Gap** |
| 188 | Revised Foundation | — | **Gap** |
| 189 | Audit Report | 11 | Partial |

---

### flow-06 — EC Personal Information (23 BRDs) → Full: 19

| BRD # | Feature | EC Core TTT | Coverage |
|-------|---------|-------------|----------|
| 12 | Biographical Info | 03 | **Full** |
| 13 | Personal Info 🔒 | 03 | **Full** |
| 14 | National ID 🔒 | 03 + 01 | **Full** |
| 15 | Email Info | 03 + 01 | **Full** |
| 16 | Phone Info | 03 + 01 | **Full** |
| 17 | Address | 03 | **Full** |
| 18 | Work Permit | 03 + 01 | **Full** |
| 19 | Emergency Contact | 03 | **Full** |
| 20 | Dependents | 03 | **Full** |
| 21 | Employment | 03 + 01 + 06 | **Full** |
| 22 | Terminate | 10 + 03 | **Full** |
| 23 | Emp Job Info | 03 + 04 + 05 | **Full** |
| 24 | Job Relationships | 03 + 04 | **Full** |
| 25 | Pay Component Recurring 🔒 | 05 + 03 | **Full** |
| 26 | Alt. Cost Distribution | 03 | **Full** |
| 27 | Payment Info 🔒 | 03 | **Full** |
| 28 | HR District | 03 | **Full** |
| 29 | UserAccountInfo | 03 + 01 | **Full** |
| 30 | Employee Group | 03 + 06 | **Full** |
| 31 | Employee Subgroup | 03 + 06 | **Full** |
| 32 | Performance | 03 | Partial (PM module) |
| 33 | Formal Education | 03 | **Full** |
| 34 | Disability 🔒 | 03 | Partial (HR-only, re-auth) |

---

### flow-07 — EC Special Information (50 BRDs) → Full: 46

| BRD # | Feature | EC Core TTT | Coverage |
|-------|---------|-------------|----------|
| 35 | Special Information Feature | 03 | **Full** |
| 36 | Awards / Honours | 03 | **Full** |
| 37 | Benefit Selection | 03 | Partial |
| 38 | Certificates | 03 | **Full** |
| 39 | Community | 03 | **Full** |
| 40 | Compensation 🔒 | 03 + 05 | **Full** |
| 41 | Courses | 03 | **Full** |
| 42 | cust_achievement | 03 | **Full** |
| 43 | cust_assessmentProgram | 03 | **Full** |
| 44 | cust_coachingFeedback | 03 | **Full** |
| 45 | cust_companyAsset | 03 | **Full** |
| 46 | cust_companyLoan 🔒 | 03 | **Full** |
| 47 | cust_courtOrder 🔒 | 03 | **Full** |
| 48 | cust_developmentGoals | 03 | **Full** |
| 49 | cust_developmentNeeds | 03 | **Full** |
| 50 | cust_disciplinary 🔒 | 03 | **Full** |
| 51 | cust_EBO | 03 | **Full** |
| 52 | cust_goodness | 03 | **Full** |
| 53 | cust_guarantee 🔒 | 03 | **Full** |
| 54 | cust_HistCompetency | 03 | **Full** |
| 55 | cust_HistKPI | 03 | **Full** |
| 56 | cust_HistPerformance | 03 | **Full** |
| 57 | cust_insurance | 03 | **Full** |
| 58 | cust_leadershipCompetency | 03 | **Full** |
| 59 | cust_learningActivities | 03 | **Full** |
| 60 | cust_mtmaReference | 03 | **Full** |
| 61–84 | (24 more cust_* fields: potential, rotation, salary history, scholarship, strength, student loan, talent ref, work exp, advanced info, perf group, e-letter, personality, documents, education, FSA, func exp, inside work exp, languages, lead exp, memberships, mobility, outside work exp, career goals, previous employment) | 03 | **Full** (all profile background elements) |

---

### flow-08 — EC Employment Information (24 BRDs) → Full: 14

| BRD # | Feature | EC Core TTT | Coverage |
|-------|---------|-------------|----------|
| 85 | Assignment Details (Hire/Transfer/Terminate) | 01 + 04 + 10 | **Full** |
| 85b | Promotability (Manager-only) | 03 | Partial |
| 85c | DVT Project (Global Info) | 03 | Partial |
| 86 | Special Assignment / Year of Service | 01 + 04 | **Full** |
| 87 | Year In Store Branch | 04 | **Full** |
| 88 | Year In Position | 04 + 06 | **Full** |
| 89 | Year In Job | 04 + 05 | **Full** |
| 90 | Year In Job Grade | 05 + 04 | **Full** |
| 91 | Year In Personal Grade | 05 | **Full** |
| 92 | Year In BU + Year In Field Others | 04 + 03 | **Full** |
| 93 | Age + Generation | 03 | **Full** |
| 94 | Custom Field Effective Date Override | 04 + 01 | **Full** |
| 95 | Change Position | 04 | **Full** |
| 96 | Alternative Cost Distribution | 03 | **Full** |
| 97 | SSO_Location | 03 | **Full** |
| 98 | Revert Termination | 10 | Partial (new BRD feature) |
| 99 | Mass Import/Delete | 01 + 03 | Partial (mass ops) |
| 100 | Mass Change Emp Job | 04 + 06 | Partial (mass ops) |
| 101 | Hire Date Correction | 01 | **Full** |
| 102 | Re-Hiring | 01 | **Full** |
| 103 | Promotion / PT→FT Change | 04 + 06 | **Full** |
| 104 | Acting Position Assignment | 08 | **Full** |
| 105–108 | EC Documents (Merit letters, attachments, preview) | 03 + 05 + 11 | Partial (doc management beyond TTT) |

---

### flow-09 — EC Employee Lifecycle (9 BRDs) → Full: 8

| BRD # | Feature | EC Core TTT | Coverage |
|-------|---------|-------------|----------|
| 109 | Hiring Flow | 01 | **Full** |
| 110 | Transfer Flow (cross-company) | 04 | **Full** |
| 111 | Terminate Request Workflow | 10 | **Full** |
| 112 | Termination Documents (50ทวิ) | 10 | **Full** |
| 113 | Terminate Reason Visibility | 10 | **Full** |
| 114 | OK to Rehire Flag | 10 + 01 | **Full** |
| 115 | Auto-Terminate Contract | 09 + 10 | **Full** |
| 116 | Revert Terminate Flow | 10 | **Full** |
| 117 | Pass Probation | 02 | Partial (BRD adds auto-pass + reminders) |

---

### flow-10 — EC Compensation (3 BRDs) → Full: 3

| BRD # | Feature | EC Core TTT | Coverage |
|-------|---------|-------------|----------|
| 118 | Payment Information 🔒 | 03 | **Full** |
| 119 | Payroll Information | 05 | **Full** |
| 120 | Salary Base + History | 05 | **Full** |

---

### flow-11 — EC Organization & Position (8 BRDs)

| BRD # | Feature | EC Core TTT | Coverage |
|-------|---------|-------------|----------|
| 2 | Position Management | — | Partial (TTT uses Position but doesn't cover setup) |
| 3 | Job Classification | — | Partial |
| 4 | Org Visualization | — | **Gap** |
| 5 | Org Unit Management | — | **Gap** |
| 8 | Position Budget | — | Partial |
| 9 | Position Hierarchy | — | Partial |
| 10 | Job Profile Builder | — | Partial |
| 11 | Succession Org Chart | — | Partial |

---

## TTT Process → BRD Coverage Heat Map

| TTT Process | BRDs Mapped | % of 207 | Key Flows |
|-------------|-------------|----------|-----------|
| **03 Maintain Master Data** | ~96 | **46%** | flow-06, flow-07, flow-08 |
| **11 EC Report** | ~48 | 23% | flow-03 (all reports) |
| **01 Hire & Rehire** | ~12 | 6% | flow-08, flow-09 |
| **04 Employee Movement** | ~14 | 7% | flow-08, flow-09 |
| **05 Pay Rate Change** | ~10 | 5% | flow-08, flow-10 |
| **10 Terminate** | ~10 | 5% | flow-09, flow-06 |
| **06 Change Employee Type** | ~5 | 2% | flow-08 |
| **08 Acting Assignment** | ~3 | 1% | flow-08, flow-03 |
| **02 Manage Probation** | ~1 | <1% | flow-09 |
| **09 Contract Renewal** | ~1 | <1% | flow-09 |
| **07 Manage Suspension** | ~1 | <1% | flow-08 |
| **No TTT coverage** | ~41 | **20%** | flow-01, flow-02, flow-04, flow-05 |

---

## Key Findings

### 1. TTT covers transactional processes well (80%)
flow-06 (Personal Info), flow-07 (Special Info), flow-08 (Employment), flow-09 (Lifecycle), flow-10 (Compensation) — ทุก BRD ที่เกี่ยวกับ employee data CRUD มี TTT coverage ที่ดี

### 2. TTT has zero coverage on system admin (20%)
- **Foundation setup** (flow-01): Org/Job/Position/Picklist configuration
- **Admin Self Service** (flow-04 #178-183): Field config, visibility, mandatory rules
- **User Management** (flow-05): Permissions, proxy, audit
- **Integration** (flow-02 #191): API/IC
- **Security** (flow-02 #203-204): Encryption, security features

### 3. BRD adds new capabilities beyond TTT
- **BRD #98/116**: Revert Termination — TTT ไม่มี (new feature)
- **BRD #115**: Auto-Terminate Contract — TTT มีแค่ manual extend
- **BRD #117**: Auto-pass probation + reminder notifications — TTT มีแค่ manual pass/extend/fail
- **BRD #111**: Multi-step approval workflow for termination — TTT มีแค่ Dismissal workflow
- **BRD #99-100**: Mass operations — TTT มีแค่ Mass Pay Rate upload
- **BRD #197**: E-Document management — TTT ไม่มี
- **BRD #194**: MS Teams/Viva integration — TTT ไม่มี

### 4. 🔒 Sensitive fields need RBAC mapping
BRDs flagged 🔒: #13, 14, 25, 27, 34, 40, 46, 47, 50, 53, 57, 118
All require re-authentication (SH1) or HR-only access → must map to Keycloak roles in new system

### 5. Process 03 is the backbone
46% of all BRDs map to TTT Process 03 (Maintain Master Data) — this is the most critical process to replicate correctly in the new system

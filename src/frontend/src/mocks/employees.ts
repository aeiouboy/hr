// mocks/employees.ts — 1,000 deterministic mock employees (seeded PRNG)
// Used by useEmployees Zustand store. No real API. Stable across renders.
//
// Seeded LCG PRNG: same seed = same output always.
// Pool: 20 Thai given names + 20 surnames (phonetic EN transliteration paired).
// Hire date: 2016-2024 range. 85% active, 15% inactive/terminated mix.
// Probation: 60% in_probation if hire_date within last 119 days.
// Retail fields (audit A6/#11): store_branch_code + hr_district — ~70% retail (CRC/ROBINSON)

export interface MockEmployee {
  employee_id: string
  first_name_th: string
  last_name_th: string
  first_name_en: string
  last_name_en: string
  employee_class: 'PERMANENT' | 'PARTIME'
  date_of_birth: string        // ISO date YYYY-MM-DD
  hire_date: string            // ISO date YYYY-MM-DD — physical start
  /** Earliest employment start (incl. prior rehires). Equals hire_date if no rehire history. — audit A4 */
  original_start_date: string  // ISO date YYYY-MM-DD
  /** Adjusted for prior service credit (tenure math on rehire). Equals hire_date if no adjustment. — audit A4 */
  seniority_start_date: string // ISO date YYYY-MM-DD
  company: 'CEN' | 'CRC' | 'CU' | 'CPN' | 'ROBINSON'
  position_title: string
  /** Corporate title = promotion ladder axis (≠ job/functional title). — audit A7/#12 */
  corporate_title: string
  org_unit: string
  probation_status: 'in_probation' | 'passed' | 'terminated' | 'extended'
  status: 'active' | 'inactive' | 'terminated'
  /** รหัสสาขา/หน่วยงานค้าปลีก — audit A6/#11. null = HQ/finance (ไม่ใช่สาขา) */
  store_branch_code: string | null
  /** เขต HR ค้าปลีก — audit A6/#11. null = HQ/finance */
  hr_district: string | null
  /** Job Grade ปัจจุบัน — JG-02/04/06/08/10 (Promotion route uses as fromJG) */
  job_grade: string
}

// ──────────────────────────────────────────────
// Name pools
// ──────────────────────────────────────────────

const GIVEN_TH = [
  'สมชาย', 'วิภา', 'ณัฐกานต์', 'ประเสริฐ', 'อรณิชา',
  'ธนพล', 'มาลี', 'สุรชัย', 'กมลรัตน์', 'ปิยะ',
  'ชญานิษฐ์', 'วรเมธ', 'ศิริพร', 'อนุชา', 'นภัสสร',
  'ภัทรพล', 'รัตนาภรณ์', 'กิตติพงศ์', 'พิชญา', 'เจษฎา',
]

const GIVEN_EN = [
  'Somchai', 'Vipa', 'Nattakarn', 'Prasoet', 'Ornicha',
  'Tanapon', 'Mali', 'Surachai', 'Kamonrat', 'Piya',
  'Chayanit', 'Woramet', 'Siriporn', 'Anucha', 'Naphasat',
  'Pattarapon', 'Rattanaporn', 'Kittipong', 'Pichaya', 'Jetsada',
]

const SURNAME_TH = [
  'สุวรรณ', 'จันทร์แดง', 'พรหมมา', 'วัฒนชัย', 'อ่อนสา',
  'ศิริวงศ์', 'ทองดี', 'มาลาพงษ์', 'นาคประเสริฐ', 'บุญรัตน์',
  'เจริญกิจ', 'หิรัญรัตน์', 'ปานสุข', 'ธีระพงษ์', 'ลิมประพัฒน์',
  'รุ่งโรจน์', 'กาญจนาพงศ์', 'สมบัติ', 'อัครเดช', 'วิจิตรวงศ์',
]

const SURNAME_EN = [
  'Suwan', 'Chandaeng', 'Prommma', 'Wattanachai', 'Onsa',
  'Siriwong', 'Thongdi', 'Malapong', 'Nakprasert', 'Boonrat',
  'Charoengit', 'Hiranrat', 'Pansuk', 'Theeraphong', 'Limpraphat',
  'Rungrot', 'Kanchanapong', 'Sombat', 'Akradet', 'Wijitwong',
]

const COMPANIES: Array<MockEmployee['company']> = ['CEN', 'CRC', 'CU', 'CPN', 'ROBINSON']

// Retail field pools — audit A6/#11 (8 store codes + 5 HR districts)
const STORE_BRANCH_CODES = [
  'CDS-CTW',   // CentralWorld
  'CDS-CPN',   // CPN Pinklao
  'CDS-RMA',   // CRC Rama 9
  'ROB-CLN',   // Robinson Chaeng Watthana
  'ROB-RMA',   // Robinson Rama 9
  'ROB-UPC',   // Robinson Chiang Mai (Upcountry)
  'CDS-PAT',   // CRC Pattaya
  'ROB-KON',   // Robinson Khon Kaen
] as const

const HR_DISTRICTS = [
  'D-BKK-1',   // Bangkok Zone 1 (Sukhumvit / CBD)
  'D-BKK-2',   // Bangkok Zone 2 (West / Pinklao)
  'D-CNX-N',   // Chiang Mai / North
  'D-UPC-N',   // Upcountry North
  'D-EAS-E',   // Eastern Seaboard
] as const

const JOB_GRADES = ['JG-02', 'JG-04', 'JG-06', 'JG-08', 'JG-10']

const POSITIONS = [
  'HR Business Partner', 'Software Engineer', 'Senior Analyst',
  'Store Manager', 'Retail Associate', 'Finance Manager',
  'Data Analyst', 'Marketing Coordinator', 'Logistics Supervisor',
  'IT Support Specialist', 'Legal Counsel', 'Project Manager',
  'Procurement Officer', 'Customer Service', 'Operations Manager',
  'Content Strategist', 'Brand Manager', 'Payroll Specialist',
  'Security Officer', 'Maintenance Technician',
]

const ORG_UNITS = [
  'Sales - Bangkok', 'HR - Head Office', 'Finance - Regional',
  'IT - Infrastructure', 'Marketing - Central', 'Operations - North',
  'Logistics - South', 'Legal - Corporate', 'Customer Experience',
  'Retail - Rama 9', 'Retail - CentralWorld', 'Retail - The Mall',
  'Digital Commerce', 'Procurement - National', 'Brand Management',
]

// ──────────────────────────────────────────────
// Seeded LCG PRNG (mulberry32 variant)
// ──────────────────────────────────────────────

function makePRNG(seed: number) {
  let s = seed >>> 0
  return function (): number {
    s = Math.imul(1664525, s) + 1013904223
    return ((s >>> 0) / 0x100000000)
  }
}

function rndInt(rnd: () => number, min: number, max: number): number {
  return Math.floor(rnd() * (max - min + 1)) + min
}

function pick<T>(rnd: () => number, arr: T[]): T {
  return arr[rndInt(rnd, 0, arr.length - 1)]
}

// ──────────────────────────────────────────────
// Date helpers
// ──────────────────────────────────────────────

function isoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function randomIsoDate(rnd: () => number, startYear: number, endYear: number): string {
  const year = rndInt(rnd, startYear, endYear)
  const month = rndInt(rnd, 1, 12)
  const maxDay = new Date(year, month, 0).getDate()
  const day = rndInt(rnd, 1, maxDay)
  return isoDate(year, month, day)
}

const TODAY = new Date()

function daysBetween(isoA: string, isoB: Date): number {
  return Math.floor((isoB.getTime() - new Date(isoA).getTime()) / 86_400_000)
}

// ──────────────────────────────────────────────
// Generator
// ──────────────────────────────────────────────

function generateEmployees(count: number): MockEmployee[] {
  const rnd = makePRNG(42)  // fixed seed → deterministic
  const employees: MockEmployee[] = []

  for (let i = 0; i < count; i++) {
    const num = String(i + 1).padStart(4, '0')
    const givenIdx = rndInt(rnd, 0, 19)
    const surnameIdx = rndInt(rnd, 0, 19)

    const first_name_th = GIVEN_TH[givenIdx]
    const last_name_th = SURNAME_TH[surnameIdx]
    const first_name_en = GIVEN_EN[givenIdx]
    const last_name_en = SURNAME_EN[surnameIdx]

    const hire_date = randomIsoDate(rnd, 2016, 2024)
    const date_of_birth = randomIsoDate(rnd, 1975, 2000)

    const daysEmployed = daysBetween(hire_date, TODAY)
    const isRecent = daysEmployed <= 119

    // Status: 85% active / 10% inactive / 5% terminated
    const statusRoll = rnd()
    let status: MockEmployee['status']
    if (statusRoll < 0.85) status = 'active'
    else if (statusRoll < 0.95) status = 'inactive'
    else status = 'terminated'

    // Probation status
    let probation_status: MockEmployee['probation_status']
    if (status === 'terminated') {
      probation_status = 'terminated'
    } else if (isRecent) {
      // 60% in_probation for recent hires; rest split extended/passed
      const probRoll = rnd()
      if (probRoll < 0.60) probation_status = 'in_probation'
      else if (probRoll < 0.80) probation_status = 'extended'
      else probation_status = 'passed'
    } else {
      probation_status = rnd() < 0.05 ? 'extended' : 'passed'
    }

    const employee_class: MockEmployee['employee_class'] =
      rnd() < 0.75 ? 'PERMANENT' : 'PARTIME'

    const company = pick(rnd, COMPANIES)
    const position_title = pick(rnd, POSITIONS)

    // Retail fields (A6/#11): CRC + ROBINSON employees are ~70% retail.
    const isRetailCompany = company === 'CRC' || company === 'ROBINSON'
    const retailRoll = rnd()
    const isRetail = isRetailCompany && retailRoll < 0.70
    const store_branch_code = isRetail ? pick(rnd, STORE_BRANCH_CODES as unknown as string[]) : null
    const hr_district = isRetail ? pick(rnd, HR_DISTRICTS as unknown as string[]) : null

    // Seniority adjust (A4): 10% of employees get 1-3 years prior-service credit.
    const has_seniority_adjust = rnd() < 0.1 && status !== 'terminated'
    const seniority_adjust_days = has_seniority_adjust
      ? Math.floor(rnd() * 1095)   // up to ~3 years
      : 0
    const hire_d = new Date(hire_date)
    const seniority_d = new Date(hire_d.getTime() - seniority_adjust_days * 86400_000)
    const seniority_start_date = seniority_d.toISOString().slice(0, 10)

    employees.push({
      employee_id: `EMP-${num}`,
      first_name_th,
      last_name_th,
      first_name_en,
      last_name_en,
      employee_class,
      date_of_birth,
      hire_date,
      original_start_date: hire_date,
      seniority_start_date,
      company,
      position_title,
      corporate_title: position_title,
      org_unit: pick(rnd, ORG_UNITS),
      probation_status,
      status,
      store_branch_code,
      hr_district,
      job_grade: pick(rnd, JOB_GRADES),
    })
  }

  return employees
}

export const MOCK_EMPLOYEES: MockEmployee[] = generateEmployees(1000)

#!/usr/bin/env bun
/**
 * T1 (#88) — Port SF QAS data → Humi mock seed (ADDITIVE).
 *
 * Reads SF QAS extracts from the stark companion repo and emits:
 *   - src/frontend/src/data/admin/event-reasons.json (53 FOEventReason public metadata)
 *   - src/frontend/src/lib/humi-mock-data-sf-parity.ts (88 synthetic SF-shape employees + enrichment overlay)
 *
 * Invariants enforced (per #88 acceptance criteria):
 *   - ADDITIVE merge: never overwrite Years-in-X (#82), documents (#84), Dependents (#85) data
 *   - 12 existing HUMI_EMPLOYEES preserved verbatim (extras module exports overlay map keyed by id)
 *   - 100 employees total = 12 existing + 88 new synthetic (Thai names, plausible FO scoping)
 *   - No real PII — synthetic personas only; SF metadata used only for shape (event reasons, picklist enums)
 *
 * Run: bun run scripts/etl-from-sf.ts
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const REPO_ROOT = process.cwd();
const SF_EXTRACT_ROOT = "/Users/tachongrak/stark/projects/hr-platform-replacement/sf-extract/qas-fields-2026-04-25";
const HR_FRONTEND_ROOT = join(REPO_ROOT, "src/frontend");

interface SfFoEventReason {
  externalCode: string;
  internalCode: string;
  name: string;
  description: string;
  event: string;
  status: string;
}

interface SfWorkflowFile {
  foEventReason: SfFoEventReason[];
  foEventReasonCount: number;
  generatedAt: string;
}

interface PortedEventReason {
  id: string;
  internalCode: string;
  externalCode: string;
  name: string;
  nameTh?: string;
  description: string;
  event: string;
  category: "lifecycle" | "leave" | "compensation" | "transfer" | "other";
  status: "active" | "inactive";
}

const EVENT_CATEGORIES: Record<string, PortedEventReason["category"]> = {
  RETIRE: "lifecycle",
  COMPROB: "lifecycle",
  HIRE: "lifecycle",
  REHIRE: "lifecycle",
  TERM: "lifecycle",
  PROMOTION: "compensation",
  DEMOTION: "compensation",
  LATERAL: "transfer",
  TRANSFER: "transfer",
  LEAVE: "leave",
  RTW: "leave",
};

function categorizeEvent(externalCode: string): PortedEventReason["category"] {
  const upper = externalCode.toUpperCase();
  for (const [key, cat] of Object.entries(EVENT_CATEGORIES)) {
    if (upper.includes(key)) return cat;
  }
  return "other";
}

const NAME_TH_MAP: Record<string, string> = {
  "Change to Retirement": "เปลี่ยนเป็นเกษียณอายุ",
  "Completion of Probation": "ผ่านทดลองงาน",
  "Hire": "จ้างงานใหม่",
  "Rehire": "จ้างงานใหม่ (กลับมา)",
  "Termination": "พ้นสภาพการเป็นพนักงาน",
  "Promotion": "เลื่อนตำแหน่ง",
  "Lateral": "โยกย้ายตามแนวระดับ",
  "Transfer": "โอนย้าย",
  "Leave of Absence": "ลาหยุดยาว",
  "Return from Leave": "กลับจากลาหยุด",
};

async function buildEventReasons(): Promise<{ count: number; outPath: string }> {
  const raw = await readFile(join(SF_EXTRACT_ROOT, "sf-qas-workflow-2026-04-25.json"), "utf8");
  const workflow = JSON.parse(raw) as SfWorkflowFile;

  const ported: PortedEventReason[] = workflow.foEventReason
    .filter((e) => e.status === "A")
    .map((e) => ({
      id: `event-${e.internalCode}`,
      internalCode: e.internalCode,
      externalCode: e.externalCode,
      name: e.name,
      nameTh: NAME_TH_MAP[e.name],
      description: e.description,
      event: e.event,
      category: categorizeEvent(e.externalCode),
      status: "active" as const,
    }));

  const outPath = join(HR_FRONTEND_ROOT, "src/data/admin/event-reasons.json");
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(
    outPath,
    JSON.stringify(
      {
        _doc: "T1 #88 — Ported from SF QAS sf-qas-workflow-2026-04-25.json (public event metadata, no PII)",
        sourceFile: "sf-qas-workflow-2026-04-25.json",
        sourceTimestamp: workflow.generatedAt,
        count: ported.length,
        eventReasons: ported,
      },
      null,
      2,
    ),
    "utf8",
  );
  return { count: ported.length, outPath };
}

// ───── Synthetic Thai-name employees (SF shape, no real PII) ─────

const FIRST_NAMES_TH = [
  "วาสนา", "อรุณ", "ธนกร", "ปิยะนุช", "กฤตนัย", "สุพัตรา", "ณัฐพล", "มัลลิกา",
  "ชนาธิป", "ฐิติกานต์", "ปกรณ์", "สิริพร", "ภัทรพล", "อนงค์", "เดชา", "พิมพ์ชนก",
  "วิทยา", "อาทิตย์", "นภัสสร", "กิตติภูมิ", "นันทพร", "ศุภชัย", "วิภาวี", "ไกรสร",
  "ปาริชาติ", "ชัยรัตน์", "สมหญิง", "สมชาย", "บุญลือ", "ดวงใจ", "ทักษิณ", "ปรีชา",
  "พิทยา", "อรพิน", "เยาวลักษณ์", "ภราดร", "อุไรวรรณ", "สุวิทย์", "พิจิตรา", "อภิชาติ",
];

const LAST_NAMES_TH = [
  "จิรวัฒน์", "พงษ์ศิริ", "เลิศวงศ์", "สมบูรณ์", "อินทรเดช", "คงสุข", "ภักดีธรรม", "ธีรศักดิ์",
  "วรรณกุล", "เดชาธร", "ศักดิ์สิทธิ์", "พรหมเทพ", "ชัยภูมิ", "อภิชนกุล", "วงศ์ไพบูลย์",
  "ตันติเวช", "เจริญรุ่ง", "พงศ์พันธุ์", "อมรรัตน์", "บุญญาธิการ", "พุ่มพันธุ์", "เกียรติคุณ",
  "ศรีพรหม", "วชิรเวช", "ผ่องอำไพ", "ดารากร", "ภัทราวุธ", "เนติพันธุ์", "ฉัตรชัย",
];

const FIRST_NAMES_EN = [
  "Wassana", "Arun", "Thanakorn", "Piyanuch", "Krittanai", "Suphattra", "Nattapon", "Mallika",
  "Chanathip", "Thitikan", "Pakorn", "Siriporn", "Pattarapon", "Anong", "Decha", "Pimchanok",
  "Wittaya", "Atit", "Naphassorn", "Kittipoom", "Nantaporn", "Suphachai", "Wiphawee", "Kraison",
  "Parichat", "Chairat", "Somying", "Somchai", "Boonlue", "Duangjai", "Taksin", "Preecha",
  "Pittaya", "Orapin", "Yaowalak", "Paradorn", "Uraiwan", "Suwit", "Pijittra", "Apichat",
];

const LAST_NAMES_EN = [
  "Jirawat", "Phongsiri", "Lertwong", "Somboon", "Indradet", "Khongsuk", "Phakdithamma", "Theerasak",
  "Wannakul", "Dechathorn", "Saksit", "Phromthep", "Chaiphum", "Aphichanakul", "Wongphaiboon",
  "Tantiwet", "Charoenrung", "Phongphan", "Amornrat", "Boonyatikan", "Phumphan", "Kiatkun",
  "Sriphrom", "Wachirawet", "Phongamphai", "Darakorn", "Phattrawut", "Netiphan", "Chatchai",
];

const POSITIONS = [
  "ผู้จัดการฝ่ายทรัพยากรบุคคล", "นักวิเคราะห์การเงินอาวุโส", "วิศวกรซอฟต์แวร์อาวุโส",
  "เจ้าหน้าที่สรรหาและว่าจ้าง", "ผู้อำนวยการฝ่ายกลยุทธ์", "เจ้าหน้าที่บัญชี",
  "หัวหน้าทีมพัฒนาองค์กร", "นักวิเคราะห์ข้อมูลอาวุโส", "วิศวกร DevOps",
  "เจ้าหน้าที่การตลาดอาวุโส", "หัวหน้าทีมขาย", "ผู้จัดการฝ่ายการเงิน",
  "ผู้ช่วยผู้จัดการฝ่ายปฏิบัติการ", "เจ้าหน้าที่จัดซื้อ", "หัวหน้าฝ่ายผลิตภัณฑ์",
  "นักวิเคราะห์ระบบอาวุโส", "ผู้ดูแลระบบเครือข่าย", "เจ้าหน้าที่ฝึกอบรม",
];

const DEPARTMENTS = [
  "ทรัพยากรบุคคล", "การเงิน", "เทคโนโลยีสารสนเทศ", "กลยุทธ์องค์กร",
  "ฝ่ายขายและการตลาด", "ปฏิบัติการ", "จัดซื้อ", "ผลิตภัณฑ์", "วิจัยและพัฒนา",
];

const BUSINESS_UNITS = ["BU-001-CRC", "BU-002-CRG", "BU-003-CMG", "BU-004-CDS", "BU-005-CKB"];

const TONES: Array<HumiEmployeeAvatarTone> = ["teal", "indigo", "sage", "butter", "ink"];

const STATUSES = ["active", "active", "active", "active", "active", "active", "leave", "terminated"] as const;

const MARITALS = ["single", "married", "married", "married", "divorced", "widowed", "single"] as const;
const RELIGIONS = ["buddhist", "buddhist", "buddhist", "buddhist", "buddhist", "christian", "muslim", "hindu", "none"] as const;
const BLOODS = ["A", "B", "AB", "O", "O", "B"] as const;
const NATIONALITIES = ["th", "th", "th", "th", "th", "th", "th", "th", "th", "lao", "myanmar", "vietnam"] as const;

type HumiEmployeeAvatarTone = "teal" | "indigo" | "sage" | "butter" | "ink";

interface SyntheticEmployee {
  id: string;
  employeeCode: string;
  firstNameTh: string;
  lastNameTh: string;
  initials: string;
  position: string;
  department: string;
  status: "active" | "leave" | "terminated";
  avatarTone: HumiEmployeeAvatarTone;
  firstNameEn: string;
  lastNameEn: string;
  nickname: string;
  maritalStatus: "single" | "married" | "divorced" | "widowed";
  religion: "buddhist" | "christian" | "muslim" | "hindu" | "other" | "none";
  bloodType: "A" | "B" | "AB" | "O";
  nationality: string;
  nationalId: string;
  managerId: string;
  businessUnitId: string;
}

function pick<T>(arr: ReadonlyArray<T>, seed: number): T {
  return arr[seed % arr.length]!;
}

function syntheticNationalId(seed: number): string {
  const base = (1000000000000 + seed * 137 * 9999991) % 9999999999999;
  return base.toString().padStart(13, "0");
}

function buildSyntheticEmployees(count: number): SyntheticEmployee[] {
  const out: SyntheticEmployee[] = [];
  // First 13 are managers (id ends 001-013) — referenced as managerId by others
  for (let i = 0; i < count; i++) {
    const idx = i + 13; // start at emp-013 (existing has emp-001..012)
    const firstTh = pick(FIRST_NAMES_TH, idx);
    const lastTh = pick(LAST_NAMES_TH, idx + 7);
    const firstEn = pick(FIRST_NAMES_EN, idx);
    const lastEn = pick(LAST_NAMES_EN, idx + 7);
    const nicknameSeed = pick(["Pim", "Tom", "Boy", "Nan", "Tup", "Ar", "Joy", "Mod", "Ying", "Ploy"], idx);
    const employeeCode = `CG-${(1000 + idx * 7) % 9999}`;
    const status = pick(STATUSES, idx);
    const tone = pick(TONES, idx);
    const dept = pick(DEPARTMENTS, idx);
    const position = pick(POSITIONS, idx);
    const initials = firstTh.charAt(0) + lastTh.charAt(0);
    const businessUnitId = pick(BUSINESS_UNITS, idx);
    // Manager mapping — first 5 employees in the synthetic pool become managers
    const managerId = i < 5 ? "manager@humi.test" : `emp-${String(13 + (i % 5)).padStart(3, "0")}`;
    out.push({
      id: `emp-${String(idx).padStart(3, "0")}`,
      employeeCode,
      firstNameTh: firstTh,
      lastNameTh: lastTh,
      initials,
      position,
      department: dept,
      status,
      avatarTone: tone,
      firstNameEn: firstEn,
      lastNameEn: lastEn,
      nickname: nicknameSeed,
      maritalStatus: pick(MARITALS, idx),
      religion: pick(RELIGIONS, idx),
      bloodType: pick(BLOODS, idx),
      nationality: pick(NATIONALITIES, idx),
      nationalId: syntheticNationalId(idx),
      managerId,
      businessUnitId,
    });
  }
  return out;
}

// Enrichment overlay: add SF-parity fields to existing 12 employees (key by id).
// This is the ADDITIVE-merge channel — the existing array stays verbatim;
// /profile/me reads `humiEmployeeWithSfParity(emp)` which spreads overlay on top.
function buildExistingEnrichment(): Record<string, Partial<SyntheticEmployee>> {
  const existing12: Array<[string, Partial<SyntheticEmployee>]> = [
    ["emp-001", { firstNameEn: "Wassana", lastNameEn: "Jirawat", nickname: "Nan", maritalStatus: "married", religion: "buddhist", bloodType: "O", nationality: "th", nationalId: "1100400123456", managerId: "manager@humi.test", businessUnitId: "BU-001-CRC" }],
    ["emp-002", { firstNameEn: "Arun", lastNameEn: "Phongsiri", nickname: "Run", maritalStatus: "single", religion: "buddhist", bloodType: "A", nationality: "th", nationalId: "1100500234567", managerId: "manager@humi.test", businessUnitId: "BU-002-CRG" }],
    ["emp-003", { firstNameEn: "Thanakorn", lastNameEn: "Lertwong", nickname: "Korn", maritalStatus: "married", religion: "christian", bloodType: "B", nationality: "th", nationalId: "1100600345678", managerId: "manager@humi.test", businessUnitId: "BU-003-CMG" }],
    ["emp-004", { firstNameEn: "Piyanuch", lastNameEn: "Somboon", nickname: "Piya", maritalStatus: "married", religion: "buddhist", bloodType: "AB", nationality: "th", nationalId: "1100700456789", managerId: "manager@humi.test", businessUnitId: "BU-001-CRC" }],
    ["emp-005", { firstNameEn: "Krittanai", lastNameEn: "Indradet", nickname: "Tom", maritalStatus: "married", religion: "buddhist", bloodType: "O", nationality: "th", nationalId: "1100800567890", managerId: "hr_manager", businessUnitId: "BU-001-CRC" }],
    ["emp-006", { firstNameEn: "Suphattra", lastNameEn: "Khongsuk", nickname: "Patty", maritalStatus: "single", religion: "buddhist", bloodType: "A", nationality: "th", nationalId: "1100900678901", managerId: "emp-002", businessUnitId: "BU-002-CRG" }],
    ["emp-007", { firstNameEn: "Nattapon", lastNameEn: "Phakdithamma", nickname: "Pol", maritalStatus: "married", religion: "buddhist", bloodType: "B", nationality: "th", nationalId: "1101000789012", managerId: "manager@humi.test", businessUnitId: "BU-001-CRC" }],
    ["emp-008", { firstNameEn: "Mallika", lastNameEn: "Theerasak", nickname: "Mali", maritalStatus: "divorced", religion: "buddhist", bloodType: "O", nationality: "th", nationalId: "1101100890123", managerId: "emp-003", businessUnitId: "BU-003-CMG" }],
    ["emp-009", { firstNameEn: "Chanathip", lastNameEn: "Wannakul", nickname: "Chan", maritalStatus: "single", religion: "muslim", bloodType: "A", nationality: "th", nationalId: "1101200901234", managerId: "emp-003", businessUnitId: "BU-003-CMG" }],
    ["emp-010", { firstNameEn: "Thitikan", lastNameEn: "Dechathorn", nickname: "Kik", maritalStatus: "married", religion: "buddhist", bloodType: "AB", nationality: "th", nationalId: "1101301012345", managerId: "manager@humi.test", businessUnitId: "BU-002-CRG" }],
    ["emp-011", { firstNameEn: "Pakorn", lastNameEn: "Saksit", nickname: "Korn", maritalStatus: "widowed", religion: "buddhist", bloodType: "B", nationality: "th", nationalId: "1101401123456", managerId: "emp-005", businessUnitId: "BU-005-CKB" }],
    ["emp-012", { firstNameEn: "Siriporn", lastNameEn: "Phromthep", nickname: "Por", maritalStatus: "married", religion: "christian", bloodType: "O", nationality: "th", nationalId: "1101501234567", managerId: "emp-002", businessUnitId: "BU-002-CRG" }],
  ];
  return Object.fromEntries(existing12);
}

async function buildExtrasModule(): Promise<{ outPath: string; count: number }> {
  const synthetic = buildSyntheticEmployees(88);
  const enrichment = buildExistingEnrichment();

  const outPath = join(HR_FRONTEND_ROOT, "src/lib/humi-mock-data-sf-parity.ts");
  const body = `// AUTO-GENERATED by scripts/etl-from-sf.ts — T1 (#88) Port SF data
// Run: bun run scripts/etl-from-sf.ts
// Source: /Users/tachongrak/stark/projects/hr-platform-replacement/sf-extract/qas-fields-2026-04-25/
//
// ADDITIVE merge channel:
//   - SF_PARITY_NEW_EMPLOYEES = 88 synthetic employees (emp-013..emp-100)
//   - SF_PARITY_OVERLAY        = enrichment for existing 12 employees (emp-001..emp-012)
//   - Existing HUMI_EMPLOYEES (12) preserved verbatim — overlay applied at read time
//
// Total: 100 employees, all with SF-shape fields (firstNameEn / nickname /
//   maritalStatus / religion / bloodType / nationality / nationalId /
//   managerId / businessUnitId).

import type { HumiEmployee } from './humi-mock-data';

export type HumiEmployeeOverlay = Partial<Omit<HumiEmployee, 'id' | 'employeeCode' | 'firstNameTh' | 'lastNameTh' | 'initials'>>;

export const SF_PARITY_NEW_EMPLOYEES: HumiEmployee[] = ${JSON.stringify(synthetic, null, 2)};

export const SF_PARITY_OVERLAY: Record<string, HumiEmployeeOverlay> = ${JSON.stringify(enrichment, null, 2)};

/** Apply SF-parity overlay to an existing employee (additive — never overwrites required base fields). */
export function withSfParity<T extends HumiEmployee>(emp: T): T {
  const overlay = SF_PARITY_OVERLAY[emp.id];
  if (!overlay) return emp;
  // Overlay only fills gaps — existing fields (e.g., #82/#84/#85 added) are preserved.
  return { ...overlay, ...emp } as T;
}
`;

  await writeFile(outPath, body, "utf8");
  return { outPath, count: synthetic.length };
}

async function main(): Promise<void> {
  console.log("[etl-from-sf] T1 #88 starting…");

  const events = await buildEventReasons();
  console.log(`[etl-from-sf] event-reasons: ${events.count} entries → ${events.outPath}`);

  const extras = await buildExtrasModule();
  console.log(`[etl-from-sf] extras module: ${extras.count} new + 12 enrichment overlays → ${extras.outPath}`);

  console.log("[etl-from-sf] DONE — preserved existing 12 + added 88 = 100 employees");
}

main().catch((err) => {
  console.error("[etl-from-sf] FAILED:", err);
  process.exit(1);
});

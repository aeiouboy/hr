/**
 * Seed Organization Data
 * Migrates mock-org-structure.js, mock-positions.js, mock-team.js
 * to organization-service Prisma schema
 */
import { PrismaClient } from '../../services/organization-service/generated/prisma';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Departments from MockOrgStructure.departments
// ---------------------------------------------------------------------------

const departments = [
  { code: '30040400', name_en: 'Technology Division', name_th: 'สายงานเทคโนโลยี', company_id: 'C015', parent_department_id: null, cost_center: 'CC-RIS-TECH-001', headcount: 180, budget: 200 },
  { code: '30040490', name_en: 'Product Management', name_th: 'ฝ่ายจัดการผลิตภัณฑ์', company_id: 'C015', parent_department_id: 'D000', cost_center: 'CC-RIS-PM-001', headcount: 25, budget: 28 },
  { code: '30040491', name_en: 'Engineering', name_th: 'ฝ่ายวิศวกรรม', company_id: 'C015', parent_department_id: 'D000', cost_center: 'CC-RIS-ENG-001', headcount: 85, budget: 95 },
  { code: '30040492', name_en: 'Quality Assurance', name_th: 'ฝ่ายประกันคุณภาพ', company_id: 'C015', parent_department_id: 'D000', cost_center: 'CC-RIS-QA-001', headcount: 20, budget: 22 },
  { code: '30040493', name_en: 'DevOps & Infrastructure', name_th: 'ฝ่ายดีฟออปส์และโครงสร้างพื้นฐาน', company_id: 'C015', parent_department_id: 'D000', cost_center: 'CC-RIS-DEVOPS-001', headcount: 30, budget: 35 },
  { code: '30040500', name_en: 'Corporate Services', name_th: 'ฝ่ายบริการองค์กร', company_id: 'C015', parent_department_id: null, cost_center: 'CC-RIS-CORP-001', headcount: 45, budget: 50 },
  { code: '30040501', name_en: 'Human Resources', name_th: 'ฝ่ายทรัพยากรบุคคล', company_id: 'C015', parent_department_id: 'D010', cost_center: 'CC-RIS-HR-001', headcount: 15, budget: 16 },
  { code: '30040502', name_en: 'Finance & Accounting', name_th: 'ฝ่ายการเงินและบัญชี', company_id: 'C015', parent_department_id: 'D010', cost_center: 'CC-RIS-FIN-001', headcount: 18, budget: 20 },
  { code: '40001000', name_en: 'Store Operations', name_th: 'ฝ่ายปฏิบัติการร้านค้า', company_id: 'C001', parent_department_id: null, cost_center: 'CC-CDS-OPS-001', headcount: 8500, budget: 9000 },
  { code: '40001001', name_en: 'Marketing', name_th: 'ฝ่ายการตลาด', company_id: 'C001', parent_department_id: null, cost_center: 'CC-CDS-MKT-001', headcount: 450, budget: 500 },
];

// ---------------------------------------------------------------------------
// Positions from MockOrgStructure.positions and MockPositionData.positions
// ---------------------------------------------------------------------------

const positions = [
  { position_code: '40128300', title_en: 'Chief Technology Officer', title_th: 'ประธานเจ้าหน้าที่ฝ่ายเทคโนโลยี', department_code: '30040400', company_id: 'C015', job_grade: 'E2', job_family: 'IT', cost_center: 'CC-RIS-TECH-001', status: 'active', headcount: 1, budget: 1 },
  { position_code: '40128301', title_en: 'Head of Product', title_th: 'หัวหน้าฝ่ายผลิตภัณฑ์', department_code: '30040490', company_id: 'C015', job_grade: 'M1', job_family: 'IT', cost_center: 'CC-RIS-PM-001', status: 'active', headcount: 1, budget: 1 },
  { position_code: '40128307', title_en: 'Product Manager', title_th: 'ผู้จัดการผลิตภัณฑ์', department_code: '30040490', company_id: 'C015', job_grade: 'M2', job_family: 'IT', cost_center: 'CC-RIS-PM-001', status: 'active', headcount: 5, budget: 6 },
  { position_code: '40128308', title_en: 'Senior Product Analyst', title_th: 'นักวิเคราะห์ผลิตภัณฑ์อาวุโส', department_code: '30040490', company_id: 'C015', job_grade: 'P1', job_family: 'IT', cost_center: 'CC-RIS-PM-001', status: 'active', headcount: 8, budget: 10 },
  { position_code: '40128309', title_en: 'Product Analyst', title_th: 'นักวิเคราะห์ผลิตภัณฑ์', department_code: '30040490', company_id: 'C015', job_grade: 'P2', job_family: 'IT', cost_center: 'CC-RIS-PM-001', status: 'active', headcount: 10, budget: 12 },
  { position_code: '40128310', title_en: 'Associate Product Manager', title_th: 'ผู้ช่วยผู้จัดการผลิตภัณฑ์', department_code: '30040490', company_id: 'C015', job_grade: 'M3', job_family: 'IT', cost_center: 'CC-RIS-PM-001', status: 'vacant', headcount: 3, budget: 5 },
  { position_code: '40128320', title_en: 'Head of Engineering', title_th: 'หัวหน้าฝ่ายวิศวกรรม', department_code: '30040491', company_id: 'C015', job_grade: 'M1', job_family: 'IT', cost_center: 'CC-RIS-ENG-001', status: 'active', headcount: 1, budget: 1 },
  { position_code: '40128321', title_en: 'Engineering Manager', title_th: 'ผู้จัดการวิศวกรรม', department_code: '30040491', company_id: 'C015', job_grade: 'M2', job_family: 'IT', cost_center: 'CC-RIS-ENG-001', status: 'active', headcount: 4, budget: 5 },
  { position_code: '40128322', title_en: 'Senior Software Engineer', title_th: 'วิศวกรซอฟต์แวร์อาวุโส', department_code: '30040491', company_id: 'C015', job_grade: 'P1', job_family: 'IT', cost_center: 'CC-RIS-ENG-001', status: 'active', headcount: 25, budget: 30 },
  { position_code: '40128323', title_en: 'Software Engineer', title_th: 'วิศวกรซอฟต์แวร์', department_code: '30040491', company_id: 'C015', job_grade: 'P2', job_family: 'IT', cost_center: 'CC-RIS-ENG-001', status: 'active', headcount: 40, budget: 45 },
  { position_code: '40128330', title_en: 'Head of QA', title_th: 'หัวหน้าฝ่ายประกันคุณภาพ', department_code: '30040492', company_id: 'C015', job_grade: 'M1', job_family: 'IT', cost_center: 'CC-RIS-QA-001', status: 'active', headcount: 1, budget: 1 },
  { position_code: '40128340', title_en: 'HR Director', title_th: 'ผู้อำนวยการฝ่ายทรัพยากรบุคคล', department_code: '30040501', company_id: 'C015', job_grade: 'M1', job_family: 'HR', cost_center: 'CC-RIS-HR-001', status: 'active', headcount: 1, budget: 1 },
];

// ---------------------------------------------------------------------------
// Org Nodes from MockOrgStructure.employees
// ---------------------------------------------------------------------------

const orgNodes = [
  { employee_id: 'EMP_L0', name_en: 'Tos Chirathivat', name_th: 'ทศ จิราธิวัฒน์', position_title_en: 'Executive Chairman & CEO', position_title_th: 'ประธานกรรมการบริหารและประธานเจ้าหน้าที่บริหาร', department_id: 'D_EXEC', company_id: 'C002', photo_url: 'https://i.pravatar.cc/150?img=23', email: 'tos.c@central.co.th', phone: '+66 2 021 9000', headcount: 16, total_headcount: 67704 },
  { employee_id: 'EMP_L1', name_en: 'Suthisarn Chirathivat', name_th: 'สุทธิศาสน์ จิราธิวัฒน์', position_title_en: 'CEO - CRC', position_title_th: 'ประธานเจ้าหน้าที่บริหาร - CRC', department_id: 'D_EXEC', company_id: 'C002', photo_url: 'https://i.pravatar.cc/150?img=22', email: 'suthisarn.c@central.co.th', phone: '+66 2 021 9001', headcount: 18, total_headcount: 59002 },
  { employee_id: 'EMP_L2', name_en: 'Rutchapon Vongsatitporn', name_th: 'รัชพล วงศ์สถิตย์พร', position_title_en: 'CIO', position_title_th: 'ประธานเจ้าหน้าที่ฝ่ายสารสนเทศ', department_id: 'D000', company_id: 'C015', photo_url: 'https://i.pravatar.cc/150?img=21', email: 'rutchapon.v@central.co.th', phone: '+66 2 021 9100', headcount: 5, total_headcount: 465 },
  { employee_id: 'EMP_L3', name_en: 'Maneerat Suramethakul', name_th: 'มณีรัตน์ สุระเมทกุล', position_title_en: 'Head of IT Strategy, Application & International', position_title_th: 'หัวหน้าฝ่ายกลยุทธ์ไอที แอปพลิเคชันและต่างประเทศ', department_id: 'D000', company_id: 'C015', photo_url: 'https://i.pravatar.cc/150?img=20', email: 'maneerat.s@central.co.th', phone: '+66 2 021 9110', headcount: 7, total_headcount: 266 },
  { employee_id: 'EMP_SUP002', name_en: 'Kajorn Kanjanawarin', name_th: 'ขจร กาญจนวรินทร์', position_title_en: 'Head of IT Strategy & Products', position_title_th: 'หัวหน้าฝ่ายกลยุทธ์ไอทีและผลิตภัณฑ์', department_id: 'D001', company_id: 'C015', photo_url: 'https://i.pravatar.cc/150?img=13', email: 'kajorn.k@central.co.th', phone: '+66 2 021 9120', headcount: 20, total_headcount: 129 },
  { employee_id: 'EMP_SUP001', name_en: 'Rungrote Amnuaysopon', name_th: 'รุ่งโรจน์ อำนวยสพน', position_title_en: 'Head of Product', position_title_th: 'หัวหน้าฝ่ายผลิตภัณฑ์', department_id: 'D001', company_id: 'C015', photo_url: 'https://i.pravatar.cc/150?img=12', email: 'rungrote.a@central.co.th', phone: '+66 2 021 9130', headcount: 7, total_headcount: 9 },
  { employee_id: 'EMP001', name_en: 'Chongrak Tanaka', name_th: 'จงรักษ์ ทานากะ', position_title_en: 'Product Manager', position_title_th: 'ผู้จัดการผลิตภัณฑ์', department_id: 'D001', company_id: 'C015', photo_url: 'https://i.pravatar.cc/150?img=11', email: 'chongrak.t@central.co.th', phone: '+66 2 021 9140', headcount: 2, total_headcount: 2 },
  { employee_id: 'EMP_DR001', name_en: 'Naruechon Woraphatphawan', name_th: 'นฤชล วรพัฒน์พาวัลย์', position_title_en: 'Functional Trainee (ProNext)', position_title_th: 'พนักงานฝึกหัด (ProNext)', department_id: 'D001', company_id: 'C015', photo_url: 'https://i.pravatar.cc/150?img=14', email: 'naruechon.w@central.co.th', phone: '+66 2 021 9141', headcount: null, total_headcount: null },
  { employee_id: 'EMP_DR002', name_en: 'Punnapa Thianchai', name_th: 'ปุณณภา เทียนชัย', position_title_en: 'Functional Trainee (ProNext)', position_title_th: 'พนักงานฝึกหัด (ProNext)', department_id: 'D001', company_id: 'C015', photo_url: 'https://i.pravatar.cc/150?img=15', email: 'punnapa.t@central.co.th', phone: '+66 2 021 9142', headcount: null, total_headcount: null },
  { employee_id: 'EMP_ENG001', name_en: 'Somchai Prasert', name_th: 'สมชาย ประเสริฐ', position_title_en: 'Head of Engineering', position_title_th: 'หัวหน้าฝ่ายวิศวกรรม', department_id: 'D002', company_id: 'C015', photo_url: 'https://i.pravatar.cc/150?img=20', email: 'somchai.p@central.co.th', phone: '+66 2 123 4571', headcount: null, total_headcount: null },
  { employee_id: 'EMP_QA001', name_en: 'Wipawee Sukhothai', name_th: 'วิภาวี สุโขทัย', position_title_en: 'Head of QA', position_title_th: 'หัวหน้าฝ่ายประกันคุณภาพ', department_id: 'D003', company_id: 'C015', photo_url: 'https://i.pravatar.cc/150?img=21', email: 'wipawee.s@central.co.th', phone: '+66 2 123 4572', headcount: null, total_headcount: null },
  { employee_id: 'EMP_HR001', name_en: 'Nattaya Ayutthaya', name_th: 'ณัฐยา อยุธยา', position_title_en: 'HR Director', position_title_th: 'ผู้อำนวยการฝ่ายทรัพยากรบุคคล', department_id: 'D011', company_id: 'C015', photo_url: 'https://i.pravatar.cc/150?img=17', email: 'nattaya.a@central.co.th', phone: '+66 2 345 6789', headcount: null, total_headcount: null },
];

// ---------------------------------------------------------------------------
// Reporting lines from MockOrgStructure.reportingLines
// ---------------------------------------------------------------------------

const reportingLines = [
  { from_employee_id: 'EMP_L1', to_employee_id: 'EMP_L0', type: 'solid', relationship_type: 'direct' },
  { from_employee_id: 'EMP_L2', to_employee_id: 'EMP_L1', type: 'solid', relationship_type: 'direct' },
  { from_employee_id: 'EMP_L3', to_employee_id: 'EMP_L2', type: 'solid', relationship_type: 'direct' },
  { from_employee_id: 'EMP_SUP002', to_employee_id: 'EMP_L3', type: 'solid', relationship_type: 'direct' },
  { from_employee_id: 'EMP_SUP001', to_employee_id: 'EMP_SUP002', type: 'solid', relationship_type: 'direct' },
  { from_employee_id: 'EMP001', to_employee_id: 'EMP_SUP001', type: 'solid', relationship_type: 'direct' },
  { from_employee_id: 'EMP_DR001', to_employee_id: 'EMP001', type: 'solid', relationship_type: 'direct' },
  { from_employee_id: 'EMP_DR002', to_employee_id: 'EMP001', type: 'solid', relationship_type: 'direct' },
  { from_employee_id: 'EMP_ENG001', to_employee_id: 'EMP_SUP002', type: 'solid', relationship_type: 'direct' },
  { from_employee_id: 'EMP_QA001', to_employee_id: 'EMP_SUP002', type: 'solid', relationship_type: 'direct' },
  { from_employee_id: 'EMP001', to_employee_id: 'EMP_ENG001', type: 'dotted', relationship_type: 'matrix', label_en: 'Technical Collaboration', label_th: 'ความร่วมมือด้านเทคนิค' },
  { from_employee_id: 'EMP001', to_employee_id: 'EMP_QA001', type: 'dotted', relationship_type: 'functional', label_en: 'Quality Oversight', label_th: 'การกำกับดูแลคุณภาพ' },
  { from_employee_id: 'EMP_DR001', to_employee_id: 'EMP_ENG001', type: 'dotted', relationship_type: 'project', label_en: 'Project Support', label_th: 'สนับสนุนโครงการ' },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

export async function seedOrganization() {
  console.log('Seeding departments...');
  const deptIdMap: Record<string, string> = {};

  // First pass: create departments without parent references
  for (const dept of departments) {
    const record = await prisma.department.upsert({
      where: { code: dept.code },
      create: {
        code: dept.code,
        name_en: dept.name_en,
        name_th: dept.name_th,
        company_id: dept.company_id,
        cost_center: dept.cost_center,
        headcount: dept.headcount,
        budget: dept.budget,
      },
      update: {
        name_en: dept.name_en,
        name_th: dept.name_th,
        company_id: dept.company_id,
        cost_center: dept.cost_center,
        headcount: dept.headcount,
        budget: dept.budget,
      },
    });
    deptIdMap[dept.code] = record.id;
  }
  console.log(`  Seeded ${departments.length} departments`);

  // Second pass: set parent department IDs
  const parentMap: Record<string, string> = {
    'D000': '30040400', 'D001': '30040490', 'D010': '30040500',
  };
  for (const dept of departments) {
    if (dept.parent_department_id && parentMap[dept.parent_department_id]) {
      const parentCode = parentMap[dept.parent_department_id];
      const parentUuid = deptIdMap[parentCode];
      if (parentUuid) {
        await prisma.department.update({
          where: { code: dept.code },
          data: { parent_department_id: parentUuid },
        });
      }
    }
  }

  // Seed positions
  console.log('Seeding positions...');
  const posIdMap: Record<string, string> = {};
  for (const pos of positions) {
    const deptUuid = deptIdMap[pos.department_code];
    if (!deptUuid) {
      console.warn(`  WARNING: Department ${pos.department_code} not found for position ${pos.position_code}`);
      continue;
    }
    const record = await prisma.position.upsert({
      where: { position_code: pos.position_code },
      create: {
        position_code: pos.position_code,
        title_en: pos.title_en,
        title_th: pos.title_th,
        department_id: deptUuid,
        company_id: pos.company_id,
        job_grade: pos.job_grade,
        job_family: pos.job_family,
        cost_center: pos.cost_center,
        status: pos.status,
        headcount: pos.headcount,
        budget: pos.budget,
      },
      update: {
        title_en: pos.title_en,
        title_th: pos.title_th,
        department_id: deptUuid,
        company_id: pos.company_id,
        job_grade: pos.job_grade,
        job_family: pos.job_family,
        cost_center: pos.cost_center,
        status: pos.status,
        headcount: pos.headcount,
        budget: pos.budget,
      },
    });
    posIdMap[pos.position_code] = record.id;
  }
  console.log(`  Seeded ${positions.length} positions`);

  // Seed org nodes
  console.log('Seeding org nodes...');
  for (const node of orgNodes) {
    await prisma.orgNode.upsert({
      where: { employee_id: node.employee_id },
      create: node,
      update: node,
    });
  }
  console.log(`  Seeded ${orgNodes.length} org nodes`);

  // Seed reporting lines
  console.log('Seeding reporting lines...');
  // Clear existing reporting lines for idempotency
  await prisma.reportingLine.deleteMany({});
  for (const rl of reportingLines) {
    await prisma.reportingLine.create({ data: rl });
  }
  console.log(`  Seeded ${reportingLines.length} reporting lines`);
}

if (require.main === module) {
  seedOrganization()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

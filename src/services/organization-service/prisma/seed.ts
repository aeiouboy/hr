import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding organization service database...');

  // Departments
  const departments = [
    { id: 'D000', code: '30040400', name_en: 'Technology Division', name_th: 'สายงานเทคโนโลยี', company_id: 'C015', parent_department_id: null, cost_center: 'CC-RIS-TECH-001', headcount: 180 },
    { id: 'D001', code: '30040490', name_en: 'Product Management', name_th: 'ฝ่ายจัดการผลิตภัณฑ์', company_id: 'C015', parent_department_id: 'D000', cost_center: 'CC-RIS-PM-001', headcount: 25 },
    { id: 'D002', code: '30040491', name_en: 'Engineering', name_th: 'ฝ่ายวิศวกรรม', company_id: 'C015', parent_department_id: 'D000', cost_center: 'CC-RIS-ENG-001', headcount: 85 },
    { id: 'D003', code: '30040492', name_en: 'Quality Assurance', name_th: 'ฝ่ายประกันคุณภาพ', company_id: 'C015', parent_department_id: 'D000', cost_center: 'CC-RIS-QA-001', headcount: 20 },
    { id: 'D011', code: '30040501', name_en: 'Human Resources', name_th: 'ฝ่ายทรัพยากรบุคคล', company_id: 'C015', parent_department_id: 'D010', cost_center: 'CC-RIS-HR-001', headcount: 15 },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { code: dept.code },
      update: {},
      create: dept,
    });
  }

  // Positions
  const positions = [
    { id: 'POS001', position_code: '40128307', title_en: 'Product Manager', title_th: 'ผู้จัดการผลิตภัณฑ์', department_id: 'D001', company_id: 'C015', job_grade: 'M2', job_family: 'IT', cost_center: 'CC001', status: 'active', reports_to_position_id: 'POS002', headcount: 5, budget: 6 },
    { id: 'POS002', position_code: '40128301', title_en: 'Head of Product', title_th: 'หัวหน้าฝ่ายผลิตภัณฑ์', department_id: 'D001', company_id: 'C015', job_grade: 'M1', job_family: 'IT', cost_center: 'CC001', status: 'active', reports_to_position_id: null, headcount: 1, budget: 1 },
    { id: 'POS010', position_code: '40128320', title_en: 'Head of Engineering', title_th: 'หัวหน้าฝ่ายวิศวกรรม', department_id: 'D002', company_id: 'C015', job_grade: 'M1', job_family: 'IT', cost_center: 'CC002', status: 'active', reports_to_position_id: null, headcount: 1, budget: 1 },
  ];

  for (const pos of positions) {
    await prisma.position.upsert({
      where: { position_code: pos.position_code },
      update: {},
      create: pos,
    });
  }

  // Org Nodes
  const orgNodes = [
    { id: 'EMP_SUP001', employee_id: 'EMP_SUP001', name_en: 'Rungrote Amnuaysopon', name_th: 'รุ่งโรจน์ อำนวยสพน', position_title_en: 'Head of Product', department_id: 'D001', company_id: 'C015', email: 'rungrote.a@central.co.th' },
    { id: 'EMP001', employee_id: 'EMP001', name_en: 'Chongrak Tanaka', name_th: 'จงรักษ์ ทานากะ', position_title_en: 'Product Manager', department_id: 'D001', company_id: 'C015', email: 'chongrak.t@central.co.th' },
    { id: 'EMP_DR001', employee_id: 'EMP_DR001', name_en: 'Naruechon Woraphatphawan', name_th: 'นฤชล วรพัฒน์พาวัลย์', position_title_en: 'Functional Trainee', department_id: 'D001', company_id: 'C015', email: 'naruechon.w@central.co.th' },
    { id: 'EMP_DR002', employee_id: 'EMP_DR002', name_en: 'Punnapa Thianchai', name_th: 'ปุณณภา เทียนชัย', position_title_en: 'Functional Trainee', department_id: 'D001', company_id: 'C015', email: 'punnapa.t@central.co.th' },
    { id: 'EMP_ENG001', employee_id: 'EMP_ENG001', name_en: 'Somchai Prasert', name_th: 'สมชาย ประเสริฐ', position_title_en: 'Head of Engineering', department_id: 'D002', company_id: 'C015', email: 'somchai.p@central.co.th' },
  ];

  for (const node of orgNodes) {
    await prisma.orgNode.upsert({
      where: { employee_id: node.employee_id },
      update: {},
      create: node,
    });
  }

  // Reporting Lines
  const reportingLines = [
    { id: 'RL003', from_employee_id: 'EMP001', to_employee_id: 'EMP_SUP001', type: 'solid', relationship_type: 'direct' },
    { id: 'RL004', from_employee_id: 'EMP_DR001', to_employee_id: 'EMP001', type: 'solid', relationship_type: 'direct' },
    { id: 'RL005', from_employee_id: 'EMP_DR002', to_employee_id: 'EMP001', type: 'solid', relationship_type: 'direct' },
    { id: 'RL006', from_employee_id: 'EMP_ENG001', to_employee_id: 'EMP_SUP001', type: 'solid', relationship_type: 'direct' },
  ];

  for (const rl of reportingLines) {
    await prisma.reportingLine.upsert({
      where: { id: rl.id },
      update: {},
      create: rl,
    });
  }

  // Incumbents
  await prisma.incumbent.create({
    data: { employee_id: 'EMP001', position_id: 'POS001', start_date: new Date('2022-01-01'), is_primary: true },
  });

  await prisma.incumbent.create({
    data: { employee_id: 'EMP_SUP001', position_id: 'POS002', start_date: new Date('2021-03-01'), is_primary: true },
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

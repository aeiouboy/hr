import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const templates = [
    { type: 'payslip', name: 'Payslip Template', name_th: 'แม่แบบสลิปเงินเดือน', content: 'payslip-template-v1', version: 1 },
    { type: 'tax_cert', name: '50 Tawi Certificate', name_th: 'แม่แบบหนังสือรับรองการหักภาษี ณ ที่จ่าย', content: '50tawi-template-v1', version: 1 },
    { type: 'employment_cert', name: 'Employment Certificate', name_th: 'แม่แบบหนังสือรับรองการทำงาน', content: 'employment-cert-template-v1', version: 1 },
    { type: 'salary_cert', name: 'Salary Certificate', name_th: 'แม่แบบหนังสือรับรองเงินเดือน', content: 'salary-cert-template-v1', version: 1 },
  ];

  for (const tmpl of templates) {
    await prisma.documentTemplate.upsert({
      where: { type: tmpl.type },
      update: tmpl,
      create: tmpl,
    });
  }

  console.log('Seeded document templates');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

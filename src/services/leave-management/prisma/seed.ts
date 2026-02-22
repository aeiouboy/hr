import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed 8 leave types
  const leaveTypes = [
    { code: 'annual', name_en: 'Annual Leave', name_th: 'ลาพักร้อน', max_days: 10, requires_medical_cert: false },
    { code: 'sick', name_en: 'Sick Leave', name_th: 'ลาป่วย', max_days: 30, requires_medical_cert: true, medical_cert_days: 3 },
    { code: 'personal', name_en: 'Personal Leave', name_th: 'ลากิจ', max_days: 5, requires_medical_cert: false },
    { code: 'maternity', name_en: 'Maternity Leave', name_th: 'ลาคลอด', max_days: 98, requires_medical_cert: true, medical_cert_days: 1, applicable_gender: 'female' },
    { code: 'paternity', name_en: 'Paternity Leave', name_th: 'ลาเพื่อดูแลภรรยาคลอด', max_days: 15, requires_medical_cert: false, applicable_gender: 'male' },
    { code: 'ordination', name_en: 'Ordination Leave', name_th: 'ลาอุปสมบท', max_days: 15, requires_medical_cert: false, applicable_gender: 'male', max_per_career: 1 },
    { code: 'military', name_en: 'Military Service Leave', name_th: 'ลารับราชการทหาร', max_days: 60, requires_medical_cert: false, applicable_gender: 'male' },
    { code: 'unpaid', name_en: 'Unpaid Leave', name_th: 'ลาไม่รับค่าจ้าง', max_days: 30, requires_medical_cert: false },
  ];

  for (const lt of leaveTypes) {
    await prisma.leaveType.upsert({
      where: { code: lt.code },
      update: lt,
      create: lt,
    });
  }

  console.log('Seeded 8 leave types');

  // Get leave type IDs for balance seeding
  const allTypes = await prisma.leaveType.findMany();
  const typeMap = Object.fromEntries(allTypes.map((t) => [t.code, t.id]));

  // Seed balances for EMP001 (2026)
  const balances = [
    { employee_id: 'EMP001', leave_type_id: typeMap.annual, year: 2026, entitled: 10, used: 2, pending: 0, remaining: 8, carry_over: 2 },
    { employee_id: 'EMP001', leave_type_id: typeMap.sick, year: 2026, entitled: 30, used: 1, pending: 0, remaining: 29, carry_over: 0 },
    { employee_id: 'EMP001', leave_type_id: typeMap.personal, year: 2026, entitled: 5, used: 0, pending: 0, remaining: 5, carry_over: 0 },
    { employee_id: 'EMP001', leave_type_id: typeMap.maternity, year: 2026, entitled: 98, used: 0, pending: 0, remaining: 98, carry_over: 0 },
    { employee_id: 'EMP001', leave_type_id: typeMap.paternity, year: 2026, entitled: 15, used: 0, pending: 0, remaining: 15, carry_over: 0 },
    { employee_id: 'EMP001', leave_type_id: typeMap.ordination, year: 2026, entitled: 15, used: 0, pending: 0, remaining: 15, carry_over: 0 },
    { employee_id: 'EMP001', leave_type_id: typeMap.military, year: 2026, entitled: 60, used: 0, pending: 0, remaining: 60, carry_over: 0 },
    { employee_id: 'EMP001', leave_type_id: typeMap.unpaid, year: 2026, entitled: 30, used: 0, pending: 0, remaining: 30, carry_over: 0 },
  ];

  for (const bal of balances) {
    await prisma.leaveBalance.upsert({
      where: {
        employee_id_leave_type_id_year: {
          employee_id: bal.employee_id,
          leave_type_id: bal.leave_type_id,
          year: bal.year,
        },
      },
      update: bal,
      create: bal,
    });
  }

  console.log('Seeded balances for EMP001');

  // Seed Thai public holidays for 2026
  const holidays2026 = [
    { date: new Date('2026-01-01'), holiday_name: "New Year's Day", holiday_name_th: 'วันขึ้นปีใหม่' },
    { date: new Date('2026-02-26'), holiday_name: 'Makha Bucha Day', holiday_name_th: 'วันมาฆบูชา' },
    { date: new Date('2026-04-06'), holiday_name: 'Chakri Memorial Day', holiday_name_th: 'วันจักรี' },
    { date: new Date('2026-04-13'), holiday_name: 'Songkran Festival', holiday_name_th: 'วันสงกรานต์' },
    { date: new Date('2026-04-14'), holiday_name: 'Songkran Festival', holiday_name_th: 'วันสงกรานต์' },
    { date: new Date('2026-04-15'), holiday_name: 'Songkran Festival', holiday_name_th: 'วันสงกรานต์' },
    { date: new Date('2026-05-01'), holiday_name: 'National Labour Day', holiday_name_th: 'วันแรงงานแห่งชาติ' },
    { date: new Date('2026-05-04'), holiday_name: 'Coronation Day', holiday_name_th: 'วันฉัตรมงคล' },
    { date: new Date('2026-05-26'), holiday_name: 'Visakha Bucha Day', holiday_name_th: 'วันวิสาขบูชา' },
    { date: new Date('2026-06-03'), holiday_name: "Queen Suthida's Birthday", holiday_name_th: 'วันเฉลิมพระชนมพรรษาสมเด็จพระราชินี' },
    { date: new Date('2026-07-24'), holiday_name: 'Asanha Bucha Day', holiday_name_th: 'วันอาสาฬหบูชา' },
    { date: new Date('2026-07-28'), holiday_name: "King's Birthday", holiday_name_th: 'วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระเจ้าอยู่หัว' },
    { date: new Date('2026-08-12'), holiday_name: "Mother's Day", holiday_name_th: 'วันแม่แห่งชาติ' },
    { date: new Date('2026-10-13'), holiday_name: 'King Bhumibol Memorial Day', holiday_name_th: 'วันคล้ายวันสวรรคตพระบาทสมเด็จพระเจ้าอยู่หัว ร.9' },
    { date: new Date('2026-10-23'), holiday_name: 'Chulalongkorn Day', holiday_name_th: 'วันปิยมหาราช' },
    { date: new Date('2026-12-05'), holiday_name: "Father's Day", holiday_name_th: 'วันพ่อแห่งชาติ' },
    { date: new Date('2026-12-10'), holiday_name: 'Constitution Day', holiday_name_th: 'วันรัฐธรรมนูญ' },
    { date: new Date('2026-12-31'), holiday_name: "New Year's Eve", holiday_name_th: 'วันสิ้นปี' },
  ];

  for (const holiday of holidays2026) {
    await prisma.leaveCalendar.upsert({
      where: { date: holiday.date },
      update: { ...holiday, is_holiday: true },
      create: { ...holiday, is_holiday: true },
    });
  }

  console.log('Seeded 2026 Thai public holidays');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

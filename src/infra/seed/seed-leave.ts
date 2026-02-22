/**
 * Seed Leave Data
 * Migrates mock-settings.js leaveTypes to leave-management Prisma schema
 * Also seeds leave balances, requests, and Thai public holidays
 */
import { PrismaClient } from '../../services/leave-management/generated/prisma';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Leave types from MockSettingsData.leaveTypes
// ---------------------------------------------------------------------------

const leaveTypes = [
  { code: 'AL', name_en: 'Annual Leave', name_th: 'วันลาพักร้อน', max_days: 6, requires_medical_cert: false, medical_cert_days: null, applicable_gender: null, max_per_career: null, is_active: true },
  { code: 'SL', name_en: 'Sick Leave', name_th: 'วันลาป่วย', max_days: 30, requires_medical_cert: true, medical_cert_days: 3, applicable_gender: null, max_per_career: null, is_active: true },
  { code: 'PL', name_en: 'Personal Leave', name_th: 'วันลากิจ', max_days: 3, requires_medical_cert: false, medical_cert_days: null, applicable_gender: null, max_per_career: null, is_active: true },
  { code: 'MAT', name_en: 'Maternity Leave', name_th: 'วันลาคลอดบุตร', max_days: 98, requires_medical_cert: true, medical_cert_days: 0, applicable_gender: 'female', max_per_career: null, is_active: true },
  { code: 'MIL', name_en: 'Military Leave', name_th: 'วันลาทหาร', max_days: 60, requires_medical_cert: true, medical_cert_days: 0, applicable_gender: 'male', max_per_career: null, is_active: true },
  { code: 'ORD', name_en: 'Ordination Leave', name_th: 'วันลาบวช', max_days: 15, requires_medical_cert: true, medical_cert_days: 0, applicable_gender: null, max_per_career: 1, is_active: true },
  { code: 'STR', name_en: 'Sterilization Leave', name_th: 'วันลาทำหมัน', max_days: 3, requires_medical_cert: true, medical_cert_days: 0, applicable_gender: null, max_per_career: null, is_active: true },
  { code: 'TRN', name_en: 'Training Leave', name_th: 'วันลาอบรม', max_days: 30, requires_medical_cert: false, medical_cert_days: null, applicable_gender: null, max_per_career: null, is_active: true },
];

// Thai public holidays 2026 from MockOvertimeData
const publicHolidays2026 = [
  { date: '2026-01-01', holiday_name: "New Year's Day", holiday_name_th: 'วันขึ้นปีใหม่' },
  { date: '2026-02-26', holiday_name: 'Makha Bucha Day', holiday_name_th: 'วันมาฆบูชา' },
  { date: '2026-04-06', holiday_name: 'Chakri Memorial Day', holiday_name_th: 'วันจักรี' },
  { date: '2026-04-13', holiday_name: 'Songkran Festival', holiday_name_th: 'วันสงกรานต์' },
  { date: '2026-04-14', holiday_name: 'Songkran Festival', holiday_name_th: 'วันสงกรานต์' },
  { date: '2026-04-15', holiday_name: 'Songkran Festival', holiday_name_th: 'วันสงกรานต์' },
  { date: '2026-05-01', holiday_name: 'Labour Day', holiday_name_th: 'วันแรงงานแห่งชาติ' },
  { date: '2026-05-04', holiday_name: 'Coronation Day', holiday_name_th: 'วันฉัตรมงคล' },
  { date: '2026-05-13', holiday_name: 'Visakha Bucha Day', holiday_name_th: 'วันวิสาขบูชา' },
  { date: '2026-06-03', holiday_name: "Queen's Birthday", holiday_name_th: 'วันเฉลิมพระชนมพรรษาสมเด็จพระราชินี' },
  { date: '2026-07-11', holiday_name: 'Asanha Bucha Day', holiday_name_th: 'วันอาสาฬหบูชา' },
  { date: '2026-07-12', holiday_name: 'Buddhist Lent Day', holiday_name_th: 'วันเข้าพรรษา' },
  { date: '2026-07-28', holiday_name: "King's Birthday", holiday_name_th: 'วันเฉลิมพระชนมพรรษา ร.10' },
  { date: '2026-08-12', holiday_name: "Mother's Day", holiday_name_th: 'วันแม่แห่งชาติ' },
  { date: '2026-10-13', holiday_name: 'King Bhumibol Memorial Day', holiday_name_th: 'วันคล้ายวันสวรรคต ร.9' },
  { date: '2026-10-23', holiday_name: 'Chulalongkorn Day', holiday_name_th: 'วันปิยมหาราช' },
  { date: '2026-12-05', holiday_name: "Father's Day", holiday_name_th: 'วันพ่อแห่งชาติ' },
  { date: '2026-12-10', holiday_name: 'Constitution Day', holiday_name_th: 'วันรัฐธรรมนูญ' },
  { date: '2026-12-31', holiday_name: "New Year's Eve", holiday_name_th: 'วันสิ้นปี' },
];

// Sample leave balances for 2026
const leaveBalances = [
  { employee_id: 'EMP001', leave_type_code: 'AL', year: 2026, entitled: 12, used: 3, pending: 1, remaining: 8, carry_over: 6 },
  { employee_id: 'EMP001', leave_type_code: 'SL', year: 2026, entitled: 30, used: 2, pending: 0, remaining: 28, carry_over: 0 },
  { employee_id: 'EMP001', leave_type_code: 'PL', year: 2026, entitled: 3, used: 1, pending: 0, remaining: 2, carry_over: 0 },
  { employee_id: 'EMP_DR001', leave_type_code: 'SL', year: 2026, entitled: 30, used: 0, pending: 0, remaining: 30, carry_over: 0 },
  { employee_id: 'EMP_DR001', leave_type_code: 'PL', year: 2026, entitled: 3, used: 1, pending: 0, remaining: 2, carry_over: 0 },
  { employee_id: 'EMP_DR002', leave_type_code: 'SL', year: 2026, entitled: 30, used: 0, pending: 1, remaining: 29, carry_over: 0 },
  { employee_id: 'EMP_DR002', leave_type_code: 'PL', year: 2026, entitled: 3, used: 0, pending: 0, remaining: 3, carry_over: 0 },
];

// Sample leave requests from MockTeamData.teamLeaves
const leaveRequests = [
  {
    employee_id: 'EMP_DR001',
    leave_type_code: 'PL',
    start_date: new Date('2026-01-15'),
    end_date: new Date('2026-01-15'),
    days: 1,
    reason: 'Personal matters',
    status: 'approved',
    approved_by: 'EMP001',
    approved_date: new Date('2026-01-10'),
  },
  {
    employee_id: 'EMP_DR002',
    leave_type_code: 'SL',
    start_date: new Date('2026-01-20'),
    end_date: new Date('2026-01-20'),
    days: 1,
    reason: 'Not feeling well',
    status: 'pending',
    approved_by: null,
    approved_date: null,
  },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

export async function seedLeave() {
  console.log('Seeding leave types...');
  const ltIdMap: Record<string, string> = {};
  for (const lt of leaveTypes) {
    const record = await prisma.leaveType.upsert({
      where: { code: lt.code },
      create: lt,
      update: lt,
    });
    ltIdMap[lt.code] = record.id;
  }
  console.log(`  Seeded ${leaveTypes.length} leave types`);

  // Seed leave calendar (public holidays)
  console.log('Seeding leave calendar (public holidays)...');
  for (const holiday of publicHolidays2026) {
    const dateObj = new Date(holiday.date);
    await prisma.leaveCalendar.upsert({
      where: { date: dateObj },
      create: {
        date: dateObj,
        is_holiday: true,
        holiday_name: holiday.holiday_name,
        holiday_name_th: holiday.holiday_name_th,
      },
      update: {
        is_holiday: true,
        holiday_name: holiday.holiday_name,
        holiday_name_th: holiday.holiday_name_th,
      },
    });
  }
  console.log(`  Seeded ${publicHolidays2026.length} holidays`);

  // Seed leave balances
  console.log('Seeding leave balances...');
  for (const bal of leaveBalances) {
    const ltId = ltIdMap[bal.leave_type_code];
    if (!ltId) continue;
    await prisma.leaveBalance.upsert({
      where: {
        employee_id_leave_type_id_year: {
          employee_id: bal.employee_id,
          leave_type_id: ltId,
          year: bal.year,
        },
      },
      create: {
        employee_id: bal.employee_id,
        leave_type_id: ltId,
        year: bal.year,
        entitled: bal.entitled,
        used: bal.used,
        pending: bal.pending,
        remaining: bal.remaining,
        carry_over: bal.carry_over,
      },
      update: {
        entitled: bal.entitled,
        used: bal.used,
        pending: bal.pending,
        remaining: bal.remaining,
        carry_over: bal.carry_over,
      },
    });
  }
  console.log(`  Seeded ${leaveBalances.length} leave balances`);

  // Seed leave requests
  console.log('Seeding leave requests...');
  // Clear and re-create for idempotency
  await prisma.leaveRequest.deleteMany({});
  for (const req of leaveRequests) {
    const ltId = ltIdMap[req.leave_type_code];
    if (!ltId) continue;
    await prisma.leaveRequest.create({
      data: {
        employee_id: req.employee_id,
        leave_type_id: ltId,
        start_date: req.start_date,
        end_date: req.end_date,
        days: req.days,
        reason: req.reason,
        status: req.status,
        approved_by: req.approved_by,
        approved_date: req.approved_date,
      },
    });
  }
  console.log(`  Seeded ${leaveRequests.length} leave requests`);
}

if (require.main === module) {
  seedLeave()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

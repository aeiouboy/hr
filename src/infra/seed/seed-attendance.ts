/**
 * Seed Attendance Data
 * Migrates mock-attendance.js to time-attendance Prisma schema
 */
import { PrismaClient } from '../../services/time-attendance/generated/prisma';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Shifts (derived from attendance records' shift references)
// ---------------------------------------------------------------------------

const shifts = [
  { code: 'REG', name_en: 'Regular Office Hours', name_th: 'เวลาทำงานปกติ', start_time: '08:30', end_time: '17:30', is_flexible: false, break_minutes: 60, work_hours: 8, is_active: true },
  { code: 'EARLY', name_en: 'Early Shift', name_th: 'กะเช้า', start_time: '07:00', end_time: '16:00', is_flexible: false, break_minutes: 60, work_hours: 8, is_active: true },
  { code: 'LATE', name_en: 'Late Shift', name_th: 'กะบ่าย', start_time: '10:00', end_time: '19:00', is_flexible: false, break_minutes: 60, work_hours: 8, is_active: true },
  { code: 'NIGHT', name_en: 'Night Shift', name_th: 'กะกลางคืน', start_time: '22:00', end_time: '06:00', is_flexible: false, break_minutes: 60, work_hours: 8, is_active: true },
  { code: 'FLX', name_en: 'Flexible Hours', name_th: 'เวลายืดหยุ่น', start_time: '07:00', end_time: '19:00', is_flexible: true, break_minutes: 60, work_hours: 8, is_active: true },
  { code: 'STORE', name_en: 'Store Hours', name_th: 'เวลาร้านค้า', start_time: '09:30', end_time: '20:30', is_flexible: false, break_minutes: 60, work_hours: 9, is_active: true },
];

// ---------------------------------------------------------------------------
// Attendance records from MockAttendanceData.attendanceRecords
// ---------------------------------------------------------------------------

const attendanceRecords = [
  { employee_id: 'EMP001', date: new Date('2026-01-02'), shift_code: 'REG', scheduled_start: '08:30', scheduled_end: '17:30', actual_check_in: '08:25', actual_check_out: '17:35', check_in_source: 'MAIN_OFFICE', check_in_location: 'Silom Tower, Floor 25', check_out_source: 'MAIN_OFFICE', check_out_location: 'Silom Tower, Floor 25', working_hours: 8.17, overtime_hours: 0, is_late: false, late_minutes: 0, is_early_departure: false, early_minutes: 0, status: 'present', anomalies: [] as string[] },
  { employee_id: 'EMP001', date: new Date('2026-01-03'), shift_code: 'REG', scheduled_start: '08:30', scheduled_end: '17:30', actual_check_in: '08:52', actual_check_out: '17:30', check_in_source: 'MOBILE_APP', check_in_location: 'Mobile GPS - Silom Area', check_out_source: 'MAIN_OFFICE', check_out_location: 'Silom Tower, Floor 25', working_hours: 7.63, overtime_hours: 0, is_late: true, late_minutes: 22, is_early_departure: false, early_minutes: 0, status: 'present', anomalies: ['late_arrival'] },
  { employee_id: 'EMP001', date: new Date('2026-01-06'), shift_code: 'REG', scheduled_start: '08:30', scheduled_end: '17:30', actual_check_in: '08:30', actual_check_out: null, check_in_source: 'MAIN_OFFICE', check_in_location: 'Silom Tower, Floor 25', check_out_source: null, check_out_location: null, working_hours: null, overtime_hours: 0, is_late: false, late_minutes: 0, is_early_departure: false, early_minutes: 0, status: 'incomplete', anomalies: ['missing_checkout'] },
  { employee_id: 'EMP001', date: new Date('2026-01-07'), shift_code: 'REG', scheduled_start: '08:30', scheduled_end: '17:30', actual_check_in: '08:28', actual_check_out: '19:45', check_in_source: 'MAIN_OFFICE', check_in_location: 'Silom Tower, Floor 25', check_out_source: 'MAIN_OFFICE', check_out_location: 'Silom Tower, Floor 25', working_hours: 10.28, overtime_hours: 2.28, is_late: false, late_minutes: 0, is_early_departure: false, early_minutes: 0, status: 'present', anomalies: ['unapproved_ot'] },
  { employee_id: 'EMP001', date: new Date('2026-01-08'), shift_code: 'REG', scheduled_start: '08:30', scheduled_end: '17:30', actual_check_in: '08:30', actual_check_out: '16:45', check_in_source: 'MAIN_OFFICE', check_in_location: 'Silom Tower, Floor 25', check_out_source: 'MAIN_OFFICE', check_out_location: 'Silom Tower, Floor 25', working_hours: 7.25, overtime_hours: 0, is_late: false, late_minutes: 0, is_early_departure: true, early_minutes: 45, status: 'present', anomalies: ['early_departure'] },
  { employee_id: 'EMP_DR001', date: new Date('2026-01-02'), shift_code: 'FLX', scheduled_start: '07:00', scheduled_end: '19:00', actual_check_in: '09:30', actual_check_out: '18:30', check_in_source: 'MOBILE_APP', check_in_location: 'Mobile GPS - Home', check_out_source: 'MOBILE_APP', check_out_location: 'Mobile GPS - Home', working_hours: 8.0, overtime_hours: 0, is_late: false, late_minutes: 0, is_early_departure: false, early_minutes: 0, status: 'present', anomalies: [] as string[] },
  { employee_id: 'EMP_DR001', date: new Date('2026-01-03'), shift_code: 'FLX', scheduled_start: '07:00', scheduled_end: '19:00', actual_check_in: null, actual_check_out: null, check_in_source: null, check_in_location: null, check_out_source: null, check_out_location: null, working_hours: 0, overtime_hours: 0, is_late: false, late_minutes: 0, is_early_departure: false, early_minutes: 0, status: 'absent', anomalies: ['missing_checkin', 'missing_checkout'] },
  { employee_id: 'EMP_DR002', date: new Date('2026-01-02'), shift_code: 'REG', scheduled_start: '08:30', scheduled_end: '17:30', actual_check_in: '08:28', actual_check_out: '17:32', check_in_source: 'MAIN_OFFICE', check_in_location: 'Silom Tower, Floor 25', check_out_source: 'MAIN_OFFICE', check_out_location: 'Silom Tower, Floor 25', working_hours: 8.07, overtime_hours: 0, is_late: false, late_minutes: 0, is_early_departure: false, early_minutes: 0, status: 'present', anomalies: [] as string[] },
  { employee_id: 'EMP_DR002', date: new Date('2026-01-03'), shift_code: 'REG', scheduled_start: '08:30', scheduled_end: '17:30', actual_check_in: null, actual_check_out: null, check_in_source: null, check_in_location: null, check_out_source: null, check_out_location: null, working_hours: 0, overtime_hours: 0, is_late: false, late_minutes: 0, is_early_departure: false, early_minutes: 0, status: 'absent', anomalies: ['missing_checkin', 'missing_checkout'] },
  { employee_id: 'EMP_DR002', date: new Date('2026-01-06'), shift_code: 'REG', scheduled_start: '08:30', scheduled_end: '17:30', actual_check_in: null, actual_check_out: null, check_in_source: null, check_in_location: null, check_out_source: null, check_out_location: null, working_hours: 0, overtime_hours: 0, is_late: false, late_minutes: 0, is_early_departure: false, early_minutes: 0, status: 'absent', anomalies: ['missing_checkin', 'missing_checkout', 'consecutive_absence'] },
];

// Attendance config from MockAttendanceData.config
const attendanceConfig = {
  late_threshold_minutes: 15,
  early_departure_threshold_minutes: 30,
  overtime_approval_required: true,
  consecutive_absence_alert_days: 3,
  work_hours_per_day: 8,
  break_minutes: 60,
};

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

export async function seedAttendance() {
  // Seed shifts
  console.log('Seeding shifts...');
  const shiftIdMap: Record<string, string> = {};
  for (const shift of shifts) {
    const record = await prisma.shift.upsert({
      where: { code: shift.code },
      create: shift,
      update: shift,
    });
    shiftIdMap[shift.code] = record.id;
  }
  console.log(`  Seeded ${shifts.length} shifts`);

  // Seed attendance records
  console.log('Seeding attendance records...');
  for (const rec of attendanceRecords) {
    const shiftId = shiftIdMap[rec.shift_code] || null;
    const { shift_code, ...data } = rec;
    await prisma.attendanceRecord.upsert({
      where: {
        employee_id_date: {
          employee_id: data.employee_id,
          date: data.date,
        },
      },
      create: { ...data, shift_id: shiftId },
      update: { ...data, shift_id: shiftId },
    });
  }
  console.log(`  Seeded ${attendanceRecords.length} attendance records`);

  // Seed attendance config
  console.log('Seeding attendance config...');
  const existingConfig = await prisma.attendanceConfig.findFirst();
  if (existingConfig) {
    await prisma.attendanceConfig.update({
      where: { id: existingConfig.id },
      data: attendanceConfig,
    });
  } else {
    await prisma.attendanceConfig.create({ data: attendanceConfig });
  }
  console.log('  Seeded attendance config');
}

if (require.main === module) {
  seedAttendance()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

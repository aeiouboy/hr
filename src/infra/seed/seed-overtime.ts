/**
 * Seed Overtime Data
 * Migrates mock-overtime.js to time-attendance Prisma schema (OvertimeRequest model)
 */
import { PrismaClient } from '../../services/time-attendance/generated/prisma';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// OT Requests from MockOvertimeData.otRequests
// ---------------------------------------------------------------------------

const otRequests = [
  {
    employee_id: 'EMP_ENG001',
    date: new Date('2026-01-08'),
    day_type: 'weekday',
    start_time: '18:00',
    end_time: '21:00',
    hours: 3,
    ot_type: 'weekday',
    rate: 1.5,
    hourly_rate: 250,
    amount: 1125,
    has_night_premium: false,
    night_hours: 0,
    night_premium_amount: 0,
    total_amount: 1125,
    reason: 'System maintenance and deployment',
    work_description: 'Completed server maintenance and deployed new application version',
    pre_approved: true,
    status: 'approved',
    submitted_at: new Date('2026-01-07T09:00:00'),
    approved_at: new Date('2026-01-07T14:30:00'),
    approved_by: 'EMP_SUP002',
    post_confirmed: true,
    post_confirmed_at: new Date('2026-01-09T09:00:00'),
  },
  {
    employee_id: 'EMP_ENG001',
    date: new Date('2026-01-11'),
    day_type: 'weekend',
    start_time: '09:00',
    end_time: '15:00',
    hours: 6,
    ot_type: 'weekend',
    rate: 2.0,
    hourly_rate: 250,
    amount: 3000,
    has_night_premium: false,
    night_hours: 0,
    night_premium_amount: 0,
    total_amount: 3000,
    reason: 'Urgent client project deadline',
    work_description: 'Complete client presentation materials and demo preparation',
    pre_approved: true,
    status: 'pending',
    submitted_at: new Date('2026-01-09T10:00:00'),
    approved_at: null,
    approved_by: null,
    post_confirmed: false,
    post_confirmed_at: null,
  },
  {
    employee_id: 'EMP_ENG001',
    date: new Date('2025-12-25'),
    day_type: 'holiday',
    start_time: '10:00',
    end_time: '18:00',
    hours: 8,
    ot_type: 'holiday',
    rate: 3.0,
    hourly_rate: 250,
    amount: 6000,
    has_night_premium: false,
    night_hours: 0,
    night_premium_amount: 0,
    total_amount: 6000,
    reason: 'Emergency production issue',
    work_description: 'Resolved critical production database issue',
    pre_approved: false,
    status: 'approved',
    submitted_at: new Date('2025-12-26T08:00:00'),
    approved_at: new Date('2025-12-26T10:00:00'),
    approved_by: 'EMP_SUP002',
    post_confirmed: true,
    post_confirmed_at: new Date('2025-12-27T09:00:00'),
  },
  {
    employee_id: 'EMP_ENG001',
    date: new Date('2026-01-06'),
    day_type: 'weekday',
    start_time: '18:00',
    end_time: '22:30',
    hours: 4.5,
    ot_type: 'weekday',
    rate: 1.5,
    hourly_rate: 250,
    amount: 1687.50,
    has_night_premium: true,
    night_hours: 0.5,
    night_premium_amount: 62.50,
    total_amount: 1750,
    reason: 'Month-end report preparation',
    work_description: 'Prepared financial reports and reconciliation',
    pre_approved: true,
    status: 'completed',
    submitted_at: new Date('2026-01-05T15:00:00'),
    approved_at: new Date('2026-01-05T16:30:00'),
    approved_by: 'EMP_SUP002',
    post_confirmed: true,
    post_confirmed_at: new Date('2026-01-07T09:00:00'),
  },
  {
    employee_id: 'EMP_ENG001',
    date: new Date('2026-01-03'),
    day_type: 'weekday',
    start_time: '18:00',
    end_time: '20:00',
    hours: 2,
    ot_type: 'weekday',
    rate: 1.5,
    hourly_rate: 250,
    amount: 750,
    has_night_premium: false,
    night_hours: 0,
    night_premium_amount: 0,
    total_amount: 750,
    reason: 'Team meeting and planning',
    work_description: 'Quarterly planning meeting with regional team',
    pre_approved: true,
    status: 'rejected',
    submitted_at: new Date('2026-01-02T14:00:00'),
    approved_at: null,
    approved_by: null,
    rejected_at: new Date('2026-01-03T09:00:00'),
    rejected_by: 'EMP_SUP002',
    rejection_reason: 'Meeting can be rescheduled to normal working hours',
    post_confirmed: false,
    post_confirmed_at: null,
  },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

export async function seedOvertime() {
  console.log('Seeding overtime requests...');
  // Clear and recreate for idempotency
  await prisma.overtimeRequest.deleteMany({});

  for (const ot of otRequests) {
    await prisma.overtimeRequest.create({ data: ot });
  }
  console.log(`  Seeded ${otRequests.length} overtime requests`);
}

if (require.main === module) {
  seedOvertime()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

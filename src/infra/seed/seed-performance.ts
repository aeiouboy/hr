/**
 * Seed Performance & Talent Data
 * Migrates mock-talent.js, mock-succession.js, mock-idp.js
 * to performance-talent Prisma schema
 */
import { PrismaClient } from '../../services/performance-talent/generated/prisma';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Competencies (synthetic based on Central Group context)
// ---------------------------------------------------------------------------

const competencies = [
  { name: 'Customer Focus', category: 'core', description: 'Demonstrates commitment to understanding and meeting customer needs', levels: [{ level: 1, label: 'Basic', description: 'Understands customer needs' }, { level: 2, label: 'Intermediate', description: 'Proactively addresses customer needs' }, { level: 3, label: 'Advanced', description: 'Anticipates and shapes customer experience' }, { level: 4, label: 'Expert', description: 'Drives customer-centric culture' }], is_active: true },
  { name: 'Innovation & Agility', category: 'core', description: 'Embraces change and drives innovation in work processes', levels: [{ level: 1, label: 'Basic', description: 'Open to new ideas' }, { level: 2, label: 'Intermediate', description: 'Proposes improvements' }, { level: 3, label: 'Advanced', description: 'Leads innovation initiatives' }, { level: 4, label: 'Expert', description: 'Transforms business through innovation' }], is_active: true },
  { name: 'Collaboration', category: 'core', description: 'Works effectively across teams and functions', levels: [{ level: 1, label: 'Basic', description: 'Works well in team' }, { level: 2, label: 'Intermediate', description: 'Facilitates cross-team collaboration' }, { level: 3, label: 'Advanced', description: 'Builds strategic partnerships' }, { level: 4, label: 'Expert', description: 'Creates collaborative ecosystem' }], is_active: true },
  { name: 'People Leadership', category: 'leadership', description: 'Develops and inspires team members to achieve their potential', levels: [{ level: 1, label: 'Basic', description: 'Provides clear direction' }, { level: 2, label: 'Intermediate', description: 'Coaches and develops others' }, { level: 3, label: 'Advanced', description: 'Builds high-performing teams' }, { level: 4, label: 'Expert', description: 'Develops future leaders' }], is_active: true },
  { name: 'Strategic Thinking', category: 'leadership', description: 'Sees the big picture and aligns actions with organizational strategy', levels: [{ level: 1, label: 'Basic', description: 'Understands strategy' }, { level: 2, label: 'Intermediate', description: 'Aligns work to strategy' }, { level: 3, label: 'Advanced', description: 'Contributes to strategy' }, { level: 4, label: 'Expert', description: 'Shapes organizational strategy' }], is_active: true },
  { name: 'Product Management', category: 'functional', description: 'Ability to define, develop, and deliver successful products', levels: [{ level: 1, label: 'Basic', description: 'Understands product lifecycle' }, { level: 2, label: 'Intermediate', description: 'Manages product features' }, { level: 3, label: 'Advanced', description: 'Drives product strategy' }, { level: 4, label: 'Expert', description: 'Defines product vision' }], is_active: true },
  { name: 'Technical Excellence', category: 'functional', description: 'Deep expertise in relevant technical domains', levels: [{ level: 1, label: 'Basic', description: 'Has foundational skills' }, { level: 2, label: 'Intermediate', description: 'Applies skills independently' }, { level: 3, label: 'Advanced', description: 'Recognized technical expert' }, { level: 4, label: 'Expert', description: 'Industry thought leader' }], is_active: true },
];

// ---------------------------------------------------------------------------
// Goals from typical HRMS goal data
// ---------------------------------------------------------------------------

const goals = [
  { employee_id: 'EMP001', title: 'Launch NextGen HRMS Phase 1', description: 'Successfully deliver employee self-service modules for the new HR platform', category: 'business', weight: 40, target_value: 100, actual_value: 85, unit: 'percent', status: 'active', progress: 85, start_date: new Date('2025-07-01'), due_date: new Date('2026-03-31'), period: '2025-H2' },
  { employee_id: 'EMP001', title: 'Team Development & ProNext Program', description: 'Successfully mentor 2 ProNext trainees through onboarding and probation', category: 'development', weight: 30, target_value: 2, actual_value: 2, unit: 'trainees', status: 'active', progress: 90, start_date: new Date('2025-07-01'), due_date: new Date('2026-01-31'), period: '2025-H2' },
  { employee_id: 'EMP001', title: 'Stakeholder Satisfaction Score', description: 'Achieve 4.5+ average stakeholder satisfaction score for product delivery', category: 'business', weight: 20, target_value: 4.5, actual_value: 4.3, unit: 'score', status: 'active', progress: 75, start_date: new Date('2025-07-01'), due_date: new Date('2026-06-30'), period: '2025-H2' },
  { employee_id: 'EMP001', title: 'AWS Solutions Architect Certification', description: 'Obtain AWS Solutions Architect Professional certification', category: 'personal', weight: 10, target_value: 1, actual_value: 0, unit: 'certification', status: 'active', progress: 40, start_date: new Date('2025-10-01'), due_date: new Date('2026-06-30'), period: '2025-H2' },
];

// ---------------------------------------------------------------------------
// Evaluations
// ---------------------------------------------------------------------------

const evaluations = [
  {
    employee_id: 'EMP001',
    evaluator_id: 'EMP_SUP001',
    period: '2025-H1',
    type: 'mid_year',
    status: 'completed',
    self_rating: 4.2,
    manager_rating: 4.0,
    final_rating: 4.1,
    self_comments: 'Successfully delivered key milestones for the HRMS project and established the product roadmap.',
    manager_comments: 'Chongrak has shown strong product leadership. Area of improvement: stakeholder communication.',
    strengths: 'Product vision, technical understanding, team mentoring',
    improvements: 'Cross-functional stakeholder management, presentation skills',
    submitted_at: new Date('2025-07-15'),
    completed_at: new Date('2025-07-25'),
  },
];

// ---------------------------------------------------------------------------
// Talent profiles
// ---------------------------------------------------------------------------

const talentProfiles = [
  {
    employee_id: 'EMP001',
    performance_rating: 4.1,
    potential_rating: 4.5,
    nine_box_position: 'star',
    risk_of_leaving: 'low',
    impact_of_leaving: 'high',
    career_aspiration: 'Head of Product within 3 years',
    mobility: 'limited',
    key_strengths: ['Product strategy', 'Technical depth', 'Team development'],
    development_areas: ['Executive presentation', 'Financial acumen', 'Cross-BU influence'],
    last_calibration: new Date('2025-08-01'),
  },
  {
    employee_id: 'EMP_SUP001',
    performance_rating: 4.3,
    potential_rating: 4.0,
    nine_box_position: 'high_performer',
    risk_of_leaving: 'medium',
    impact_of_leaving: 'high',
    career_aspiration: 'CTO or VP Engineering',
    mobility: 'open',
    key_strengths: ['Product leadership', 'Organizational building', 'Strategic alignment'],
    development_areas: ['Digital transformation', 'International experience'],
    last_calibration: new Date('2025-08-01'),
  },
];

// ---------------------------------------------------------------------------
// Succession plans
// ---------------------------------------------------------------------------

const successionPlans = [
  {
    position_id: 'P002',
    position_title: 'Head of Product',
    department: 'Product Management',
    incumbent_id: 'EMP_SUP001',
    criticality: 'high',
    status: 'active',
    successors: [
      { employee_id: 'EMP001', readiness: 'ready_1_2_years', development_gaps: ['Strategic planning', 'Budget management'], development_actions: ['Leadership program', 'Finance for non-finance'] },
    ],
  },
  {
    position_id: 'P001',
    position_title: 'Chief Technology Officer',
    department: 'Technology Division',
    incumbent_id: 'EMP_L2',
    criticality: 'critical',
    status: 'active',
    successors: [
      { employee_id: 'EMP_SUP002', readiness: 'ready_1_2_years', development_gaps: ['Board-level communication', 'Global partnerships'], development_actions: ['Executive coaching', 'Board presentation practice'] },
      { employee_id: 'EMP_L3', readiness: 'ready_now', development_gaps: [], development_actions: ['Shadow CTO for 6 months'] },
    ],
  },
];

// ---------------------------------------------------------------------------
// IDP Plans
// ---------------------------------------------------------------------------

const idpPlans = [
  {
    employee_id: 'EMP001',
    title: 'Path to Head of Product',
    status: 'active',
    period: '2025-2026',
    development_areas: [
      { area: 'Strategic Planning', current_level: 2, target_level: 4 },
      { area: 'Financial Acumen', current_level: 1, target_level: 3 },
      { area: 'Executive Communication', current_level: 2, target_level: 4 },
    ],
    action_items: [
      { title: 'Complete Leadership Essentials program', type: 'training', status: 'completed', due_date: '2025-06-30' },
      { title: 'Lead cross-functional initiative', type: 'experience', status: 'in_progress', due_date: '2026-03-31' },
      { title: 'Obtain AWS certification', type: 'certification', status: 'in_progress', due_date: '2026-06-30' },
      { title: 'Finance for Non-Finance workshop', type: 'training', status: 'planned', due_date: '2026-06-30' },
    ],
    milestones: [
      { title: 'Complete leadership training', target_date: '2025-06-30', status: 'completed' },
      { title: 'Lead HRMS project end-to-end', target_date: '2026-03-31', status: 'in_progress' },
      { title: 'Present to executive committee', target_date: '2026-06-30', status: 'planned' },
    ],
    mentor_id: 'EMP_SUP001',
    approved_by: 'EMP_SUP001',
    approved_at: new Date('2025-07-15'),
    signed_by_employee: true,
    signed_by_manager: true,
  },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

export async function seedPerformance() {
  // Seed competencies
  console.log('Seeding competencies...');
  await prisma.competency.deleteMany({});
  const compIdMap: Record<string, string> = {};
  for (const comp of competencies) {
    const record = await prisma.competency.create({ data: comp });
    compIdMap[comp.name] = record.id;
  }
  console.log(`  Seeded ${competencies.length} competencies`);

  // Seed goals
  console.log('Seeding goals...');
  await prisma.goal.deleteMany({});
  for (const goal of goals) {
    await prisma.goal.create({ data: goal });
  }
  console.log(`  Seeded ${goals.length} goals`);

  // Seed evaluations
  console.log('Seeding evaluations...');
  await prisma.evaluationScore.deleteMany({});
  await prisma.evaluation.deleteMany({});
  for (const evalData of evaluations) {
    await prisma.evaluation.create({ data: evalData });
  }
  console.log(`  Seeded ${evaluations.length} evaluations`);

  // Seed talent profiles
  console.log('Seeding talent profiles...');
  for (const tp of talentProfiles) {
    await prisma.talentProfile.upsert({
      where: { employee_id: tp.employee_id },
      create: tp,
      update: tp,
    });
  }
  console.log(`  Seeded ${talentProfiles.length} talent profiles`);

  // Seed succession plans
  console.log('Seeding succession plans...');
  await prisma.successor.deleteMany({});
  await prisma.successionPlan.deleteMany({});
  for (const sp of successionPlans) {
    const { successors, ...planData } = sp;
    const plan = await prisma.successionPlan.create({ data: planData });
    for (const succ of successors) {
      await prisma.successor.create({
        data: { succession_plan_id: plan.id, ...succ },
      });
    }
  }
  console.log(`  Seeded ${successionPlans.length} succession plans`);

  // Seed IDP plans
  console.log('Seeding IDP plans...');
  await prisma.iDPPlan.deleteMany({});
  for (const idp of idpPlans) {
    await prisma.iDPPlan.create({ data: idp });
  }
  console.log(`  Seeded ${idpPlans.length} IDP plans`);
}

if (require.main === module) {
  seedPerformance()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

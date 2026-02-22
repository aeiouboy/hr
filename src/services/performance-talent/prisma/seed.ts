import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Seed Competencies (CG Competency Model - 6 core competencies)
  const competencies = [
    {
      name: 'Leadership',
      category: 'core',
      description: 'Ability to lead, inspire and develop teams',
      levels: [
        { level: 1, label: 'Basic', description: 'Understands leadership fundamentals' },
        { level: 2, label: 'Developing', description: 'Leads small teams effectively' },
        { level: 3, label: 'Proficient', description: 'Leads cross-functional teams' },
        { level: 4, label: 'Advanced', description: 'Shapes organizational direction' },
        { level: 5, label: 'Expert', description: 'Recognized industry leader' },
      ],
    },
    {
      name: 'Communication',
      category: 'core',
      description: 'Effective verbal and written communication',
      levels: [
        { level: 1, label: 'Basic', description: 'Communicates clearly in routine situations' },
        { level: 2, label: 'Developing', description: 'Adapts communication to audience' },
        { level: 3, label: 'Proficient', description: 'Influences through communication' },
        { level: 4, label: 'Advanced', description: 'Drives organizational messaging' },
        { level: 5, label: 'Expert', description: 'Thought leader and spokesperson' },
      ],
    },
    {
      name: 'Data Analysis',
      category: 'functional',
      description: 'Ability to analyze data and derive insights',
      levels: [
        { level: 1, label: 'Basic', description: 'Understands basic data concepts' },
        { level: 2, label: 'Developing', description: 'Performs standard analyses' },
        { level: 3, label: 'Proficient', description: 'Creates actionable insights' },
        { level: 4, label: 'Advanced', description: 'Designs analytics frameworks' },
        { level: 5, label: 'Expert', description: 'Pioneers data-driven strategy' },
      ],
    },
    {
      name: 'Project Management',
      category: 'functional',
      description: 'Planning, executing and delivering projects',
      levels: [
        { level: 1, label: 'Basic', description: 'Manages simple tasks' },
        { level: 2, label: 'Developing', description: 'Manages small projects' },
        { level: 3, label: 'Proficient', description: 'Manages complex projects' },
        { level: 4, label: 'Advanced', description: 'Manages program portfolios' },
        { level: 5, label: 'Expert', description: 'Transforms project methodology' },
      ],
    },
    {
      name: 'Customer Focus',
      category: 'core',
      description: 'Understanding and meeting customer needs',
      levels: [
        { level: 1, label: 'Basic', description: 'Responds to customer requests' },
        { level: 2, label: 'Developing', description: 'Anticipates customer needs' },
        { level: 3, label: 'Proficient', description: 'Designs customer experiences' },
        { level: 4, label: 'Advanced', description: 'Shapes customer strategy' },
        { level: 5, label: 'Expert', description: 'Industry CX benchmark' },
      ],
    },
    {
      name: 'Innovation',
      category: 'core',
      description: 'Creative thinking and driving change',
      levels: [
        { level: 1, label: 'Basic', description: 'Suggests improvements' },
        { level: 2, label: 'Developing', description: 'Implements new approaches' },
        { level: 3, label: 'Proficient', description: 'Drives innovation initiatives' },
        { level: 4, label: 'Advanced', description: 'Creates innovation culture' },
        { level: 5, label: 'Expert', description: 'Disrupts industry norms' },
      ],
    },
  ];

  for (const comp of competencies) {
    await prisma.competency.create({ data: comp });
  }

  // Seed sample goals
  await prisma.goal.create({
    data: {
      employee_id: 'EMP001',
      title: 'Increase Sales Revenue by 20%',
      description: 'Achieve 20% YoY growth in regional sales',
      category: 'business',
      weight: 40,
      target_value: 20,
      unit: 'percent',
      status: 'active',
      progress: 35,
      period: '2024-H1',
      start_date: new Date('2024-01-01'),
      due_date: new Date('2024-06-30'),
    },
  });

  // Seed talent profile
  await prisma.talentProfile.create({
    data: {
      employee_id: 'EMP001',
      performance_rating: 4.2,
      potential_rating: 4.5,
      nine_box_position: 'star',
      risk_of_leaving: 'low',
      impact_of_leaving: 'high',
      career_aspiration: 'Executive Leadership',
      mobility: 'open',
      key_strengths: ['Strategic thinking', 'Team leadership', 'Data-driven decisions'],
      development_areas: ['Financial acumen', 'Cross-functional experience'],
    },
  });

  // Seed succession plan
  const plan = await prisma.successionPlan.create({
    data: {
      position_id: 'POS-VP-OPS',
      position_title: 'VP of Operations',
      department: 'Operations',
      incumbent_id: 'EMP100',
      criticality: 'critical',
    },
  });

  await prisma.successor.create({
    data: {
      succession_plan_id: plan.id,
      employee_id: 'EMP001',
      readiness: 'ready_1_2_years',
      development_gaps: ['P&L management', 'Board presentation skills'],
      development_actions: ['Assign to strategic project', 'Executive coaching program'],
    },
  });

  // Seed IDP plan
  await prisma.iDPPlan.create({
    data: {
      employee_id: 'EMP001',
      title: 'Leadership Development Plan 2024',
      status: 'active',
      period: '2024',
      development_areas: [
        { area: 'Leadership', current_level: 3, target_level: 4 },
        { area: 'Financial Acumen', current_level: 2, target_level: 3 },
      ],
      action_items: [
        { title: 'Complete Advanced Leadership Program', type: 'training', status: 'in_progress', due_date: '2024-06-30' },
        { title: 'Lead cross-functional project', type: 'assignment', status: 'not_started', due_date: '2024-09-30' },
      ],
      milestones: [
        { title: 'Complete leadership assessment', target_date: '2024-03-31', status: 'completed' },
        { title: 'Finish leadership course', target_date: '2024-06-30', status: 'in_progress' },
      ],
      mentor_id: 'MGR001',
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

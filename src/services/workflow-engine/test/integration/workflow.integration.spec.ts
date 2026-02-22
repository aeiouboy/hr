import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

/**
 * Integration tests for Workflow Engine microservice.
 * These tests run against a real database (test database via Prisma).
 * They will fail until the implementation and database setup is complete.
 */
describe('Workflow Engine Integration', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Clean test data
    await prisma.$executeRaw`DELETE FROM "approval_actions" WHERE workflow_id LIKE 'TEST_%'`;
    await prisma.$executeRaw`DELETE FROM "workflow_steps" WHERE workflow_id LIKE 'TEST_%'`;
    await prisma.$executeRaw`DELETE FROM "delegations" WHERE id LIKE 'TEST_%'`;
    await prisma.$executeRaw`DELETE FROM "workflows" WHERE id LIKE 'TEST_%'`;
  });

  it('should create a workflow and persist it in the database', async () => {
    const workflow = await prisma.workflow.create({
      data: {
        id: 'TEST_WF_001',
        change_type: 'personal_info_change',
        status: 'pending',
        requested_by: 'EMP001',
        requester_name: 'Test Employee',
        section: 'personalInfo',
        effective_date: new Date('2026-03-01'),
        current_step: 1,
        total_steps: 2,
        old_values: JSON.stringify({ name: 'Old' }),
        new_values: JSON.stringify({ name: 'New' }),
      },
    });

    expect(workflow.id).toBe('TEST_WF_001');

    const found = await prisma.workflow.findUnique({ where: { id: 'TEST_WF_001' } });
    expect(found).toBeDefined();
    expect(found!.change_type).toBe('personal_info_change');
    expect(found!.status).toBe('pending');
  });

  it('should create workflow steps linked to a workflow', async () => {
    await prisma.workflow.create({
      data: {
        id: 'TEST_WF_002',
        change_type: 'address_change',
        status: 'pending',
        requested_by: 'EMP001',
        requester_name: 'Test Employee',
        section: 'address',
        effective_date: new Date('2026-03-01'),
        current_step: 1,
        total_steps: 2,
        old_values: '{}',
        new_values: '{}',
      },
    });

    await prisma.workflowStep.create({
      data: {
        id: 'TEST_WFS_001',
        workflow_id: 'TEST_WF_002',
        step_number: 1,
        role: 'manager',
        role_name: 'Manager',
        approver_id: 'MGR001',
        approver_name: 'Test Manager',
        status: 'pending',
      },
    });

    await prisma.workflowStep.create({
      data: {
        id: 'TEST_WFS_002',
        workflow_id: 'TEST_WF_002',
        step_number: 2,
        role: 'hr_admin',
        role_name: 'HR Admin',
        approver_id: 'HR001',
        approver_name: 'Test HR Admin',
        status: 'pending',
      },
    });

    const steps = await prisma.workflowStep.findMany({
      where: { workflow_id: 'TEST_WF_002' },
      orderBy: { step_number: 'asc' },
    });

    expect(steps).toHaveLength(2);
    expect(steps[0].role).toBe('manager');
    expect(steps[1].role).toBe('hr_admin');
  });

  it('should record approval actions with timestamps', async () => {
    await prisma.workflow.create({
      data: {
        id: 'TEST_WF_003',
        change_type: 'personal_info_change',
        status: 'pending',
        requested_by: 'EMP001',
        requester_name: 'Test Employee',
        section: 'personalInfo',
        effective_date: new Date('2026-03-01'),
        current_step: 1,
        total_steps: 1,
        old_values: '{}',
        new_values: '{}',
      },
    });

    const action = await prisma.approvalAction.create({
      data: {
        id: 'TEST_AA_001',
        workflow_id: 'TEST_WF_003',
        step_number: 1,
        action: 'approve',
        performed_by: 'MGR001',
        performer_name: 'Test Manager',
        comments: 'Approved',
        performed_at: new Date(),
      },
    });

    expect(action.id).toBe('TEST_AA_001');
    expect(action.action).toBe('approve');
    expect(action.performed_at).toBeDefined();
  });

  it('should create and query delegations', async () => {
    const delegation = await prisma.delegation.create({
      data: {
        id: 'TEST_DEL_001',
        delegator_id: 'MGR001',
        delegator_name: 'Test Manager',
        delegate_id: 'MGR002',
        delegate_name: 'Delegate Manager',
        start_date: new Date('2026-03-01'),
        end_date: new Date('2026-03-15'),
        change_types: JSON.stringify(['personal_info_change']),
        status: 'active',
      },
    });

    expect(delegation.id).toBe('TEST_DEL_001');

    const activeDelegations = await prisma.delegation.findMany({
      where: {
        delegator_id: 'MGR001',
        status: 'active',
        start_date: { lte: new Date('2026-03-10') },
        end_date: { gte: new Date('2026-03-10') },
      },
    });

    expect(activeDelegations).toHaveLength(1);
    expect(activeDelegations[0].delegate_id).toBe('MGR002');
  });

  it('should cascade delete workflow steps when workflow is deleted', async () => {
    await prisma.workflow.create({
      data: {
        id: 'TEST_WF_004',
        change_type: 'address_change',
        status: 'pending',
        requested_by: 'EMP001',
        requester_name: 'Test',
        section: 'address',
        effective_date: new Date('2026-03-01'),
        current_step: 1,
        total_steps: 1,
        old_values: '{}',
        new_values: '{}',
      },
    });

    await prisma.workflowStep.create({
      data: {
        id: 'TEST_WFS_DEL_001',
        workflow_id: 'TEST_WF_004',
        step_number: 1,
        role: 'manager',
        role_name: 'Manager',
        approver_id: 'MGR001',
        approver_name: 'Test',
        status: 'pending',
      },
    });

    await prisma.workflow.delete({ where: { id: 'TEST_WF_004' } });

    const steps = await prisma.workflowStep.findMany({
      where: { workflow_id: 'TEST_WF_004' },
    });
    expect(steps).toHaveLength(0);
  });

  it('should filter workflows by status', async () => {
    await prisma.workflow.create({
      data: {
        id: 'TEST_WF_STAT_1',
        change_type: 'personal_info_change',
        status: 'pending',
        requested_by: 'EMP001',
        requester_name: 'Test',
        section: 'personalInfo',
        effective_date: new Date('2026-03-01'),
        current_step: 1,
        total_steps: 1,
        old_values: '{}',
        new_values: '{}',
      },
    });

    await prisma.workflow.create({
      data: {
        id: 'TEST_WF_STAT_2',
        change_type: 'address_change',
        status: 'approved',
        requested_by: 'EMP001',
        requester_name: 'Test',
        section: 'address',
        effective_date: new Date('2026-03-01'),
        current_step: 1,
        total_steps: 1,
        old_values: '{}',
        new_values: '{}',
        completed_at: new Date(),
      },
    });

    const pendingWorkflows = await prisma.workflow.findMany({
      where: { status: 'pending', id: { startsWith: 'TEST_WF_STAT_' } },
    });

    const approvedWorkflows = await prisma.workflow.findMany({
      where: { status: 'approved', id: { startsWith: 'TEST_WF_STAT_' } },
    });

    expect(pendingWorkflows).toHaveLength(1);
    expect(approvedWorkflows).toHaveLength(1);
  });

  it('should filter workflows by requested_by (employee)', async () => {
    await prisma.workflow.create({
      data: {
        id: 'TEST_WF_EMP_1',
        change_type: 'personal_info_change',
        status: 'pending',
        requested_by: 'EMP001',
        requester_name: 'Employee 1',
        section: 'personalInfo',
        effective_date: new Date('2026-03-01'),
        current_step: 1,
        total_steps: 1,
        old_values: '{}',
        new_values: '{}',
      },
    });

    await prisma.workflow.create({
      data: {
        id: 'TEST_WF_EMP_2',
        change_type: 'address_change',
        status: 'pending',
        requested_by: 'EMP002',
        requester_name: 'Employee 2',
        section: 'address',
        effective_date: new Date('2026-03-01'),
        current_step: 1,
        total_steps: 1,
        old_values: '{}',
        new_values: '{}',
      },
    });

    const emp1Workflows = await prisma.workflow.findMany({
      where: { requested_by: 'EMP001', id: { startsWith: 'TEST_WF_EMP_' } },
    });

    expect(emp1Workflows).toHaveLength(1);
    expect(emp1Workflows[0].requester_name).toBe('Employee 1');
  });

  it('should track complete approval flow from creation to completion', async () => {
    // Step 1: Create workflow
    const workflow = await prisma.workflow.create({
      data: {
        id: 'TEST_WF_FLOW',
        change_type: 'personal_info_change',
        status: 'pending',
        requested_by: 'EMP001',
        requester_name: 'Test Employee',
        section: 'personalInfo',
        effective_date: new Date('2026-03-01'),
        current_step: 1,
        total_steps: 2,
        old_values: JSON.stringify({ name: 'Old' }),
        new_values: JSON.stringify({ name: 'New' }),
      },
    });

    // Step 2: Create workflow steps
    await prisma.workflowStep.createMany({
      data: [
        {
          id: 'TEST_WFS_FLOW_1',
          workflow_id: 'TEST_WF_FLOW',
          step_number: 1,
          role: 'manager',
          role_name: 'Manager',
          approver_id: 'MGR001',
          approver_name: 'Manager',
          status: 'pending',
        },
        {
          id: 'TEST_WFS_FLOW_2',
          workflow_id: 'TEST_WF_FLOW',
          step_number: 2,
          role: 'hr_admin',
          role_name: 'HR Admin',
          approver_id: 'HR001',
          approver_name: 'HR Admin',
          status: 'pending',
        },
      ],
    });

    // Step 3: Manager approves step 1
    await prisma.workflowStep.update({
      where: { id: 'TEST_WFS_FLOW_1' },
      data: { status: 'approved', action_date: new Date() },
    });

    await prisma.approvalAction.create({
      data: {
        id: 'TEST_AA_FLOW_1',
        workflow_id: 'TEST_WF_FLOW',
        step_number: 1,
        action: 'approve',
        performed_by: 'MGR001',
        performer_name: 'Manager',
        performed_at: new Date(),
      },
    });

    await prisma.workflow.update({
      where: { id: 'TEST_WF_FLOW' },
      data: { current_step: 2 },
    });

    // Step 4: HR Admin approves step 2
    await prisma.workflowStep.update({
      where: { id: 'TEST_WFS_FLOW_2' },
      data: { status: 'approved', action_date: new Date() },
    });

    await prisma.approvalAction.create({
      data: {
        id: 'TEST_AA_FLOW_2',
        workflow_id: 'TEST_WF_FLOW',
        step_number: 2,
        action: 'approve',
        performed_by: 'HR001',
        performer_name: 'HR Admin',
        performed_at: new Date(),
      },
    });

    await prisma.workflow.update({
      where: { id: 'TEST_WF_FLOW' },
      data: { status: 'approved', completed_at: new Date() },
    });

    // Verify final state
    const completedWorkflow = await prisma.workflow.findUnique({
      where: { id: 'TEST_WF_FLOW' },
    });
    expect(completedWorkflow!.status).toBe('approved');
    expect(completedWorkflow!.completed_at).toBeDefined();

    const allSteps = await prisma.workflowStep.findMany({
      where: { workflow_id: 'TEST_WF_FLOW' },
      orderBy: { step_number: 'asc' },
    });
    expect(allSteps.every((s) => s.status === 'approved')).toBe(true);

    const auditActions = await prisma.approvalAction.findMany({
      where: { workflow_id: 'TEST_WF_FLOW' },
      orderBy: { performed_at: 'asc' },
    });
    expect(auditActions).toHaveLength(2);
    expect(auditActions[0].performed_by).toBe('MGR001');
    expect(auditActions[1].performed_by).toBe('HR001');
  });
});

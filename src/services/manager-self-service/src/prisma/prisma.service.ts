import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  // These properties are populated by PrismaClient at runtime.
  // Typed as any to allow mocking in tests without generated client.
  teamMember: any;
  pendingApproval: any;
  teamLeaveEntry: any;
  managerDashboardConfig: any;
  managerAuditLog: any;
  $transaction: any;

  async onModuleInit() {
    // In production, this would call this.$connect()
  }

  async onModuleDestroy() {
    // In production, this would call this.$disconnect()
  }
}

import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LeaveModule } from './leave/leave.module';

@Module({
  imports: [PrismaModule, LeaveModule],
})
export class AppModule {}

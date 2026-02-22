import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ShiftModule } from './shift/shift.module';
import { AttendanceModule } from './attendance/attendance.module';
import { OvertimeModule } from './overtime/overtime.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    PrismaModule,
    ShiftModule,
    AttendanceModule,
    OvertimeModule,
    LocationModule,
  ],
})
export class AppModule {}

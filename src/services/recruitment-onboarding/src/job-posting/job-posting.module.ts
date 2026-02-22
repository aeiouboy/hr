import { Module } from '@nestjs/common';
import { JobPostingController } from './job-posting.controller';
import { JobPostingService } from './job-posting.service';

@Module({
  controllers: [JobPostingController],
  providers: [JobPostingService],
  exports: [JobPostingService],
})
export class JobPostingModule {}

import { Module } from '@nestjs/common';
import { KillsService } from './kills.service';
import { KillsController } from './kills.controller';

@Module({
  providers: [KillsService],
  controllers: [KillsController]
})
export class KillsModule {}

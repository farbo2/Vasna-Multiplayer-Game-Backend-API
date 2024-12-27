import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';
import { QuestsRepository } from './quests.repository';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@Module({
  providers: [QuestsService, QuestsRepository, JwtAuthGuard],
  controllers: [QuestsController],
})
export class QuestsModule {}

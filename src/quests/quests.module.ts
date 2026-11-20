import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { Quest } from './entities/quest.entity';
import { UserQuest } from './entities/user-quest.entity';
import { QuestsController } from './quests.controller';
import { QuestsService } from './quests.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quest, UserQuest])],
  providers: [QuestsService, JwtAuthGuard],
  controllers: [QuestsController],
})
export class QuestsModule {}

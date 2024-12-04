import { Module } from '@nestjs/common';
import { ClanQuestsService } from './clan-quests.service';
import { ClanQuestsController } from './clan-quests.controller';
import { ClanQuestRepository } from './clan-quests.repository';
import { CurrentClanQuestRepository } from './current-clan-quest.repository';
import { ClanQuestContributionRepository } from './clan-quest-contribution.repository';
import { ClanQuest } from './entities/clan-quest.entity';
import { CurrentClanQuest } from './entities/current-clan-quest.entity';
import { ClanQuestContribution } from './entities/clan-quest-contribution.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClanQuest,
      CurrentClanQuest,
      ClanQuestContribution,
    ]),
  ],
  providers: [
    ClanQuestsService,
    ClanQuestRepository,
    CurrentClanQuestRepository,
    ClanQuestContributionRepository,
  ],
  controllers: [ClanQuestsController],
})
export class ClanQuestsModule {}

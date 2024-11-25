import { Module } from '@nestjs/common';
import { ClanQuestsService } from './clan-quests.service';
import { ClanQuestsController } from './clan-quests.controller';

@Module({
  providers: [ClanQuestsService],
  controllers: [ClanQuestsController]
})
export class ClanQuestsModule {}

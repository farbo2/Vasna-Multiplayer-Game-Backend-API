import { AdminGuard } from '../guards/jwt-auth/admin.guard';
import { Module } from '@nestjs/common';
import { BattlePassService } from './battle-pass.service';
import { BattlePassController } from './battle-pass.controller';
import { BattlePassRepository } from './battle-pass.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattlePass } from './entities/battle-pass.entity';
import { BattlePassProgress } from './entities/battle-pass-progress.entity';
import { BattlePassLevel } from './entities/battle-pass-level.entity';
import { BattlePassInventory } from './entities/battle-pass-inventory.entity';
import { BattlePassProgressRepository } from './battle-pass-progress.repository';
import { BattlePassLevelRepository } from './battle-pass-level.repository';
import { BattlePassInventoryRepository } from './battle-pass-inventory.repository';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BattlePass,
      BattlePassProgress,
      BattlePassLevel,
      BattlePassInventory,
    ]),
  ],
  providers: [AdminGuard, 
    BattlePassService,
    BattlePassRepository,
    BattlePassProgressRepository,
    BattlePassLevelRepository,
    BattlePassInventoryRepository,
    JwtAuthGuard,
  ],
  controllers: [BattlePassController],
})
export class BattlePassModule {}

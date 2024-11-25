import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';
import { MovesModule } from './moves/moves.module';
import { ClansModule } from './clans/clans.module';
import { ClanQuestsModule } from './clan-quests/clan-quests.module';
import { FriendsModule } from './friends/friends.module';
import { PrivateMessagesModule } from './private-messages/private-messages.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CardsModule } from './cards/cards.module';
import { CampaignModule } from './campaign/campaign.module';
import { QuestsModule } from './quests/quests.module';
import { NewsModule } from './news/news.module';
import { ProductsModule } from './products/products.module';
import { BattlePassModule } from './battle-pass/battle-pass.module';
import { KillsModule } from './kills/kills.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattlePass } from './battle-pass/entities/battle-pass.entity';
import { BattlePassLevel } from './battle-pass/entities/battle-pass-level.entity';
import { BattlePassProgress } from './battle-pass/entities/battle-pass-progress.entity';
import { BattlePassInventory } from './battle-pass/entities/battle-pass-inventory.entity';
import { Campaign } from './campaign/entities/campaign.entity';
import { UserCampaign } from './campaign/entities/user-campaign.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'koochehkhalvat',
      entities: [
        BattlePass,
        BattlePassLevel,
        BattlePassProgress,
        BattlePassInventory,
        Campaign,
        UserCampaign,
      ],
      synchronize: true,
    }),
    UsersModule,
    MatchesModule,
    MovesModule,
    ClansModule,
    ClanQuestsModule,
    FriendsModule,
    PrivateMessagesModule,
    NotificationsModule,
    CardsModule,
    CampaignModule,
    QuestsModule,
    NewsModule,
    ProductsModule,
    BattlePassModule,
    KillsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

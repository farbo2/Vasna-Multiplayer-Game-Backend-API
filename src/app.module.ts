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
import { CurrentClanQuest } from './clan-quests/entities/current-clan-quest.entity';
import { ClanQuestContribution } from './clan-quests/entities/clan-quest-contribution.entity';
import { Friend } from './friends/entities/friend.entity';
import { Kill } from './kills/entities/kill.entity';
import { Match } from './matches/entities/match.entity';
import { Move } from './moves/entities/move.entity';
import { News } from './news/entities/news.entity';
import { NewsStatus } from './news/entities/news-status.entity';
import { PrivateMessage } from './private-messages/entities/private-message.entity';
import { Product } from './products/entities/Product.entity';
import { ProductCategory } from './products/entities/product-category.entity';
import { UserPurchase } from './products/entities/user-purchase.entity';
import { Quest } from './quests/entities/quest.entity';
import { UserQuest } from './quests/entities/user-quest.entity';
import { ClanQuest } from './clan-quests/entities/clan-quest.entity';
import { GameGateway } from './game/game.gateway';
import { Notification } from './notifications/entities/notification.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'koochehkhalvat',
      username: 'farbod',
      password: '123400',
      autoLoadEntities: true,
      entities: [
        BattlePass,
        BattlePassLevel,
        BattlePassProgress,
        BattlePassInventory,
        Campaign,
        UserCampaign,
        ClanQuest,
        CurrentClanQuest,
        ClanQuestContribution,
        Friend,
        Kill,
        Match,
        Move,
        News,
        NewsStatus,
        Notification,
        PrivateMessage,
        Product,
        ProductCategory,
        UserPurchase,
        Quest,
        UserQuest,
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
  providers: [AppService, GameGateway],
})
export class AppModule {}

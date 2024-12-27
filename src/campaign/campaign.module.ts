import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { UserCampaign } from './entities/user-campaign.entity';
import { Campaign } from './entities/campaign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCampaignRepository } from './user-campaign.repository';
import { CampaignRepository } from './campaign.repository';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, UserCampaign])],
  providers: [
    CampaignService,
    UserCampaignRepository,
    CampaignRepository,
    JwtAuthGuard,
  ],
  controllers: [CampaignController],
})
export class CampaignModule {}

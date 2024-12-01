import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserCampaign } from './entities/user-campaign.entity';

@Injectable()
export class UserCampaignRepository extends Repository<UserCampaign> {
  constructor(private dataSource: DataSource) {
    super(UserCampaign, dataSource.createEntityManager());
  }
  async deleteUserCampaign(id: number): Promise<void> {
    // Check if User Campaign Exists
    const userCampaign = await this.findOne({
      where: { id },
    });
    if (!userCampaign) {
      throw new Error(`User Campaign with ID ${id} not found`);
    }

    // Remove User Campaign
    await this.remove(userCampaign);
  }

  async findUserCampaignById(id: number): Promise<UserCampaign> {
    return this.findOne({ where: { id } });
  }

  async findUserCampaignByCampaignId(
    userId: number,
    campaignId: number,
  ): Promise<UserCampaign> {
    return this.findOne({ where: { userId, campaignId } });
  }

  async updateUserCampaign(
    id: number,
    updateData: Partial<UserCampaign>,
  ): Promise<UserCampaign> {
    // Find User Campaign
    const userCampaign = await this.findOne({ where: { id } });
    if (!userCampaign) {
      throw new Error(`Campaign with ID ${id} not found`);
    }

    // Update User Campaign
    Object.assign(userCampaign, updateData);

    // Save to Database
    return this.save(userCampaign);
  }
}

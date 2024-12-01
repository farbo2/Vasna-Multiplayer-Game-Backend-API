import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignRepository extends Repository<Campaign> {
  constructor(private dataSource: DataSource) {
    super(Campaign, dataSource.createEntityManager());
  }

  async findAllCampaigns(): Promise<Campaign[]> {
    return this.find();
  }

  async findCampaignById(id: number): Promise<Campaign> {
    return this.findOne({ where: { id } });
  }

  async updateCampaign(
    id: number,
    updateData: Partial<Campaign>,
  ): Promise<Campaign> {
    // Find Campaign
    const campaign = await this.findOne({ where: { id } });
    if (!campaign) {
      throw new Error(`Campaign with ID ${id} not found`);
    }

    // update Campaign
    Object.assign(campaign, updateData);

    // Save to Database
    return this.save(campaign);
  }

  async deleteCampaign(id: number): Promise<void> {
    // Check if Battle Pass Exists
    const campaign = await this.findOne({
      where: { id },
    });
    if (!campaign) {
      throw new Error(`Campaign with ID ${id} not found`);
    }

    // Remove Campaign
    await this.remove(campaign);
  }
}

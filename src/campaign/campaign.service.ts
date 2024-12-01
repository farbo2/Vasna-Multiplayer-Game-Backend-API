import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignRepository } from './campaign.repository';
import { UserCampaignRepository } from './user-campaign.repository';
import { createCampaignDto } from './dtos/create-campaign.dto';
import { Campaign } from './entities/campaign.entity';
import { createUserCampaignDto } from './dtos/create-user-campaign.dto';
import { UserCampaign } from './entities/user-campaign.entity';
@Injectable()
export class CampaignService {
  private readonly logger = new Logger(CampaignService.name);

  constructor(
    @InjectRepository(CampaignRepository)
    private campaignRepo: CampaignRepository,
    @InjectRepository(UserCampaignRepository)
    private userCampaignRepo: UserCampaignRepository,
  ) {}

  async findAllCampaign() {
    try {
      this.logger.log('Attempting to fetch all Campaign with levels');

      const campaigns = await this.campaignRepo.findAllCampaigns();

      if (!campaigns || campaigns.length === 0) {
        this.logger.warn('No Campaign records found in the database');
        return [];
      }

      this.logger.log(
        `Successfully fetched ${campaigns.length} Campaign records`,
      );
      return campaigns;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Campaign with levels',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Campaign data. Please try again later.',
      );
    }
  }
  async findCampaignById(id: number) {
    try {
      this.logger.log('Attempting to fetch a Campaign by ID');
      const campaign = await this.campaignRepo.findCampaignById(id);
      if (!campaign) {
        this.logger.warn('No Campaign record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Campaign with ID ${id}`);
      return campaign;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Campaign by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Campaign data. Please try again later',
      );
    }
  }

  async createCampaign(
    createCampaignDto: createCampaignDto,
  ): Promise<Campaign> {
    const campaign = this.campaignRepo.create(createCampaignDto);
    return this.campaignRepo.save(campaign);
  }

  async updateCampaign(
    id: number,
    updateData: Partial<Campaign>,
  ): Promise<Campaign> {
    try {
      return await this.campaignRepo.updateCampaign(id, updateData);
    } catch (error) {
      throw new Error(`Failed to update Campaign: ${error.message}`);
    }
  }

  async deleteCampaignById(id: number): Promise<void> {
    try {
      await this.campaignRepo.deleteCampaign(id);
    } catch (error) {
      throw new Error(`Failed to delete Campaign: ${error.message}`);
    }
  }

  // Delete User Campaign
  async deleteUserCampaignById(id: number): Promise<void> {
    try {
      await this.userCampaignRepo.deleteUserCampaign(id);
    } catch (error) {
      throw new Error(`Failed to delete User Campaign: ${error.message}`);
    }
  }

  async findUserCampaignById(id: number) {
    try {
      this.logger.log('Attempting to fetch a User Campaign by ID');
      const userCampaign = await this.userCampaignRepo.findUserCampaignById(id);
      if (!userCampaign) {
        this.logger.warn('No User Campaign record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched User Campaign with ID ${id}`);
      return userCampaign;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching User Campaign by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving User Campaign data. Please try again later',
      );
    }
  }

  async findUserCampaignByCampaignId(userId: number, campaignId: number) {
    try {
      this.logger.log('Attempting to fetch a User Campaign by ID');
      const userCampaign =
        await this.userCampaignRepo.findUserCampaignByCampaignId(
          userId,
          campaignId,
        );
      if (!userCampaign) {
        this.logger.warn('No User Campaign record found in the database');
        return null;
      }
      this.logger.log(
        `Successfully fetched User Campaign with Campaign ID ${campaignId}`,
      );
      return userCampaign;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching User Campaign by Campain ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving User Campaign data. Please try again later',
      );
    }
  }

  async createUserCampaign(
    createUserCampaignDto: createUserCampaignDto,
  ): Promise<UserCampaign> {
    const userCampaign = this.userCampaignRepo.create(createUserCampaignDto);
    return this.userCampaignRepo.save(userCampaign);
  }

  async updateUserCampaign(
    id: number,
    updateData: Partial<UserCampaign>,
  ): Promise<UserCampaign> {
    try {
      return await this.userCampaignRepo.updateUserCampaign(id, updateData);
    } catch (error) {
      throw new Error(`Failed to update User Campaign: ${error.message}`);
    }
  }
}

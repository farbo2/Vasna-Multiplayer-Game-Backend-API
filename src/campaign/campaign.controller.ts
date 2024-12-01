import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { createCampaignDto } from './dtos/create-campaign.dto';
import { updateCampaignDto } from './dtos/update-campaign.dto';
import { getUserCampaignDto } from './dtos/get-user-camp.dto';
import { createUserCampaignDto } from './dtos/create-user-campaign.dto';
import { updateUserCampaignDto } from './dtos/update-user-campaign';

@Controller('campaign')
export class CampaignController {
  constructor(private campaignService: CampaignService) {}
  // CAMPAIGN HANDLERS
  @Get()
  getAllCampaings() {
    return this.campaignService.findAllCampaign();
  }

  @Post()
  createCampaign(@Body() body: createCampaignDto) {
    return this.campaignService.createCampaign(body);
  }

  @Patch('/:id')
  updateCampaign(@Param('id') id: string, @Body() body: updateCampaignDto) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.campaignService.updateCampaign(numericId, body);
  }

  @Delete('/:id')
  async removeCampaing(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    await this.campaignService.deleteCampaignById(numericId);
    return {
      message: `Campaign with ID ${id} has been deleted successfully.`,
    };
  }

  // USER CAMPAIGN HANDLERS
  @Get('/user-campaign/:id')
  getUserCampaignById(@Param('id') id: number) {
    return this.campaignService.findUserCampaignById(id);
  }

  @Get('/user-campaign/campaign/:campid')
  getUserCampaignByCampaignId(
    @Param('campid') campaignId: number,
    @Body() body: getUserCampaignDto,
  ) {
    return this.campaignService.findUserCampaignByCampaignId(
      body.userId,
      campaignId,
    );
  }

  @Post('/user-campaign')
  createUserCampaign(@Body() body: createUserCampaignDto) {
    return this.campaignService.createUserCampaign(body);
  }

  @Delete('/user-campaign/:id')
  async removeUserCampaing(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    await this.campaignService.deleteUserCampaignById(numericId);
    return {
      message: `User Campaign with ID ${id} has been deleted successfully.`,
    };
  }
  @Patch('/user-campaign/:id')
  updateUserCampaign(
    @Param('id') id: string,
    @Body() body: updateUserCampaignDto,
  ) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.campaignService.updateUserCampaign(numericId, body);
  }
}

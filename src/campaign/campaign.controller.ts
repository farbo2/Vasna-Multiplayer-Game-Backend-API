import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('campaign')
export class CampaignController {
  // CAMPAIGN HANDLERS
  @Get()
  getAllCampaings() {}

  @Post()
  createCampaign(@Body() body: any) {}

  @Patch('/:id')
  updateCampaign(@Param('id') id: number, @Body() body: any) {}

  @Delete('/:id')
  removeCampaing(@Param('id') id: number) {}

  // USER CAMPAIGN HANDLERS
  @Get('/user-campaign/:id')
  getUserCampaignById(@Param('id') id: number) {}

  @Get('/user-campaign/campaign/:campid')
  getUserCampaignByCampaignId(@Param('campid') id: number) {}

  @Post('/user-campaign')
  createUserCampaign(@Body() body: any) {
    //For campaign
  }

  @Patch('/user-campaign/:id')
  updateUserCampaign(@Param('id') id: number, @Body() body: any) {}
}

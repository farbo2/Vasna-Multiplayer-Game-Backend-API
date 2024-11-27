import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('battle-pass')
export class BattlePassController {
  //BATTLE PASS HANDLERS
  @Get()
  getAllBattlePasses() {}

  @Get('/:id')
  getBattlePassById(@Param('id') id: number) {}

  @Post()
  createBattlePass(@Body() body: any) {
    //TODO: and CreateBattlePassProgress For Every Single User
  }

  @Patch('/:id')
  updateBattlePass(@Param('id') id: number, @Body() body: any) {}

  @Delete('/:id')
  removeBattlePassById(@Param('id') id: number) {}

  // BATTLE PASS LEVEL HANDLER
  @Get('/level/:id')
  BattlePassLevelById(@Param('id') id: number) {}

  @Post('/level')
  createBattlePassLevel(@Body() body: any) {}

  @Patch('/level/:id')
  updateBattlePassLevelById(@Param('id') id: number, @Body() body: any) {}

  @Delete('/level/:id')
  removeBattlePassLevelById(@Param('id') id: number, @Body() body: any) {}

  // BATTLE PASS INVENTORY
  @Get('/inventory/:id')
  getBattlePassLevelInventoryById(@Param('id') id: number) {}

  @Get('/inventory/level/:id')
  getBattlePassLevelInventoryByLevelId(@Param('id') id: number) {}

  @Patch('/inventory/:id')
  updateBattlePassLevelInventoryById(
    @Param('id') id: number,
    @Body() body: any,
  ) {}

  @Delete('/inventory/:id')
  removeBattlePassLevelInventoryById(@Param('id') id: number) {}

  // BATTLE PASS PROGRESS
  @Get('/progress/:userid')
  getAllBattlePassProgressByUserId(@Param('userid') userId: number) {}

  @Get('/progress/current/:userid')
  getCurrentActiveBattlePassProgressByUserId(@Param('userid') userId: number) {}

  @Patch('/progress')
  progressCurrentActiveBattlePass(@Body() body: any) {
    //TODO: FindActive BattlePass
    //TODO: Find UserProgress And Update XpCollected and "Level" Based On That and "Level Xp Required To Complete"
    //TODO: Check if Level Completed Get Inventory And Add to User Inventory
  }
}

import { AdminGuard } from '../guards/jwt-auth/admin.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Put,
} from '@nestjs/common';
import { BattlePassService } from './battle-pass.service';
import { createBattlePassDto } from './dtos/create-battle-pass.dto';
import { AddBattlePassLevelsDto } from './dtos/add-battle-pass-levels.dto';
import { UpdateBattlePassDto } from './dtos/update-battle-pass.dto';
import { UpdateBattlePassLevelDto } from './dtos/update-battle-pass-level.dto';
import { CreateBattlePassInventoryDto } from './dtos/create-battle-pass-inventory.dto';
import { UpdateBattlePassInventoryDto } from './dtos/update-battle-pass-inventory.dto';
import { progressActiveBattlePass } from './dtos/progress-active-battle-pass.dto';

@Controller('battle-pass')
export class BattlePassController {
  constructor(private battlePassService: BattlePassService) {}
  //BATTLE PASS HANDLERS
  @Get()
  getAllBattlePasses() {
    return this.battlePassService.findAllBattlePassWithLevels();
  }

  @Get('/:id')
  getBattlePassById(@Param('id') id: string) {
    var IntId = parseInt(id);
    return this.battlePassService.findBattlePassById(IntId);
  }
  @UseGuards(AdminGuard)

  @Post()
  async createBattlePass(@Body() body: createBattlePassDto) {
    return this.battlePassService.createBattlePass(body);
  }
  @UseGuards(AdminGuard)

  @Put('/:id')
  updateBattlePass(@Param('id') id: string, @Body() body: UpdateBattlePassDto) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.battlePassService.updateBattlePass(numericId, body);
  }
  @UseGuards(AdminGuard)

  @Delete('/:id')
  async removeBattlePassById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.battlePassService.deleteBattlePassById(id);
    return {
      message: `BattlePass with ID ${id} has been deleted successfully.`,
    };
  }

  // BATTLE PASS LEVEL HANDLER
  @Get('/level/:id')
  findBattlePassLevelById(@Param('id') id: string) {
    var IntId = parseInt(id);
    return this.battlePassService.findBattlePassLevelById(IntId);
  }
  @UseGuards(AdminGuard)

  @Post(':battlePassId/levels')
  async addLevelsToBattlePass(
    @Param('battlePassId', ParseIntPipe) battlePassId: number,
    @Body() addBattlePassLevelsDto: AddBattlePassLevelsDto,
  ) {
    return this.battlePassService.addLevelsToBattlePass(
      battlePassId,
      addBattlePassLevelsDto,
    );
  }
  @UseGuards(AdminGuard)

  @Put('/level/:id')
  updateBattlePassLevel(
    @Param('id') id: string,
    @Body() body: UpdateBattlePassLevelDto,
  ) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.battlePassService.updateBattlePassLevel(numericId, body);
  }
  @UseGuards(AdminGuard)

  @Delete('/level/:id')
  async removeBattlePassLevelById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.battlePassService.deleteBattlePassLevelById(id);
    return {
      message: `BattlePassLevel with ID ${id} has been deleted successfully.`,
    };
  }

  // BATTLE PASS INVENTORY
  @Get('/inventory/:id')
  getBattlePassLevelInventoryById(@Param('id') id: string) {
    var IntId = parseInt(id);
    return this.battlePassService.findBattlePassInventoryById(IntId);
  }

  @Get('/inventory/level/:id')
  getBattlePassInventoriesByLevelId(@Param('id') id: string) {
    var IntId = parseInt(id);
    return this.battlePassService.findBattlePassInventoriesByLevelId(IntId);
  }
  @UseGuards(AdminGuard)
  @Post()
  async createBattlePassInventoryWithLevelId(
    @Body() body: CreateBattlePassInventoryDto,
  ) {
    return this.battlePassService.createBattlePassInventory(body);
  }
  @UseGuards(AdminGuard)

  @Patch('/inventory/:id')
  updateBattlePassLevelInventoryById(
    @Param('id') id: string,
    @Body() body: UpdateBattlePassInventoryDto,
  ) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.battlePassService.updateBattlePassInventory(numericId, body);
  }
  @UseGuards(AdminGuard)

  @Delete('/inventory/:id')
  async removeBattlePassInventoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.battlePassService.deleteBattlePassInventoryById(id);
    return {
      message: `BattlePassLevel Inventory with ID ${id} has been deleted successfully.`,
    };
  }

  // BATTLE PASS PROGRESS
  @Get('/progress/:userid')
  getAllBattlePassProgressByUserId(@Param('userid') userId: string) {
    var IntId = parseInt(userId);
    return this.battlePassService.findBattlePassProgressByUserId(IntId);
  }

  @Get('/progress/current/:userid')
  getCurrentActiveBattlePassProgressByUserId(@Param('userid') userId: string) {
    var IntId = parseInt(userId);
    return this.battlePassService.findCurrentActiveBattlePassProgressByUserId(
      IntId,
    );
  }
  @UseGuards(AdminGuard)

  @Patch('/progress')
  progressCurrentActiveBattlePass(@Body() body: progressActiveBattlePass) {
    this.battlePassService.progressCurrentActiveBattlePass(
      body.userId,
      body.xpToAdd,
    );
  }
}

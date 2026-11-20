import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Request } from 'express';
import { AuthenticatedUser, JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { QuestInput, QuestsService } from './quests.service';

class QuestDto {
  @IsString() @MinLength(1) title: string;
  @IsOptional() @IsString() description?: string;
  @IsString() type: string;
  @IsInt() @Min(1) targetPoint: number;
  @IsString() rewardType: string;
  @IsInt() @Min(0) rewardAmount: number;
  @Type(() => Date) @IsDate() startDate: Date;
  @Type(() => Date) @IsDate() endDate: Date;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
class UpdateQuestDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() type?: string;
  @IsOptional() @IsInt() @Min(1) targetPoint?: number;
  @IsOptional() @IsString() rewardType?: string;
  @IsOptional() @IsInt() @Min(0) rewardAmount?: number;
  @IsOptional() @Type(() => Date) @IsDate() startDate?: Date;
  @IsOptional() @Type(() => Date) @IsDate() endDate?: Date;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
class CreateUserQuestDto { @IsInt() @Min(1) questId: number; }
class UpdateUserQuestDto {
  @IsOptional() @IsInt() @Min(0) currentPoint?: number;
  @IsOptional() @IsString() status?: string;
}

@Controller('quests')
@UseGuards(JwtAuthGuard)
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  private assertAdmin(user: AuthenticatedUser) {
    if (user.role !== 'admin') throw new ForbiddenException('Administrator access required');
  }

  @Get() getAllQuests() { return this.questsService.findAll(); }
  @Get('active') getActiveQuest() { return this.questsService.findActive(); }

  @Post()
  createQuest(@Body() body: QuestDto, @Req() req: Request & { user: AuthenticatedUser }) {
    this.assertAdmin(req.user);
    return this.questsService.createQuest(body as QuestInput);
  }

  @Patch(':id')
  updateQuest(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateQuestDto, @Req() req: Request & { user: AuthenticatedUser }) {
    this.assertAdmin(req.user);
    return this.questsService.updateQuest(id, body);
  }

  @Post('user-quest')
  createUserQuest(@Body() body: CreateUserQuestDto, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.questsService.createUserQuest(req.user.id, body.questId);
  }

  @Patch('user-quest/:id')
  updateUserQuest(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserQuestDto, @Req() req: Request & { user: AuthenticatedUser }) {
    this.assertAdmin(req.user);
    return this.questsService.updateUserQuest(id, req.user.id, body);
  }

  @Get('user-quest/:id')
  getUserQuestById(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.questsService.getUserQuest(id, req.user.id);
  }

  @Get('user-quest/user/:id')
  getActiveUserQuestByUserId(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    if (id !== req.user.id && req.user.role !== 'admin') throw new ForbiddenException();
    return this.questsService.getActiveUserQuests(id);
  }
}

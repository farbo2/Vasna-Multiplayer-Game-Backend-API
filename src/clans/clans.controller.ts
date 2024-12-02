import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClansService } from './clans.service';
import { createClanDto } from './dtos/create-clan.dto';
import { updateClanDto } from './dtos/update-clan.dto';
import { createClanRequestDto } from './dtos/create-clan-request.dto';
import { createClanInvitationDto } from './dtos/create-clan-invitation.dto';

@Controller('clans')
export class ClansController {
  constructor(private clansService: ClansService) {}
  //CLAN HANDLERS
  @Get()
  getAllClans() {
    return this.clansService.findAllClans();
  }

  @Post()
  createClan(@Body() body: createClanDto) {
    return this.clansService.createClan(body);
  }

  @Patch('/:id')
  updateClan(@Param('id') clanId: string, @Body() body: updateClanDto) {
    const numericClanId = parseInt(clanId, 10);
    if (isNaN(numericClanId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.updateClan(numericClanId, body);
  }

  @Delete('/:id')
  deleteClan(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.deleteClan(numericId);
  }

  // CLAN MEMBERS HANDLER
  @Post(':clanId/members')
  async addMember(
    @Param('clanId') clanId: string,
    @Body() body: { playerId: number; role: string },
  ) {
    const numericClanId = parseInt(clanId, 10);
    if (isNaN(numericClanId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.addMemberToClan(numericClanId, body);
  }

  @Patch(':clanId/members/:memberId')
  async updateMemberRole(
    @Param('clanId') clanId: string,
    @Param('memberId') memberId: string,
    @Body() body: { role: string },
  ) {
    const numericClanId = parseInt(clanId, 10);
    if (isNaN(numericClanId)) {
      throw new Error('Invalid ID format');
    }
    const numericMemberId = parseInt(memberId, 10);
    if (isNaN(numericMemberId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.updateMemberRole(
      numericClanId,
      numericMemberId,
      body.role,
    );
  }

  @Delete(':clanId/members/:memberId')
  async removeMember(
    @Param('clanId') clanId: string,
    @Param('memberId') memberId: string,
  ) {
    const numericClanId = parseInt(clanId, 10);
    if (isNaN(numericClanId)) {
      throw new Error('Invalid ID format');
    }
    const numericMemberId = parseInt(memberId, 10);
    if (isNaN(numericMemberId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.removeMember(numericClanId, numericMemberId);
  }

  // CLAN REQUEST HANDLERS
  @Get('/request/sender/:id')
  getAllClanRequestsBySenderId(@Param('id') senderId: string) {
    const numericSenderId = parseInt(senderId, 10);
    if (isNaN(numericSenderId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.getAllClanRequestsBySenderId(numericSenderId);
  }

  @Get('/request/clan/:id')
  getAllClanRequestsByClanId(@Param('id') clanId: string) {
    const numericClanId = parseInt(clanId, 10);
    if (isNaN(numericClanId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.getAllClanRequestsByClanId(numericClanId);
  }

  @Get('/request/:id')
  getClanRequestById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.getClanRequestById(numericId);
  }

  @Post('/request')
  sendClanRequest(@Body() body: createClanRequestDto) {
    return this.clansService.sendClanRequest(body);
  }

  @Delete('/request/:id')
  cancelClanRequest(@Param('id') clanRequestId: string) {
    const numericClanRequestId = parseInt(clanRequestId, 10);
    if (isNaN(numericClanRequestId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.deleteClanRequest(numericClanRequestId);
  }

  @Patch('/request/:id')
  responseClanRequest(
    @Param('id') requestId: string,
    @Body('status') status: string,
  ) {
    const numericRequestId = parseInt(requestId, 10);
    if (isNaN(numericRequestId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.responseClanRequest(numericRequestId, status);
  }

  //CLAN INVITATION HANDLERS
  @Get('/invite/inviter/:id')
  getAllClanInvitationsByInviterId(@Param('id') inviterId: string) {
    const numericInviterId = parseInt(inviterId, 10);
    if (isNaN(numericInviterId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.getAllClanInvitationsByInviterId(numericInviterId);
  }

  @Get('/invite/invited/:id')
  getAllClanInvitationsByInvitedId(@Param('id') invitedId: string) {
    const numericInvitedId = parseInt(invitedId, 10);
    if (isNaN(numericInvitedId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.getAllClanInvitationsByInvitedId(numericInvitedId);
  }

  @Get('/invite/clan/:id')
  getAllClanInvitationsByClanId(@Param('id') clanId: string) {
    const numericClanId = parseInt(clanId, 10);
    if (isNaN(numericClanId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.getAllClanInvitationsByClanId(numericClanId);
  }

  @Get('/invite/:id')
  getClanInvitationById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.getClanInvitationById(numericId);
  }

  @Post('/invite')
  sendClanInvitation(@Body() body: createClanInvitationDto) {
    return this.clansService.sendClanInvitation(body);
  }

  @Delete('/invite/:id')
  cancelClanInvitation(@Param('id') clanInvitationId: string) {
    const numericClanInvitationId = parseInt(clanInvitationId, 10);
    if (isNaN(numericClanInvitationId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.deleteClanInvitation(numericClanInvitationId);
  }

  @Patch('/invite/:id')
  responseClanInvitation(
    @Param('id') invitationId: string,
    @Body('status') status: string,
  ) {
    const numericInvitationId = parseInt(invitationId, 10);
    if (isNaN(numericInvitationId)) {
      throw new Error('Invalid ID format');
    }
    return this.clansService.responseClanInvitation(
      numericInvitationId,
      status,
    );
  }
}

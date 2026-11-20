import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUser, JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { ClansService } from './clans.service';
import { createClanDto } from './dtos/create-clan.dto';
import { updateClanDto } from './dtos/update-clan.dto';
import { createClanRequestDto } from './dtos/create-clan-request.dto';
import { createClanInvitationDto } from './dtos/create-clan-invitation.dto';

@Controller('clans')
@UseGuards(JwtAuthGuard)
export class ClansController {
  constructor(private readonly clansService: ClansService) {}

  @Get()
  getAllClans() { return this.clansService.findAllClans(); }

  @Post()
  createClan(@Body() body: createClanDto, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureCreateClan(body, req.user.id);
  }

  @Patch(':id')
  updateClan(@Param('id', ParseIntPipe) id: number, @Body() body: updateClanDto, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureUpdateClan(id, body, req.user.id);
  }

  @Delete(':id')
  deleteClan(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureDeleteClan(id, req.user.id);
  }

  @Post(':clanId/members')
  addMember(@Param('clanId', ParseIntPipe) clanId: number, @Body('playerId', ParseIntPipe) playerId: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureAddMember(clanId, playerId, req.user.id);
  }

  @Patch(':clanId/members/:memberId')
  updateMemberRole(@Param('clanId', ParseIntPipe) clanId: number, @Param('memberId', ParseIntPipe) memberId: number, @Body('role') role: string, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureUpdateMemberRole(clanId, memberId, role, req.user.id);
  }

  @Delete(':clanId/members/:memberId')
  removeMember(@Param('clanId', ParseIntPipe) clanId: number, @Param('memberId', ParseIntPipe) memberId: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureRemoveMember(clanId, memberId, req.user.id);
  }

  @Get('request/sender/:id')
  getAllClanRequestsBySenderId(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureGetClanRequestsBySender(id, req.user.id);
  }

  @Get('request/clan/:id')
  getAllClanRequestsByClanId(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureGetClanRequestsByClan(id, req.user.id);
  }

  @Get('request/:id')
  getClanRequestById(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureGetClanRequestById(id, req.user.id);
  }

  @Post('request')
  sendClanRequest(@Body() body: createClanRequestDto, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureSendClanRequest(body, req.user.id);
  }

  @Delete('request/:id')
  cancelClanRequest(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureDeleteClanRequest(id, req.user.id);
  }

  @Patch('request/:id')
  responseClanRequest(@Param('id', ParseIntPipe) id: number, @Body('status') status: string, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureResponseClanRequest(id, status, req.user.id);
  }

  @Get('invite/inviter/:id')
  getAllClanInvitationsByInviterId(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureGetClanInvitationsByInviter(id, req.user.id);
  }

  @Get('invite/invited/:id')
  getAllClanInvitationsByInvitedId(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureGetClanInvitationsByInvited(id, req.user.id);
  }

  @Get('invite/clan/:id')
  getAllClanInvitationsByClanId(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureGetClanInvitationsByClan(id, req.user.id);
  }

  @Get('invite/:id')
  getClanInvitationById(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureGetClanInvitationById(id, req.user.id);
  }

  @Post('invite')
  sendClanInvitation(@Body() body: createClanInvitationDto, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureSendClanInvitation(body, req.user.id);
  }

  @Delete('invite/:id')
  cancelClanInvitation(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureDeleteClanInvitation(id, req.user.id);
  }

  @Patch('invite/:id')
  responseClanInvitation(@Param('id', ParseIntPipe) id: number, @Body('status') status: string, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.clansService.secureResponseClanInvitation(id, status, req.user.id);
  }
}

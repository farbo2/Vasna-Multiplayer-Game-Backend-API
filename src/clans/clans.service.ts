import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClansRepository } from './clans.repository';
import { ClanMemberRepository } from './clan-member.repository';
import { ClanInvitationRepository } from './clan-invitation.repository';
import { ClanRequestRepository } from './clan-request.repository';
import { createClanDto } from './dtos/create-clan.dto';
import { Clan } from './entities/clan.entity';
import { UsersRepository } from 'src/users/users.repository';
import { updateClanDto } from './dtos/update-clan.dto';
import { ClanRequest } from './entities/clan-request.entity';
import { createClanRequestDto } from './dtos/create-clan-request.dto';
import { ClanInvitation } from './entities/clan-invitation.entity';
import { createClanInvitationDto } from './dtos/create-clan-invitation.dto';

@Injectable()
export class ClansService {
  private readonly logger = new Logger(ClansService.name);
  constructor(
    @InjectRepository(ClansRepository)
    private clansRepo: ClansRepository,
    @InjectRepository(ClanMemberRepository)
    private clanMemberRepo: ClanMemberRepository,
    @InjectRepository(ClanInvitationRepository)
    private clanInvitationRepo: ClanInvitationRepository,
    @InjectRepository(ClanRequestRepository)
    private clanRequestRepo: ClanRequestRepository,
    @InjectRepository(UsersRepository)
    private usersRepo: UsersRepository,
  ) {}
  async findAllClans() {
    try {
      this.logger.log('Attempting to fetch all Cards');

      const clans = await this.clansRepo.findAllClans();

      if (!clans || clans.length === 0) {
        this.logger.warn('No Clans records found in the database');
        return [];
      }

      this.logger.log(`Successfully fetched ${clans.length} Clans records`);
      return clans;
    } catch (error) {
      this.logger.error('Error occurred while fetching Clans', error.stack);
      throw new InternalServerErrorException(
        'An error occurred while retrieving Cards data. Please try again later.',
      );
    }
  }
  async createClan(data: createClanDto) {
    const leader = await this.usersRepo.findOne({
      where: { id: data.leaderId },
    });
    if (!leader) {
      throw new Error('Leader not found');
    }
    const clan = this.clansRepo.create(data);
    clan.leader = leader;

    // TODO: ADD CURRENT CLAN QUEST FOR CLAN
    return this.clansRepo.save(clan);
  }

  async deleteClan(clanId: number) {
    //  delete related clan requests
    await this.clanRequestRepo.delete({ clanId });

    // delete related clan invitations
    await this.clanInvitationRepo.delete({ clanId });
    const clan = await this.clansRepo.findOne({ where: { id: clanId } });
    if (!clan) {
      throw new Error('Clan not found');
    }
    //TODO : DELETE CURRENT CLAN QUEST
    // remove from database
    await this.clansRepo.remove(clan);

    return { message: 'Clan deleted successfully' };
  }

  async updateClan(clanId: number, updateData: updateClanDto) {
    const clan = await this.clansRepo.findOne({ where: { id: clanId } });

    if (!clan) {
      throw new Error('Clan not found');
    }

    // Apply Changes
    if (updateData.name) {
      clan.name = updateData.name;
    }
    if (updateData.description) {
      clan.description = updateData.description;
    }
    if (updateData.logo) {
      clan.logo = updateData.logo;
    }

    // Save Changes
    return this.clansRepo.save(clan);
  }

  async addMemberToClan(
    clanId: number,
    data: { playerId: number; role: string },
  ) {
    const clan = await this.clansRepo.findOne({
      where: { id: clanId },
      relations: ['members'],
    });

    if (!clan) {
      throw new Error('Clan not found');
    }

    const clanMember = this.clanMemberRepo.create({
      clan,
      playerId: data.playerId,
      role: data.role,
    });
    //TODO: ADD CLAN QUEST CONTRIBUTION
    clan.members.push(clanMember);
    await this.clansRepo.save(clan);

    const updatedClan = await this.clansRepo.findOne({
      where: { id: clanId },
      relations: ['members'],
    });

    return updatedClan;
  }

  async removeMember(clanId: number, memberId: number) {
    const clan = await this.clansRepo.findOne({
      where: { id: clanId },
      relations: ['members'],
    });
    if (!clan) {
      throw new Error('Clan not found');
    }
    const member = clan.members.find((m) => m.id === memberId);

    if (!member) {
      throw new Error('Member not found in this clan');
    }
    // TODO: DELETE CLAN QUEST CONTRIBUTION
    // remove member from database
    await this.clanMemberRepo.remove(member);

    // return updated clan
    return this.clansRepo.findOne({
      where: { id: clanId },
      relations: ['members'],
    });
  }

  async updateMemberRole(clanId: number, memberId: number, newRole: string) {
    const clan = await this.clansRepo.findOne({
      where: { id: clanId },
      relations: ['members'],
    });
    if (!clan) {
      throw new Error('Clan not found');
    }
    const member = clan.members.find((m) => m.id === memberId);
    if (!member) {
      throw new Error('Member not found in this clan');
    }
    // update Role
    member.role = newRole;
    //  Save in database
    await this.clanMemberRepo.save(member);

    // return updated clan
    return this.clansRepo.findOne({
      where: { id: clanId },
      relations: ['members'],
    });
  }

  async getAllClanRequestsBySenderId(senderId: number): Promise<ClanRequest[]> {
    try {
      this.logger.log('Attempting to fetch Clan Requests By SenderId');
      const clanRequests =
        await this.clanRequestRepo.findAllBySenderId(senderId);

      if (!clanRequests || clanRequests.length === 0) {
        this.logger.warn(
          `No ${senderId} Requests records found in the database`,
        );
        return [];
      }
      this.logger.log(
        `Successfully fetched ${clanRequests.length} Available records`,
      );
      return clanRequests;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Clan Requests',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Clan Request data. Please try again later.',
      );
    }
  }

  async getAllClanRequestsByClanId(clanId: number): Promise<ClanRequest[]> {
    try {
      this.logger.log('Attempting to fetch Clan Requests By clanId');
      const clanRequests = await this.clanRequestRepo.findAllByClanId(clanId);

      if (!clanRequests || clanRequests.length === 0) {
        this.logger.warn(`No ${clanId} Requests records found in the database`);
        return [];
      }
      this.logger.log(
        `Successfully fetched ${clanRequests.length} Available records`,
      );
      return clanRequests;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Clan Requests',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Clan Request data. Please try again later.',
      );
    }
  }

  async getClanRequestById(id: number): Promise<ClanRequest> {
    try {
      this.logger.log('Attempting to fetch Clan Requests By ID');
      const clanRequest = await this.clanRequestRepo.findById(id);

      if (!clanRequest) {
        this.logger.warn(`No Requests record found in the database`);
        return null;
      }
      this.logger.log(`Successfully fetched Available record`);
      return clanRequest;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Clan Request',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Clan Request data. Please try again later.',
      );
    }
  }

  async sendClanRequest(data: createClanRequestDto): Promise<ClanRequest> {
    const player = await this.usersRepo.findOne({
      where: { id: data.playerId },
    });

    if (!player) {
      throw new Error('User not found');
    }

    const clanRequest = this.clanRequestRepo.create({
      clanId: data.clanId,
      player: player,
    });
    return this.clanRequestRepo.save(clanRequest);
  }

  async deleteClanRequest(requestId: number) {
    //  delete related clan requests
    await this.clanRequestRepo.delete({ id: requestId });

    return { message: 'Clan Request deleted successfully' };
  }

  async responseClanRequest(
    requestId: number,
    status: string,
  ): Promise<string> {
    //  find ClanRequest
    const request = await this.clanRequestRepo.findOne({
      where: { id: requestId },
      relations: ['player'],
    });

    if (!request) {
      throw new NotFoundException('Clan request not found');
    }

    if (request.status === 'Accepted' || request.status === 'Declined') {
      throw new BadRequestException('Clan request already handled');
    }

    // update status
    request.status = status;
    request.responsedAt = new Date();
    await this.clanRequestRepo.save(request);

    // if Declined
    if (status === 'Declined') {
      return 'Clan request declined';
    }

    // if Accepted
    const clan = await this.clansRepo.findOne({
      where: { id: request.clanId },
    });

    if (!clan) {
      throw new NotFoundException('Clan not found');
    }

    // Add ClanMember
    const newMember = this.clanMemberRepo.create({
      clan,
      playerId: request.player.id,
      role: 'Member', // default role
    });

    await this.clanMemberRepo.save(newMember);

    return 'Clan request accepted and member added';
  }

  async getAllClanInvitationsByInviterId(
    inviterId: number,
  ): Promise<ClanInvitation[]> {
    try {
      this.logger.log('Attempting to fetch Clan Invitations By InviterId');
      const clanInvitations =
        await this.clanInvitationRepo.findAllByInviterId(inviterId);

      if (!clanInvitations || clanInvitations.length === 0) {
        this.logger.warn(
          `No ${inviterId} Invitations records found in the database`,
        );
        return [];
      }
      this.logger.log(
        `Successfully fetched ${clanInvitations.length} Available records`,
      );
      return clanInvitations;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Clan Invitations',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Clan Invitations data. Please try again later.',
      );
    }
  }

  async getAllClanInvitationsByInvitedId(
    invitedId: number,
  ): Promise<ClanInvitation[]> {
    try {
      this.logger.log('Attempting to fetch Clan Invitations By InvitedId');
      const clanInvitations =
        await this.clanInvitationRepo.findAllByInvitedId(invitedId);

      if (!clanInvitations || clanInvitations.length === 0) {
        this.logger.warn(
          `No ${invitedId} Invitations records found in the database`,
        );
        return [];
      }
      this.logger.log(
        `Successfully fetched ${clanInvitations.length} Available records`,
      );
      return clanInvitations;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Clan Invitations',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Clan Invitations data. Please try again later.',
      );
    }
  }

  async getAllClanInvitationsByClanId(
    clanId: number,
  ): Promise<ClanInvitation[]> {
    try {
      this.logger.log('Attempting to fetch Clan Invitations By clanId');
      const clanInvitations =
        await this.clanInvitationRepo.findAllByClanId(clanId);

      if (!clanInvitations || clanInvitations.length === 0) {
        this.logger.warn(
          `No ${clanId} Invitations records found in the database`,
        );
        return [];
      }
      this.logger.log(`Successfully fetched ${clanInvitations.length} records`);
      return clanInvitations;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Clan Invitations',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Clan Invitations data. Please try again later.',
      );
    }
  }

  async getClanInvitationById(id: number): Promise<ClanInvitation> {
    try {
      this.logger.log('Attempting to fetch Clan Invitations By ID');
      const clanInvitation = await this.clanInvitationRepo.findById(id);

      if (!clanInvitation) {
        this.logger.warn(`No Invitation record found in the database`);
        return null;
      }
      this.logger.log(`Successfully fetched ClanInvitation record`);
      return clanInvitation;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Clan Invitation',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Clan Invitation data. Please try again later.',
      );
    }
  }

  async sendClanInvitation(
    data: createClanInvitationDto,
  ): Promise<ClanInvitation> {
    const inviter = await this.usersRepo.findOne({
      where: { id: data.inviterId },
    });

    if (!inviter) {
      throw new Error('Inviter not found');
    }

    const clanInvitation = this.clanInvitationRepo.create({
      clanId: data.clanId,
      inviter: inviter,
      invitedPlayerId: data.invitedId,
    });
    return this.clanInvitationRepo.save(clanInvitation);
  }

  async responseClanInvitation(
    invitationId: number,
    status: string,
  ): Promise<string> {
    //  find ClanRequest
    const invitation = await this.clanInvitationRepo.findOne({
      where: { id: invitationId },
      relations: ['inviter'],
    });

    if (!invitation) {
      throw new NotFoundException('Clan Invitation not found');
    }

    if (invitation.status === 'Accepted' || invitation.status === 'Declined') {
      throw new BadRequestException('Clan invitation already handled');
    }

    // update status
    invitation.status = status;
    invitation.responsedAt = new Date();
    await this.clanInvitationRepo.save(invitation);

    // if Declined
    if (status === 'Declined') {
      return 'Clan invitation declined';
    }

    // if Accepted
    const clan = await this.clansRepo.findOne({
      where: { id: invitation.clanId },
    });

    if (!clan) {
      throw new NotFoundException('Clan not found');
    }

    // Add ClanMember
    const newMember = this.clanMemberRepo.create({
      clan,
      playerId: invitation.invitedPlayerId,
      role: 'Member', // default role
    });

    await this.clanMemberRepo.save(newMember);

    return 'Clan invitation accepted and member added';
  }

  async deleteClanInvitation(invitationId: number) {
    //  delete related clan invitation
    await this.clanInvitationRepo.delete({ id: invitationId });

    return { message: 'Clan Invitation deleted successfully' };
  }
}

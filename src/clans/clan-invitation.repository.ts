import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ClanInvitation } from './entities/clan-invitation.entity';

@Injectable()
export class ClanInvitationRepository extends Repository<ClanInvitation> {
  constructor(private dataSource: DataSource) {
    super(ClanInvitation, dataSource.createEntityManager());
  }

  async findAllByInviterId(inviterId: number): Promise<ClanInvitation[]> {
    return this.find({
      where: { inviter: { id: inviterId } },
      relations: ['inviter'],
    });
  }
  async findAllByInvitedId(invitedId: number): Promise<ClanInvitation[]> {
    return this.find({
      where: { invitedPlayerId: invitedId },
      relations: ['inviter'],
    });
  }
  async findAllByClanId(clanId: number): Promise<ClanInvitation[]> {
    return this.find({
      where: { clanId: clanId },
      relations: ['inviter'],
    });
  }

  async findById(id: number): Promise<ClanInvitation> {
    return this.findOne({
      where: { id: id },
      relations: ['inviter'],
    });
  }
}

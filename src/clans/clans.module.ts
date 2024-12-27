import { Module } from '@nestjs/common';
import { ClansService } from './clans.service';
import { ClansController } from './clans.controller';
import { ClanInvitation } from './entities/clan-invitation.entity';
import { ClanMember } from './entities/clan-member.entity';
import { ClanRequest } from './entities/clan-request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClansRepository } from './clans.repository';
import { ClanRequestRepository } from './clan-request.repository';
import { ClanInvitationRepository } from './clan-invitation.repository';
import { ClanMemberRepository } from './clan-member.repository';
import { UsersModule } from 'src/users/users.module';
import { Clan } from './entities/clan.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clan, ClanInvitation, ClanMember, ClanRequest]),
    UsersModule,
  ],
  providers: [
    ClansService,
    ClansRepository,
    ClanRequestRepository,
    ClanInvitationRepository,
    ClanMemberRepository,
    JwtAuthGuard,
  ],
  controllers: [ClansController],
})
export class ClansModule {}

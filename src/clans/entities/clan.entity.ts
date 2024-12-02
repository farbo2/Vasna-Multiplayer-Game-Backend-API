import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ClanMember } from './clan-member.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Clan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  leader: User;

  @Column()
  logo: string;

  @OneToMany(() => ClanMember, (clanMember) => clanMember.clan, {
    cascade: true,
  })
  members: ClanMember[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

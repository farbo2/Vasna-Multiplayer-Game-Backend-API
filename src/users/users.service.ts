import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';

export interface CreateUserInput {
  username: string;
  deviceId: string;
  password: string;
  fullName?: string;
  email?: string;
}

export interface UpdateUserInput {
  username?: string;
  fullName?: string;
  email?: string;
  password?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.users.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();
    if (!user) throw new UnauthorizedException('Invalid username or password');
    const passwordMatches = await bcrypt.compare(password, user.password).catch(() => false);
    if (!passwordMatches) {
      // Upgrade legacy plaintext credentials once, after a successful legacy login.
      if (password !== user.password) throw new UnauthorizedException('Invalid username or password');
      user.password = await bcrypt.hash(password, 12);
      await this.users.save(user);
    }
    const accessToken = await this.jwtService.signAsync({ sub: user.id, role: user.role || 'user' });
    const { password: _password, ...safeUser } = user;
    return { accessToken, tokenType: 'Bearer', expiresIn: 3600, user: safeUser };
  }

  async findAll(): Promise<User[]> {
    return this.users.find({ order: { id: 'ASC' } });
  }

  async findById(id: number): Promise<User> {
    const user = await this.users.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(input: CreateUserInput): Promise<User> {
    const existing = await this.users.findOne({
      where: [{ username: input.username }, ...(input.email ? [{ email: input.email }] : []), { deviceId: input.deviceId }],
    });
    if (existing) throw new ConflictException('Username, email, or device is already registered');

    const user = this.users.create({
      ...input,
      password: await bcrypt.hash(input.password, 12),
    });
    const saved = await this.users.save(user);
    return this.findById(saved.id);
  }

  async update(id: number, input: UpdateUserInput): Promise<User> {
    const user = await this.findById(id);
    if (input.username !== undefined) user.username = input.username;
    if (input.fullName !== undefined) user.fullName = input.fullName;
    if (input.email !== undefined) user.email = input.email;
    if (input.password) user.password = await bcrypt.hash(input.password, 12);
    await this.users.save(user);
    return this.findById(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findById(id);
    await this.users.remove(user);
    return { message: 'User deleted successfully' };
  }
}

import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Request } from 'express';
import { JwtAuthGuard, AuthenticatedUser } from '../guards/jwt-auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Public } from '../auth/public.decorator';

class CreateUserDto {
  @IsString() @IsNotEmpty() username: string;
  @IsString() @IsNotEmpty() deviceId: string;
  @IsString() @MinLength(8) password: string;
  @IsOptional() @IsString() fullName?: string;
  @IsOptional() @IsEmail() email?: string;
}

class LoginDto {
  @IsString() @IsNotEmpty() username: string;
  @IsString() @MinLength(8) password: string;
}

class UpdateUserDto {
  @IsOptional() @IsString() @IsNotEmpty() username?: string;
  @IsOptional() @IsString() fullName?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() @MinLength(8) password?: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUsers(@Req() req: Request & { user: AuthenticatedUser }) {
    if (req.user.role !== 'admin') throw new ForbiddenException('Administrator access required');
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getUserById(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    if (req.user.id !== id && req.user.role !== 'admin') throw new ForbiddenException();
    return this.usersService.findById(id);
  }

  @Post('login')
  @Public()
  login(@Body() body: LoginDto) {
    return this.usersService.login(body.username, body.password);
  }

  @Post()
  @Public()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto, @Req() req: Request & { user: AuthenticatedUser }) {
    if (req.user.id !== id && req.user.role !== 'admin') throw new ForbiddenException();
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  removeUser(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    if (req.user.id !== id && req.user.role !== 'admin') throw new ForbiddenException();
    return this.usersService.remove(id);
  }
}

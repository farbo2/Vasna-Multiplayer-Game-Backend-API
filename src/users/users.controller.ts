import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers() {}

  @Get('/:id')
  getUserById(@Param('id') id: number) {}

  @Post()
  createUser(@Body() body: any) {}

  @Patch()
  updateUser(@Param('id') id: number, @Body() body: any) {}

  @Delete('/:id')
  removeUser(@Param('id') id: number) {}
}

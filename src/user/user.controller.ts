// src/users/users.controller.ts
import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entity/user.entity';
import { UpdatePointsDto } from './dto/update-point.dto';
import { UsersService } from './user.service';
import { Point } from 'src/entity/point.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Put(':id/points') // Endpoint to update user points
  updatePoints(@Param('id') id: string, @Body() updatePointsDto: UpdatePointsDto): Promise<Point> {
    return this.usersService.updatePoints(+id, updatePointsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}

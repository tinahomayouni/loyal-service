import { Controller, Post, Get, Param, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entity/user.entity';
import { UpdatePointsDto } from './dto/update-point.dto';
import { UsersService } from './user.service';
import { Point } from 'src/entity/point.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/user-roles.decorator';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  @ApiBearerAuth()
  @Roles('super-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @ApiOperation({ summary: 'Create a new user' })
@ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
        example: {
            message: 'User created successfully',
            user: {
                id: 1,
                email: 'user@example.com',
                name: 'John Doe',
                level: 1,
                badge: 'bronze',
                role: 'customer',
                points: 100
            }
        }
    }
})
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @Roles('super-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @ApiOperation({ summary: 'Retrieve all users' })
@ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully',
    schema: {
        example: [
            {
                id: 1,
                email: 'user1@example.com',
                name: 'John Doe',
                level: 1,
                badge: 'bronze',
                role: 'customer',
                points: 150
            },
            {
                id: 2,
                email: 'user2@example.com',
                name: 'Jane Smith',
                level: 2,
                badge: 'silver',
                role: 'admin',
                points: 200
            }
        ]
    }
})
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles('super-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @ApiOperation({ summary: 'Retrieve a user by ID' })
@ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    schema: {
        example: {
            id: 1,
            email: 'user@example.com',
            name: 'John Doe',
            level: 1,
            badge: 'bronze',
            role: 'customer',
            points: 100
        }
    }
})
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Put(':id/points') // Endpoint to update user points
  @ApiBearerAuth()
  @Roles('super-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @ApiOperation({ summary: 'Update user points' })
@ApiResponse({
    status: 200,
    description: 'User points updated successfully',
    schema: {
        example: {
            message: 'Points updated successfully',
            user: {
                id: 1,
                email: 'user@example.com',
                points: 200,
                badge: 'silver'
            }
        }
    }
})
  updatePoints(@Param('id') id: string, @Body() updatePointsDto: UpdatePointsDto): Promise<Point> {
    const { points } = updatePointsDto;  // Extract the points from DTO
    return this.usersService.updatePoints(+id, points);  // Pass points to the service
  }
  @Put(':id')
  @ApiBearerAuth()
  @Roles('super-admin') // Guarded by role
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update a user\'s information' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: {
      example: {
        message: 'User updated successfully',
        user: {
          id: 1,
          email: 'updated@example.com',
          level: 2,
          badge: 'silver',
          role: 'admin',
        },
      },
    },
  })
  async update(
    @Param('id') id: number, 
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  @ApiBearerAuth()
  @Roles('super-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)  
  
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}

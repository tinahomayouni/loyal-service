import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UsersService } from './user.service';
import { Point } from 'src/entity/point.entity';
import { UsersController } from './user.controller';
import { Role } from 'src/entity/role.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Point, Role]), // Register both User and UserPoint
    ],
    providers: [UsersService],
    exports: [UsersService, TypeOrmModule],
    controllers:[UsersController]
})
export class UserModule {}

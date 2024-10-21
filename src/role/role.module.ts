import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Point } from 'src/entity/point.entity';
import { RolesService } from './role.service';
import { Role } from 'src/entity/role.entity';
import { Permission } from 'src/entity/permission.entity';
import { RolesController } from './role.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role, Permission]), // Register both User and UserPoint
    ],
    providers: [RolesService],
    exports: [RolesService, TypeOrmModule],
    controllers:[RolesController]
})
export class RolesModule {}

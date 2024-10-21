// roles.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './role.service';
import { Role } from 'src/entity/role.entity';
import { Permission } from 'src/entity/permission.entity';
import { RolesController } from './role.controller';
import { APP_GUARD } from '@nestjs/core';
import { PermissionService } from 'src/permission/permission.service';
import { PermissionController } from 'src/permission/permission.controller';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role, Permission]), // Register Role and Permission entities
    ],
    providers: [
        RolesService,
        PermissionService, // Include PermissionService
        {
            provide: APP_GUARD,
            useClass: PermissionsGuard, // Register the PermissionsGuard
        },
    ],
    exports: [RolesService, PermissionService, TypeOrmModule], // Export PermissionService if needed
    controllers: [RolesController, PermissionController], // Register the PermissionController
})
export class RolesModule {}

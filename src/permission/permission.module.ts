// permission.module.ts (if you create a separate module)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/entity/permission.entity'; // Adjust the path as necessary
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Permission]), // Register the Permission entity
    ],
    providers: [PermissionService],
    controllers: [PermissionController], // Register the PermissionController
    exports: [PermissionService],
})
export class PermissionModule {}

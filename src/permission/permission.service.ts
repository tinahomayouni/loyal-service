// permission.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entity/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    ) {}

    // Method to create static permissions
    async createStaticPermissions() {
        const staticPermissions = [
            { name: "View All" },
            { name: "Manage Roles" },
            { name: "Manage Users" },
            { name: "Manage Transactions" }
        ];

        const existingPermissions = await this.permissionRepository.find();
        
        if (existingPermissions.length > 0) {
            console.log('Static permissions already exist. Skipping creation.');
            return existingPermissions; // Return existing permissions if they already exist
        }

        const permissionsToSave = staticPermissions.map(permission => this.permissionRepository.create(permission));
        return await this.permissionRepository.save(permissionsToSave);
    }
}

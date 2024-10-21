// permission.controller.ts
import { Controller, Post } from '@nestjs/common';
import { PermissionService } from './permission.service'; // Adjust the path as necessary

@Controller('permissions')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Post('create-static') // Route to create static permissions
    async createStaticPermissions() {
        const createdPermissions = await this.permissionService.createStaticPermissions();
        return { message: 'Static permissions processed.', permissions: createdPermissions };
    }
}

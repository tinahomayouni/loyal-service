// src/roles/roles.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RolesService } from './role.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorator/permissions.decorator';

@ApiTags('roles')
@Controller('roles')
@UseGuards(RolesGuard, PermissionsGuard) // Use both role and permission guards

export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @ApiResponse({ status: 201, description: 'Role created successfully' })
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    @Permissions('View All') // Require "View All" permission
    @ApiResponse({ status: 200, description: 'List of roles' })
    findAll() {
        return this.rolesService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Role details' })
    findOne(@Param('id') id: string) {
        return this.rolesService.findOne(+id);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Role updated successfully' })
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(+id, updateRoleDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Role deleted successfully' })
    remove(@Param('id') id: string) {
        return this.rolesService.remove(+id);
    }
}

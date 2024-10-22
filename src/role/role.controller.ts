import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RolesService } from './role.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorator/permissions.decorator';
import { Role } from 'src/entity/role.entity';

@ApiTags('roles')
@Controller('roles')
@UseGuards(RolesGuard, PermissionsGuard)
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @ApiResponse({ status: 201, description: 'Role created successfully', type: Role })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'List of roles', type: [Role] })
    @ApiResponse({ status: 404, description: 'No roles found' })
    findAll() {
        return this.rolesService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Role details', type: Role })
    @ApiResponse({ status: 404, description: 'Role not found' })
    findOne(@Param('id') id: string) {
        return this.rolesService.findOne(+id);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Role updated successfully', type: Role })
    @ApiResponse({ status: 404, description: 'Role not found' })
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(+id, updateRoleDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Role deleted successfully' })
    @ApiResponse({ status: 404, description: 'Role not found' })
    remove(@Param('id') id: string) {
        return this.rolesService.remove(+id);
    }
}

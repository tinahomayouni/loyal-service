import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Permissions } from 'src/common/decorator/permissions.decorator';

@Controller('permissions')

export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    const permission = await this.permissionService.create(createPermissionDto);
    return { message: 'Permission created successfully', permission };
  }

  @Get()
  async findAll() {
    const permissions = await this.permissionService.findAll();
    return { message: 'Permissions retrieved successfully', permissions };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const permission = await this.permissionService.findOne(id);
    return { message: 'Permission retrieved successfully', permission };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePermissionDto: UpdatePermissionDto) {
    const updatedPermission = await this.permissionService.update(id, updatePermissionDto);
    return { message: 'Permission updated successfully', updatedPermission };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.permissionService.remove(id);
    return { message: 'Permission deleted successfully' };
  }
}

// src/roles/dto/update-role.dto.ts
import { IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'admin', description: 'Name of the role' }) // Example for role name
    name?: string;

    @IsOptional()
    @IsArray()
    @ApiProperty({ type: [String], example: ['View All', 'Manage Users'], description: 'List of permission names' }) // Example for permissions
    permissions?: string[]; // Change from number[] to string[]
}

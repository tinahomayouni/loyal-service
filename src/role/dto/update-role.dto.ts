// src/roles/dto/update-role.dto.ts
import { IsOptional, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRoleDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsArray()
    permissions?: number[]; // Assuming permissions are defined by their IDs
}

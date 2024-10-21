// src/roles/dto/create-role.dto.ts
import { IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ example: 'admin', description: 'Name of the role' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ type: [Number], description: 'List of permission IDs' })
    @IsArray()
    @IsOptional()
    permissions?: number[]; // Change from string[] to number[]
}

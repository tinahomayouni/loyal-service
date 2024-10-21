// src/roles/dto/create-role.dto.ts
import { IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ example: 'admin', description: 'Name of the role' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ 
        type: [String], 
        description: 'List of permission names', 
        example: ['View All'] // Set example value for permissions
    })
    @IsArray()
    @IsOptional()
    permissions?: string[]; // Change from number[] to string[]
}

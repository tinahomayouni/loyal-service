import { IsNotEmpty, IsArray, IsInt, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
    @ApiProperty({ example: 'Admin', description: 'Name of the role' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ 
        example: [1, 2, 3], 
        description: 'Array of permission IDs', 
        type: [Number] 
    })
    @IsArray()
    @ArrayNotEmpty() // Ensure it's not an empty array
    @IsInt({ each: true }) // Ensure each element is a number
    permissions: number[]; // Permissions as array of IDs
}

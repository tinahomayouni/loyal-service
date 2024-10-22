import { IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({
        example: 'Admin',
        description: 'The name of the role',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: ['CREATE_USER', 'DELETE_USER', 'EDIT_PROFILE'],
        description: 'List of permission names associated with this role',
        type: [String],
    })
    @IsArray()
    permissions: string[]; // Assuming permissions are received as an array of strings
}

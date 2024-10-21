import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ example: 'Admin', description: 'The name of the role' })
    name: string;

    @ApiProperty({ 
        example: ['View All', 'Manage Users'], 
        description: 'Array of permission names associated with the role',
        type: [String]
    })
    permissions: string[];
}

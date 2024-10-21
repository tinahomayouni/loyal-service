import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty({ example: 'Super Admin', description: 'Updated name of the role' })
    name?: string;

    @ApiProperty({ 
        example: ['Manage Roles'], 
        description: 'Array of permission names to be updated for the role',
        type: [String]
    })
    permissions?: string[];
}

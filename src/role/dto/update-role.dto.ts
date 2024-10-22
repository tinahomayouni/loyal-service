import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty({ 
        example: 'Super Admin', 
        description: 'Updated name of the role (optional)', 
        required: false // Indicating that this field is optional
    })
    name?: string;

    @ApiProperty({ 
        example: ['Manage Roles', 'View Reports'], 
        description: 'Array of permission names to be updated for the role (optional)', 
        type: [String],
        required: false // Indicating that this field is optional
    })
    permissions?: string[];
}

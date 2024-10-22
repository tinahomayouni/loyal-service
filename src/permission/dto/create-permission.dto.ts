import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'READ_USERS',
    description: 'The name of the permission',
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    example: 'Allows company as a user level 2',
    description: 'A brief description of the permission',
    required: false,
  })
  description?: string;
}

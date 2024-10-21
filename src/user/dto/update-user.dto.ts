import { IsEmail, IsNotEmpty, MinLength, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description: 'Password for the user account',
    required: false,
  })
  @IsNotEmpty()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiProperty({
    example: 2,
    description: 'User level',
    required: false,
  })
  @IsOptional()
  level?: number;

  @ApiProperty({
    example: 'gold',
    description: 'User badge level (bronze, silver, gold)',
    required: false,
  })
  @IsOptional()
  badge?: string;

  @ApiProperty({
    example: 'customer',
    description: 'Role of the user (admin or customer)',
    required: false,
  })
  @IsIn(['admin', 'customer'], {
    message: 'Role must be either admin or customer',
  })
  @IsOptional()
  role?: string;
}

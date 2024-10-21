import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'newuser@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'securePassword123!',
    description: 'Password for the user account',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'customer',
    description: 'User role',
    default: 'customer'
  })
  @IsOptional()
  @IsString()
  role: string | 'customer';
}

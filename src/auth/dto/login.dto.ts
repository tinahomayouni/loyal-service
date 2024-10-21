import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { RegisterUserDto } from './register.dto';

export class LoginUserDto extends PartialType(RegisterUserDto) {
 
    @ApiProperty({
        example: 'John Doe',
        description: 'The full name of the user',
      })
      @IsString()
      @IsNotEmpty()
      name: string;
    
      @ApiProperty({
        example: 'supradmin@example.com',
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
        example: 'super-admin',
        description: 'User role',
        default: 'customer'
      })
      @IsOptional()
      @IsString()
      role: string | 'customer';
    
}

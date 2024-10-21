import { IsEmail, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../user/dto/create-user.dto'; // Adjust the import path as necessary
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto extends PartialType(CreateUserDto) {
 
    @ApiProperty({
        example: 'superadmin1@example.com',
        description: 'The email address of the user',
      })
      @IsEmail()
      email: string;
    
      @ApiProperty({
        example: 'superadmin12345',
        description: 'Password for the user account',
      })
      @IsNotEmpty()
      password: string;
    
}

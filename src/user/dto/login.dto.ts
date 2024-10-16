import { IsEmail, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto'; // Adjust the import path as necessary

export class LoginUserDto extends PartialType(CreateUserDto) {
 
}

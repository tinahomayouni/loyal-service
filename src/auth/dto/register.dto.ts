import { IsEmail, IsNotEmpty, IsArray } from 'class-validator';

export class RegisterUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsArray()
    roles: number[]; // Expecting an array of role IDs, not names
}

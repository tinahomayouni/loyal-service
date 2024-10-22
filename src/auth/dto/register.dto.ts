import { IsEmail, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'The email of the user',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'StrongPassword123!',
        description: 'The password of the user. Must be strong and secure.',
    })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        example: [1, 2], // Example of role IDs
        description: 'An array of role IDs assigned to the user',
        type: [Number],
    })
    @IsArray()
    roles: number[];
}

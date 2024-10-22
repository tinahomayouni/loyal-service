import { IsEmail, IsOptional, IsIn, IsArray, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNotEmpty()
    @MinLength(6)
    password?: string;

    @IsOptional()
    level?: number;

    @IsOptional()
    badge?: string;

    @IsOptional()
    @IsIn(['admin', 'customer'], {
        message: 'Role must be either admin or customer',
    })
    role?: string;

    @IsOptional()
    @IsArray()
    roles?: number[]; // Assuming you're passing role IDs
}

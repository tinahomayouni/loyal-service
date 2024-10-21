import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    address?: string;

    @IsOptional()
    @IsEmail()
    contactEmail?: string;
}

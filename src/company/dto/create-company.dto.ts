import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
    @ApiProperty({
        example: 'Tech Solutions Inc.', // Example for Swagger documentation
        description: 'The name of the company',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: '1234 Main St, Tech City', // Example for Swagger documentation
        description: 'The address of the company',
        required: false, // Indicates this field is optional
    })
    @IsOptional()
    address?: string;

    @ApiProperty({
        example: 'contact@techsolutions.com', // Example for Swagger documentation
        description: 'The contact email for the company',
        required: false, // Indicates this field is optional
    })
    @IsOptional()
    @IsEmail()
    contactEmail?: string;
}

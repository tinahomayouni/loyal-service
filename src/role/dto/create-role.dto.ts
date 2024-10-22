import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateRoleDto {
    @IsNotEmpty()
    name: string;

    @IsArray()
    permissions: string[]; // Assuming permissions are received as an array of strings
}

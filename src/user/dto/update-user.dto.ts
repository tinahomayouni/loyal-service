// src/users/dto/update-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength, IsIn, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsOptional()
  level?: number;

  @IsOptional()
  badge?: string;

  @IsIn(['admin', 'customer'], {
    message: 'Role must be either admin or customer',
  })
  @IsOptional()
  role?: string;
}

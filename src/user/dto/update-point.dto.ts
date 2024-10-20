// src/users/dto/update-points.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePointsDto {
  @IsNotEmpty()
  @IsNumber()
  points: number; // Specify the points to be added or updated
}
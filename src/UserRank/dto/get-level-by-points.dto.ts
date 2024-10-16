// src/userRank/dto/get-level-by-points.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetLevelByPointsDto {
    @IsNotEmpty()
    @IsInt()
    totalPoints: number;
}

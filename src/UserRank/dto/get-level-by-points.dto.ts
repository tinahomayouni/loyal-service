import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetLevelByPointsDto {
    @ApiProperty({ 
        example: 175, 
        description: 'Total points of the user'
    })
    @IsNotEmpty()
    @IsInt()
    totalPoints: number;
}

import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePointsDto {
  @ApiProperty({
    example: 50,
    description: 'Number of points to be added or updated',
  })
  @IsNotEmpty()
  @IsNumber()
  points: number;
}

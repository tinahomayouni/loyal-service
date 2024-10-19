import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsIn } from 'class-validator';

export class ChangeUserLevelDto {
    @ApiProperty({
        description: 'ID of the user whose level will be changed',
        example: 1,  // Example user ID
    })
    @IsNumber()
    userId: number;

    @ApiProperty({
        description: 'New badge for the user',
        example: 'silver',  // Example badge
        enum: ['bronze', 'silver', 'gold'],  // Enums for valid values
    })
    @IsString()
    @IsIn(['bronze', 'silver', 'gold'], {
        message: 'Badge must be one of the following: bronze, silver, gold',
    })
    newBadge: string;
}

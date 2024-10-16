import { Controller, Get, BadRequestException } from '@nestjs/common';
import { UserRankService } from './userRank.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('user-rank')
@Controller('user-rank')
export class UserRankController {
    constructor(private readonly userRankService: UserRankService) {}

    @Get('bronze')
    @ApiOperation({ summary: 'Get bronze users with score range 0 - 100' })
    @ApiResponse({
        status: 200,
        description: 'List of bronze users with score range.',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        schema: {
            example: {
                message: 'No bronze users found',
                error: 'Bad Request',
                statusCode: 400,
            },
        },
    })
    async getBronzeUsers() {
        const badge = 'bronze';
        const users = await this.userRankService.getUsersByBadge(badge);
        const scoreRange = await this.userRankService.getScoreRange(badge);

        if (!users.length) {
            throw new BadRequestException('No bronze users found');
        }

        return {
            badge,
            scoreRange,
            users,
        };
    }

    @Get('silver')
    @ApiOperation({ summary: 'Get silver users with score range 101 - 250' })
    @ApiResponse({
        status: 200,
        description: 'List of silver users with score range.',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        schema: {
            example: {
                message: 'No silver users found',
                error: 'Bad Request',
                statusCode: 400,
            },
        },
    })
    async getSilverUsers() {
        const badge = 'silver';
        const users = await this.userRankService.getUsersByBadge(badge);
        const scoreRange = await this.userRankService.getScoreRange(badge);

        if (!users.length) {
            throw new BadRequestException('No silver users found');
        }

        return {
            badge,
            scoreRange,
            users,
        };
    }

    @Get('gold')
    @ApiOperation({ summary: 'Get gold users with score range 251 and above' })
    @ApiResponse({
        status: 200,
        description: 'List of gold users with score range.',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        schema: {
            example: {
                message: 'No gold users found',
                error: 'Bad Request',
                statusCode: 400,
            },
        },
    })
    async getGoldUsers() {
        const badge = 'gold';
        const users = await this.userRankService.getUsersByBadge(badge);
        const scoreRange = await this.userRankService.getScoreRange(badge);

        if (!users.length) {
            throw new BadRequestException('No gold users found');
        }

        return {
            badge,
            scoreRange,
            users,
        };
    }
}

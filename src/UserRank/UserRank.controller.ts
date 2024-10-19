import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserRankService } from './userRank.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('user-rank')
@Controller('user-rank')
export class UserRankController {
    constructor(private readonly userRankService: UserRankService) {}

    @UseGuards(JwtAuthGuard)  // Protect this route with JWT Auth
    @Get('bronze')
    @ApiOperation({ summary: 'Get bronze users with score range 0 - 100' })
    @ApiResponse({
        status: 200,
        description: 'List of bronze users with score range.',
    })
    async getBronzeUsers() {
        const badge = 'bronze';
        const users = await this.userRankService.getUsersByBadge(badge);
        const scoreRange = await this.userRankService.getScoreRange(badge);

        return {
            badge,
            scoreRange,
            users,
        };
    }
    @UseGuards(JwtAuthGuard)
    @Get('silver')
    @ApiOperation({ summary: 'Get silver users with score range 101 - 250' })
    @ApiResponse({
        status: 200,
        description: 'List of silver users with score range.',
    })
    async getSilverUsers() {
        const badge = 'silver';
        const users = await this.userRankService.getUsersByBadge(badge);
        const scoreRange = await this.userRankService.getScoreRange(badge);

        return {
            badge,
            scoreRange,
            users,
        };
    }


    @Post('gold')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async getGoldUsers(@Request() req) {
        const userDetails = req.user; // Assuming the user information is attached by JwtAuthGuard
        const badge = 'gold';
        const users = await this.userRankService.getUsersByBadge(badge);
        const scoreRange = await this.userRankService.getScoreRange(badge);

        return {
            badge,
            scoreRange,
            users,
        };
    }

}

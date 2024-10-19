import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserRankService } from './userRank.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('user-rank')
@Controller('user-rank')
export class UserRankController {
    constructor(private readonly userRankService: UserRankService) {}

    @Post('bronze')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async  getBronzeUsers(@Request() req) {
        const badge = 'bronze';
        const users = await this.userRankService.getUsersByBadge(badge);
        const scoreRange = await this.userRankService.getScoreRange(badge);

        return {
            badge,
            scoreRange,
            users,
        };
    }
    @Post('silver')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async getSilverUsers(@Request() req) {
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

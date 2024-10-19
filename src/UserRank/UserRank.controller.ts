import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UserRankService } from './userRank.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorator/user-roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ChangeUserLevelDto } from './dto/change-user-level.dto';

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
 
  @Patch('change-level')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)  @ApiOperation({ summary: 'Change the level of a user' })
  @ApiResponse({
      status: 200,
      description: 'User level changed successfully',
      schema: {
          example: {
              message: 'User level changed successfully',
              user: {
                  id: 1,
                  email: 'user@example.com',
                  badge: 'silver',
                  // other user properties
              },
          },
      },
  })
  async changeUserLevel(@Body() changeUserLevelDto: ChangeUserLevelDto) {
      const { userId, newBadge } = changeUserLevelDto;
      const updatedUser = await this.userRankService.changeUserLevel(userId, newBadge);
      return {
          message: 'User level changed successfully',
          user: updatedUser,
      };
  }
}

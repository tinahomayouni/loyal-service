import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserRankController } from './userRank.controller';
import { UserRankService } from './userRank.service';
import { ScoreRangeDAO } from './dao/score-range.dao'; // Ensure this import is correct

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), // Ensure User entity is registered here
    ],
    controllers: [UserRankController],
    providers: [UserRankService, ScoreRangeDAO], // Register your service here
})
export class UserRankModule {}

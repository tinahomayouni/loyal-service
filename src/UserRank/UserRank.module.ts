// src/userRank/userRank.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserRankController } from './userRank.controller';
import { UserRankService } from './userRank.service';
import { ScoreRangeDAO } from './dao/score-range.dao';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), // Ensure User entity is registered here
    ],
    controllers: [UserRankController],
    providers: [UserRankService, ScoreRangeDAO], // Register your service and DAO here
})
export class UserRankModule {}

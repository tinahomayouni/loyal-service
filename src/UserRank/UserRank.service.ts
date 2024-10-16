import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { ScoreRangeDAO } from './dao/score-range.dao';

@Injectable()
export class UserRankService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getUsersByBadge(badge: string): Promise<User[]> {
        // Retrieve all users from the database
        const users = await this.userRepository.find();

        // Filter users based on the badge
        const filteredUsers = users.filter(user => user.badge === badge);
        return filteredUsers;
    }

    async getScoreRange(badge: string): Promise<string> {
        return ScoreRangeDAO.getScoreRange(badge); // Call static method directly
    }

    async categorizeUserLevel(totalPoints: number): Promise<{ level: number; badge: string }> {
        let level: number;
        let badge: string;

        if (totalPoints > 0 && totalPoints <= 100) {
            level = 1; // Bronze
            badge = 'bronze';
        } else if (totalPoints > 100 && totalPoints <= 250) {
            level = 2; // Silver
            badge = 'silver';
        } else if (totalPoints > 250) {
            level = 3; // Gold
            badge = 'gold';
        } else {
            throw new Error('Invalid total points');
        }

        return { level, badge };
    }
    async getLevelByPoints(totalPoints: number): Promise<{ level: number; badge: string }> {
        return this.categorizeUserLevel(totalPoints);
    }

       
}

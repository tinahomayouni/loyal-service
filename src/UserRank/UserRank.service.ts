import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { ScoreRangeDAO } from './dao/score-range.dao';
import { UserLevelDAO } from './dao/user-level.dao';

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
        return UserLevelDAO.getUserLevelAndBadge(totalPoints); // Use DAO method
    }

    async getLevelByPoints(totalPoints: number): Promise<{ level: number; badge: string }> {
        return this.categorizeUserLevel(totalPoints);
    }
    async changeUserLevel(userId: number, newBadge: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        user.badge = newBadge; // Update the user's badge
        return this.userRepository.save(user); // Save the updated user
    }
    
}

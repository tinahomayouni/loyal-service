import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from 'src/entity/point.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRankService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Point)
    private pointRepository: Repository<Point>,
  ) {}

  async categorizeUserByPoints(userId: number): Promise<User> {
    const points = await this.pointRepository
      .createQueryBuilder('point')
      .select('SUM(point.points)', 'totalPoints')
      .where('point.userId = :userId', { userId })
      .getRawOne();

    const totalPoints = parseInt(points.totalPoints, 10) || 0;

    let level = '';
    if (totalPoints > 0 && totalPoints <= 100) {
      level = 'bronze';
    } else if (totalPoints > 100 && totalPoints <= 250) {
      level = 'silver';
    } else if (totalPoints > 250 && totalPoints <= 300) {
      level = 'gold';
    }

    // Update user's level and save in database
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      user.badge = level;
      user.level = totalPoints; // Optional: Save total points as level
      return this.userRepository.save(user);
    }

    throw new Error('User not found');
  }
}

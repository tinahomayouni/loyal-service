import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from 'src/entity/point.entity';
import { User } from 'src/entity/user.entity';
import { UserRankService } from './UserRank.service';
import { UserRankController } from './UserRank.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Point]), // Register User and Point entities
  ],
  controllers: [UserRankController], // Register the controller
  providers: [UserRankService], // Register the service
})
export class UserRankModule {}

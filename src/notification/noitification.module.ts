import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity'; // Also import the User entity
import { NotificationsService } from './notification.service';
import { Notification } from '../entity/notification.entity';
import { NotificationsController } from './notification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService], // Export if needed in other modules
})
export class NotificationsModule {}

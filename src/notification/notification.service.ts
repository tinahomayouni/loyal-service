// src/notifications/notifications.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entity/notification.entity';
import { User } from '../entity/user.entity'; // Import User entity

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createNotification(userId: number, message: string): Promise<Notification> {
    // Use the correct syntax for findOne with where clause
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const notification = this.notificationsRepository.create({
      user, // Use the user entity
      message,
      createdAt: new Date(),
    });
    
    return this.notificationsRepository.save(notification);
  }

  async getNotifications(userId: number): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(notificationId: number): Promise<Notification> {
    // Use the correct syntax for findOne with a where clause for notificationId
    const notification = await this.notificationsRepository.findOne({ where: { id: notificationId } });
  
    if (!notification) {
      throw new Error('Notification not found');
    }
  
    notification.isRead = true;
    return this.notificationsRepository.save(notification);
  }
  
}

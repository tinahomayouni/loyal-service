// src/notifications/notification.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../entity/user.entity'; // Import User entity

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({  nullable: true })
  message: string; // The notification message

  @Column()
  createdAt: Date; // When the notification was created

  @Column({ default: false })
  isRead: boolean; // Whether the notification has been read
  
  @ManyToOne(() => User, (user) => user.notifications) // Establish relation with User entity
  user: User; // The user receiving the notification
}

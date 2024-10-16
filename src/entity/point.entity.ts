import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  points: number;

  @CreateDateColumn()
  earnedAt: Date;

  @ManyToOne(() => User, (user) => user.points, { onDelete: 'CASCADE' })
  user: User;
}

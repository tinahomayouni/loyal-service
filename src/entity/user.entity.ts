import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Point } from './point.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Ensures email is unique
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Column({ type: 'int', default: 1 }) // Default level set to 1
  level: number; // Level will be 1, 2, or 3

  @Column({ type: 'varchar', default: 'bronze' }) // Default badge set to 'bronze'
  badge: string; // Badge will be 'bronze', 'silver', or 'gold'

  @CreateDateColumn() // Automatically sets the date when the entity is created
  createdAt: Date;

  @UpdateDateColumn() // Automatically sets the date when the entity is updated
  updatedAt: Date;

  @OneToMany(() => Point, (point) => point.user) // Relation with Point entity
  points: Point[];
}

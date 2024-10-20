// src/files/file.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalname: string; // Ensure this property exists

  @Column()
  filename: string; // Ensure this property exists

  @Column()
  size: number; // Ensure this property exists

  @Column()
  path: string;

  @Column()
  mimetype: string; // Ensure this property exists

  @ManyToOne(() => User, (user) => user.files) // Relation with User
  user: User; // Define the user relationship
}

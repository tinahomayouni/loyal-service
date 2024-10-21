import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;
 

    @ManyToOne(() => User, (user) => user.transactions) 
    user: User; 
}

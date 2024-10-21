// src/entity/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength, IsIn } from 'class-validator';
import { Point } from './point.entity';
import { File } from './file.entity';
import { Notification } from './notification.entity';
import { Role } from './role.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true , nullable: true })
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @Column({ type: 'int', default: 1 })
    level: number;

    @Column({ type: 'varchar', default: 'bronze' })
    badge: string;

    @Column({ type: 'varchar', default: 'customer', nullable: true  })
    @IsIn(['admin', 'customer'], {
        message: 'Role must be either admin or customer',
    })
    role: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Point, (point) => point.user)
    points: Point[];
    

    @OneToMany(() => File, (file) => file.user)
    files: File[];

    @OneToMany(() => Notification, (noitification) => noitification.user)
    notifications: Notification[];

    // Users can have many roles
    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[];

    // Users can have many transactions
    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[];
 
}


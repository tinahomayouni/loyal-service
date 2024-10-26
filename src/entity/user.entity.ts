// src/entity/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable, ManyToOne} from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength, IsIn } from 'class-validator';
import { Point } from './point.entity';
import { File } from './file.entity';
import { Notification } from './notification.entity';
import { Role } from './role.entity';
import { Transaction } from './transaction.entity';
import { Company } from './company.entity';
import { SuperAdmin } from './super-admin.entity';

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
    @ManyToMany(() => Role, (role) => role.users, { eager: true })
    @JoinTable()
    roles: Role[];


    // Users can have many transactions
    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[];

    @ManyToOne(() => Company, company => company.users)
    company: Company;

    @ManyToOne(() => SuperAdmin, (superAdmin) => superAdmin.users)
    superAdmin: SuperAdmin;
}


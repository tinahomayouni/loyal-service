import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { SuperAdmin } from './super-admin.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    contactEmail: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => SuperAdmin, (superAdmin) => superAdmin.companies)
    superAdmin: SuperAdmin;

    @OneToMany(() => User, (user) => user.company)
    users: User[];

    @OneToMany(() => Role, (role) => role.company)
    roles: Role[];
}

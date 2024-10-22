import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Company } from './company.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity()
export class SuperAdmin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Company, (company) => company.superAdmin)
    companies: Company[];

    @ManyToMany(() => Role, (role) => role.users, { eager: true })
@JoinTable()
roles: Role[];

    @OneToMany(() => User, (user) => user.superAdmin)
    users: User[];
}

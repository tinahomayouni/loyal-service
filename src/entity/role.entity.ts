import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    // Roles can have many permissions
    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable()

    permissions: Permission[];

    // Roles can belong to many users
    @ManyToMany(() => User, (user) => user.role)
    users: User[];
}

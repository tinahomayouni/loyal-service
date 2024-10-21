import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    // Many permissions can belong to many roles
    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];
}

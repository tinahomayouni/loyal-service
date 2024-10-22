import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';
import { Company } from './company.entity';
import { SuperAdmin } from './super-admin.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
   

    // Roles can belong to many users
    @ManyToMany(() => User, (users) => users.roles)
    users: User[];
    @ManyToOne(() => Company, company => company.roles)
  company: Company;

  @ManyToOne(() => SuperAdmin, (superAdmin) => superAdmin.roles)
  superAdmin: SuperAdmin;

  
  @ManyToMany(() => Permission, permission => permission.roles)
  @JoinTable()

  permissions: Permission[]; // Ensure this is an array of Permission entities
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity'; // Make sure to import the Role entity

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Ensures each permission name is unique
  name: string;

  @Column({ nullable: true }) // Description is optional
  description?: string; // Mark as optional for clarity

  @ManyToMany(() => Role, role => role.permissions) // Establishing a many-to-many relationship
  roles: Role[]; // This creates a back-reference to roles associated with this permission
}

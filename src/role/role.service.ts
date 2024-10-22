import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from 'src/entity/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permission } from 'src/entity/permission.entity';
@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) {}


    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const permissions = await this.permissionRepository.find({where:{ name: In(createRoleDto.permissions)} });
        
console.log(permissions, 'permissions');
        const role = this.roleRepository.create({
            ...createRoleDto,
            permissions,
        });

        return this.roleRepository.save(role);
    }

    async findAll(): Promise<Role[]> {
        return await this.roleRepository.find({ relations: ['permissions'] });
    }

    async findOne(id: number): Promise<Role> {
        const role = await this.roleRepository.findOne({
            where: { id },
            relations: ['permissions'],
        });
      


        if (!role) {
            throw new Error('Role not found');
        }

        return role;
    }

    async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
        const role = await this.findOne(id);

        // Create an object to hold the updates
        const updates: Partial<Role> = {};
    
        if (updateRoleDto.name) {
            updates.name = updateRoleDto.name;
        }
    
        if (updateRoleDto.permissions) {
            const permissions = await this.permissionRepository.findByIds(updateRoleDto.permissions);
            updates.permissions = permissions;
        }
    
        // Only perform the update if there are changes
        if (Object.keys(updates).length > 0) {
            Object.assign(role, updates);
            await this.roleRepository.save(role);
        }
    
        return role;
    }

    async remove(id: number): Promise<void> {
        await this.roleRepository.delete(id);
    }

    async createRole(name: string, permissions: string[]): Promise<Role> {
        // Fetch permissions from the database based on the provided names
        const permissionsEntities = await this.permissionRepository.findByIds(
            permissions.map(name => ({ name }))
        );

        // Create a new role with the given name and fetched permissions
        const newRole = this.roleRepository.create({
            name,
            permissions: permissionsEntities,
        });

        // Save the new role to the database
        return await this.roleRepository.save(newRole);
    }
}

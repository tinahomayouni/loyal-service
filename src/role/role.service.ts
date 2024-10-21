// src/roles/roles.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        private readonly permissionRepository: Repository<Permission>, // Inject Permission repository
    ) {}

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        // Convert permission names to permission entities
        const permissions = createRoleDto.permissions
            ? await this.permissionRepository.findByIds(createRoleDto.permissions.map(name => ({ name })))
            : [];

        const role = this.roleRepository.create({
            ...createRoleDto,
            permissions, // Assign the found permissions
        });

        return this.roleRepository.save(role);
    }



    async findAll(): Promise<Role[]> {
        return await this.roleRepository.find({ relations: ['permissions'] });
    }

    async findOne(id: number): Promise<Role> {
        // Fetch the role by id and load relations
        const role = await this.roleRepository.findOne({
            where: { id },
            relations: ['permissions'], // Load the permissions relation
        });

        if (!role) {
            throw new Error('Role not found'); // Handle not found case
        }

        return role;
    }


    async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
        const role = await this.findOne(id); // Fetch the current role

        // Update the role name if provided
        if (updateRoleDto.name) {
            role.name = updateRoleDto.name;
        }

        // Update permissions if provided
        if (updateRoleDto.permissions) {
            // Fetch permissions from the database
            const permissions = await this.permissionRepository.findByIds(updateRoleDto.permissions);
            role.permissions = permissions; // Assign the fetched permissions
        }

        await this.roleRepository.save(role); // Save the updated role
        return role; // Return the updated role
    }

    async remove(id: number): Promise<void> {
        await this.roleRepository.delete(id);
    }
}

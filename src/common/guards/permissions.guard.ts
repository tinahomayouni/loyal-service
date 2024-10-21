import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/entity/user.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
        if (!requiredPermissions) {
            return true; // No permissions required
        }

        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        console.log('User:', user);
        if (!user || !user.role) {
            throw new ForbiddenException('User not found or roles not assigned.');
        }

        // Check if user has the required permissions
        const hasPermission = () => {
            if (!user.role) return false; // If roles are not defined, return false
        
            return user.roles.some(role => 
                role.permissions && role.permissions.some(permission => 
                    requiredPermissions.includes(permission.name)
                )
            );
        };
        if (!hasPermission()) {
            throw new ForbiddenException('You do not have the required permissions to access this resource');
        }

        return true;
    }
}

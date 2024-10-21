// permissions.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/entity/role.entity';
import { User } from 'src/entity/user.entity';


@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
        if (!requiredPermissions) {
            return true; // If no permissions are required, allow access
        }

        const request = context.switchToHttp().getRequest();
        const user: User = request.user; // Assuming user is attached to the request after authentication

        // Check if user has the required permissions
        const hasPermission = user.roles.some((role: Role) =>
            role.permissions.some(permission => requiredPermissions.includes(permission.name)),
        );

        if (!hasPermission) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}

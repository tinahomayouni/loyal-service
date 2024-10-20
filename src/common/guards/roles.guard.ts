import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/entity/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true; // If no roles are required, allow access
        }

        const request = context.switchToHttp().getRequest();
        const user: User = request.user; // Assuming user info is attached by JwtAuthGuard

        // Check if the user's role matches the required roles
        const hasRole = () => user && user.role && requiredRoles.includes(user.role);
        if (!hasRole()) {
            throw new ForbiddenException('Forbidden resource');
        }
        return true;
    }
}

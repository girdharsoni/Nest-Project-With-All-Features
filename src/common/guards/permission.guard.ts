// src/auth/jwt-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ExceptionHandler } from '../exceptions/exception-handler';
import { UsersService } from '../../modules/users/services/users.service';
import { buildPermissionMap } from '../utils/buildPermissionMap';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'];
    if (!user.role) {
      throw new UnauthorizedException('User not have any role');
    }
    const role = await this.usersService.getUserPermissions(user.role.id);
    try {
      const permissionMap = buildPermissionMap(role.rolePermissions);
      const method = request.method;
      const route = request.route.path;
      const permissionKey = `${method}:${route}`;
      // Check if the user has the required permission
      if (!permissionMap.get(permissionKey)) {
        throw new UnauthorizedException(
          'User does not have permission for this route',
        );
      }
      request['permissions'] = permissionMap;
      console.log(
        '[Info]: Passed Permission Guard, user with email:',
        user.email,
      );
      return true;
    } catch (error) {
      new ExceptionHandler(error);
    }
  }
}

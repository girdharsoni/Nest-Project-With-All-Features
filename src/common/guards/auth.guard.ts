// src/auth/jwt-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ExceptionHandler } from '../exceptions/exception-handler';
import { UsersService } from '../../modules/users/services/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization token missing');
    }
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
      ) as jwt.JwtPayload;
      // attach decoded user to request
      request['user'] = await this.usersService.findOne(payload.userId);
      console.log(
        '[Info]: Passed JWT Auth Guard, user with email:',
        request['user'].email,
      );
      return true;
    } catch (error) {
      new ExceptionHandler(error);
    }
  }
}

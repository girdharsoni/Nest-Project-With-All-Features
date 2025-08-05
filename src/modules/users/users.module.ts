import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { AuthTokenService } from './services/auth-token.service';
import { JwtService } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import { LoginOtp } from '../../entities/login-otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, LoginOtp])],
  controllers: [UsersController],
  providers: [JwtService, UsersService, AuthTokenService],
  exports: [UsersService],
})
export class UsersModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { Role } from '../../../entities/role.entity';
import { LoginOtp } from '../../../entities/login-otp.entity';
import { AuthTokenService } from './auth-token.service';
import { CustomError } from '../../../common/exceptions/custom-error';
import { ExceptionHandler } from '../../../common/exceptions/exception-handler';
import { RecordStatus } from '../../../common/constants/constants'; // Adjust the import path as necessary

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(LoginOtp) private loginOtpRepo: Repository<LoginOtp>,
    private authTokenService: AuthTokenService,
  ) {}
  // AuthTokenService is injected to create access tokens

  async create(email: string, name: string, password: string) {
    try {
      // Verify if user email address verification is completed or not in last 5 minutes
      const verifiedOtp = await this.loginOtpRepo.findOne({
        where: {
          email,
          status: RecordStatus.INACTIVE,
          created_at: MoreThan(new Date(Date.now() - 5 * 60 * 1000)),
        },
        order: { updated_at: 'DESC' },
      });
      if (!verifiedOtp) {
        throw CustomError.Conflict(
          'Email address verification is not completed or expired',
        );
      }
      const defaultRole = await this.roleRepo.findOne({
        where: { name: 'Default' },
      });
      const newUser = this.repo.create({
        email,
        name,
        password,
        role_id: defaultRole.id,
      });
      const savedUser = await this.repo.save(newUser);
      const { user } = await this.getNewTokens(savedUser.id);
      return { ...user, ...user.role };
    } catch (error) {
      new ExceptionHandler(error);
    }
  }
  async findOne(id: string) {
    try {
      const user = await this.repo.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      new ExceptionHandler(error);
    }
  }

  async signin(email: string, password: string) {
    try {
      const user = await this.repo.findOne({
        where: { email, password },
      });
      const { accessToken, refreshToken } = await this.getNewTokens(user.id);
      return { ...user, userId: user.id, accessToken, refreshToken };
    } catch (error) {
      new ExceptionHandler(error);
    }
  }

  async getNewTokens(
    userId: string,
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    try {
      const accessToken = await this.authTokenService.createAccessToken(userId);
      const refreshToken =
        await this.authTokenService.createRefreshToken(userId);
      const user = await this.repo.findOne({
        where: { id: userId },
        relations: ['role'],
      });
      Object.assign(user, {
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      await this.repo.save(user);
      return { user, accessToken, refreshToken };
    } catch (error) {
      new ExceptionHandler(error);
    }
  }

  async update(id: string, attrs: Partial<User>) {
    try {
      const user = await this.repo.findOneBy({ id });
      Object.assign(user, attrs);
      return this.repo.save(user);
    } catch (error) {
      new ExceptionHandler(error);
    }
  }

  async getUserPermissions(id: string) {
    try {
      const role = await this.roleRepo.findOne({
        where: { id },
        relations: ['rolePermissions', 'rolePermissions.permission'],
      });
      return role;
    } catch (error) {
      new ExceptionHandler(error);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.repo.findOneBy({ id });
      this.repo.remove(user);
    } catch (error) {
      new ExceptionHandler(error);
    }
  }
}

import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JWT } from '../constants/constants';

// AuthTokenService is a utility service for creating JWT tokens
@Injectable()
export class AuthTokenService {
  constructor(private jwtService: JwtService) {}

  async createAccessToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { userId },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: JWT.ACCESS_TOKEN_VALIDITY,
      },
    );
  }

  async createRefreshToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { userId },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: JWT.REFRESH_TOKEN_VALIDITY,
      },
    );
  }
}

import { Module } from '@nestjs/common';
import { LoginOtpService } from './services/login-otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginOtpController } from './controllers/login-otp.controller';
import { LoginOtp } from '../../entities/login-otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoginOtp])],
  controllers: [LoginOtpController],
  providers: [LoginOtpService],
})
export class LoginOtpModule {}

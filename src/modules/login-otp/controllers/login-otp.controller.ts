import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { LoginOtpService } from '../services/login-otp.service';
import { SendSignupOtpDto } from '../dto/send-signup-otp.dto';
import { VerifySignupOtpDto } from '../dto/verify-signup-otp.dto';
import { CommonOtpRespDto } from '../dto/common-otp-resp.dto';
import { Serialize } from '../../../common/interceptors/serialize.interceptors';

@Controller('login-otp')
export class LoginOtpController {
  constructor(private readonly loginOtpService: LoginOtpService) {}

  @Serialize(CommonOtpRespDto)
  @Post('/send')
  send(@Body() body: SendSignupOtpDto) {
    return this.loginOtpService.create(body.email);
  }

  @Serialize(CommonOtpRespDto)
  @Post('/verify')
  @HttpCode(200)
  verify(@Body() body: VerifySignupOtpDto) {
    return this.loginOtpService.verify(body.email, body.otp);
  }
}

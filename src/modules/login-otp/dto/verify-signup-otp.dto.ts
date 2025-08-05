import { IsEmail, IsString } from 'class-validator';

export class VerifySignupOtpDto {
  @IsEmail()
  email: string;

  @IsString()
  otp: string;
}

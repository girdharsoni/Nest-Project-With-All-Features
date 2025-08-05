import { Test, TestingModule } from '@nestjs/testing';
import { LoginOtpController } from './login-otp.controller';
import { LoginOtpService } from '../services/login-otp.service';

describe('LoginOtpController', () => {
  let controller: LoginOtpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginOtpController],
      providers: [LoginOtpService],
    }).compile();

    controller = module.get<LoginOtpController>(LoginOtpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

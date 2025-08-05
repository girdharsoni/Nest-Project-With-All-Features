import { Test, TestingModule } from '@nestjs/testing';
import { LoginOtpService } from './login-otp.service';

describe('LoginOtpService', () => {
  let service: LoginOtpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginOtpService],
    }).compile();

    service = module.get<LoginOtpService>(LoginOtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

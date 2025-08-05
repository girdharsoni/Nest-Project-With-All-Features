import { Injectable } from '@nestjs/common';
import { Repository, MoreThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginOtp } from '../../../entities/login-otp.entity';
import { ExceptionHandler } from '../../../common/exceptions/exception-handler';
import { CustomError } from '../../../common/exceptions/custom-error';
import { RecordStatus } from '../../../common/constants/constants'; // Adjust the import path as necessary

@Injectable()
export class LoginOtpService {
  constructor(
    @InjectRepository(LoginOtp)
    private repo: Repository<LoginOtp>,
  ) {}
  // If we want to execute hooks then we have to use create for entity instance
  async create(email: string) {
    try {
      // Check if last OTP for this email is still valid
      const isLastOtpValid = await this.isLastOtpValid(email);
      if (isLastOtpValid) {
        throw CustomError.Conflict(
          'An OTP has already been sent. Please wait for it to expire.',
        );
      } else {
        // Generate a random OTP (for simplicity, using a random number here)
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const loginOtp = this.repo.create({
          email,
          otp,
          expiration: new Date(Date.now() + 2 * 60 * 1000),
        }); // OTP valid for 2 minutes
        // Email sending logic would go here, using a service like Nodemailer or SendGrid
        return this.repo.save(loginOtp);
      }
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  async verify(email: string, otp: string) {
    try {
      const CURRENT_TIMESTAMP = new Date();
      const result = await this.repo.findOne({
        where: { email, otp, expiration: MoreThan(CURRENT_TIMESTAMP) },
      });
      if (!result) {
        throw CustomError.Conflict('Invalid or expired OTP');
      }
      // Optionally, Soft delete the OTP after successful verification
      await this.repo.update(result.id, { status: RecordStatus.INACTIVE });
      return result;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  async isLastOtpValid(email: string): Promise<boolean> {
    try {
      const CURRENT_TIMESTAMP = new Date();
      const lastOtp = await this.repo.findOne({
        where: { email },
        order: { created_at: 'DESC' },
      });
      return lastOtp !== null && lastOtp.expiration > CURRENT_TIMESTAMP;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }
}

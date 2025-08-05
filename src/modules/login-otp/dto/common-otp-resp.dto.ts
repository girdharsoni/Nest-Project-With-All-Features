import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CommonOtpRespDto {
  @IsString()
  @Expose()
  message: string;
}

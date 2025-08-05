import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class DeleteReportDto {
  @IsString()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  message: string;
}

import { Expose, Type } from 'class-transformer';
import { ReportDto } from './report.dto';

export class GetAllReportsDto {
  @Expose()
  totalReports: number;

  @Expose()
  @Type(() => ReportDto) // Ensure the array is transformed using ReportDto
  reports: ReportDto[];
}

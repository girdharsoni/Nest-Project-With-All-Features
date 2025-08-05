import { IsString, IsNumber, IsOptional } from 'class-validator';
export class UpdateReportDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;
}

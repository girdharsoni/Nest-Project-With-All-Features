import { IsString, IsNumber } from 'class-validator';
export class CreateReportDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;
}

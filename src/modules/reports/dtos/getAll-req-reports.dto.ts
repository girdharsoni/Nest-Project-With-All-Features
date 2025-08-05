import { IsNumber } from 'class-validator';
export class GetAllReqReportsDto {
  @IsNumber()
  page: number;

  @IsNumber()
  size: number;
}

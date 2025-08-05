import { Expose } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  price: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

import { Expose } from 'class-transformer';

export class UserRespDto {
  @Expose()
  id: string;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}

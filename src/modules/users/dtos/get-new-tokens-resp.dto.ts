import { IsString } from 'class-validator';

export class GetNewTokensRespDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}

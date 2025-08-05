import { IsString, IsEmail, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Role } from '../../../entities/role.entity';
export class SignInUserRespDto {
  @Expose()
  @IsString()
  access_token: string;

  @Expose()
  @IsString()
  refresh_token: string;

  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @ValidateNested()
  @Type(() => Role)
  role: Role;
}

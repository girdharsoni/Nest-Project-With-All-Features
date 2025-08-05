import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
// import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UsersService } from '../services/users.service';
import { Serialize } from '../../../common/interceptors/serialize.interceptors';
import { UserDto } from '../dtos/user.dto';
import { UserRespDto } from '../dtos/common-user-resp.dto';
import { SignInUserDto } from '../dtos/signin-user.dto';
import { SignInUserRespDto } from '../dtos/signin-user-resp.dto';
import { GetNewTokensRespDto } from '../dtos/get-new-tokens-resp.dto';
import { JwtAuthGuard } from '../../../common/guards/auth.guard';
import { PermissionGuard } from '../../../common/guards/permission.guard';

@Controller('auth')
// @Serialize(UserDto) // It will automatically apply this interceptor to whole controller
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Serialize(SignInUserRespDto)
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.name, body.password);
  }

  @Serialize(SignInUserRespDto)
  @Post('/signin')
  @HttpCode(200) // To avoid default 201 status code for POST requests
  async signin(@Body() body: SignInUserDto) {
    return this.usersService.signin(body.email, body.password);
  }

  @Serialize(GetNewTokensRespDto)
  @Get('/getNewTokens')
  async getNewAccessToken(@Body() body: { userId: string }) {
    return this.usersService.getNewTokens(body.userId);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Serialize(UserRespDto)
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Serialize(UserRespDto)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }
}

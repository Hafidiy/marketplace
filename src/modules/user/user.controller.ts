import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { QueryDto } from '../common/models/query.dto';
import { UserCreateDto } from './models/user-create.dto';
import {
  UserUpdateInfoDto,
  UserUpdatePasswordDto,
} from './models/user-update.dto';
import { IUser } from './models/user.interface';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(
    @Query() queryDto: QueryDto
  ): Promise<{ users: IUser[] }> {
    return this.userService.getUsers(queryDto);
  }

  @Post()
  createUser(@Body() body: UserCreateDto): Promise<{ user: IUser }> {
    return this.userService.createUser(body);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<{ user: IUser }> {
    return this.userService.getUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Put(':id/info')
  updateUserInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserUpdateInfoDto,
  ): Promise<{ user: IUser }> {
    return this.userService.updateUserInfo(id, body);
  }

  @Put(':id/password')
  updateUserPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserUpdatePasswordDto,
  ) {
    return this.userService.updateUserPassword(id, body);
  }
}

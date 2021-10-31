import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { IUser } from '../user/models/user.interface';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { GetUser } from '../common/get-user.decorator';
import { UserEntity } from '../user/models/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('/signup')
  // signUp(
  //   @Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto,
  // ): Promise<void> {
  //   return this.authService.signUp(authcredentialsDto);
  // }

  @Post('/signin')
  signIn(
    @Body() body,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: IUser }> {
    return this.authService.signIn(body, res);
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  getUser(@GetUser() user: UserEntity) {
    return { user };
  }

  @Post('/signout')
  signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
  }
}

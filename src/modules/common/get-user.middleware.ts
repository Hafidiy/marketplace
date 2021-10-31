import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../user/user.service';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const cookie = req.cookies['jwt'];

    if (!cookie) {
      throw new UnauthorizedException();
    }

    try {
      const data = await this.jwtService.verifyAsync(cookie);

      const { user } = await this.userService.getUser({ id: data.id });

      req.user = user;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException();
      } else {
        throw new InternalServerErrorException();
      }
    }

    next();
  }
}

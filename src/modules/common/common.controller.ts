import { Controller, Get, Query, Res } from '@nestjs/common';
import { query, Response } from 'express';
import { CommonService } from './common.service';

@Controller()
export class CommonController {
  constructor(private commonService: CommonService) {}

  @Get()
  dashboard(@Res() res: Response) {
    res.render('dashboard');
  }

  @Get('/users')
  users(@Res() res: Response) {
    return this.commonService.users(res);
  }

  @Get('/products')
  products(@Res() res: Response) {
    res.render('products');
  }

  @Get('/shops')
  shops(@Res() res: Response) {
    return this.commonService.shops(res);
  }

  @Get('/transactions')
  transactions(@Query() query, @Res() res: Response) {
    return this.commonService.transactions(res, query);
  }

  @Get('/orders')
  orders(@Res() res: Response) {
    res.render('orders');
  }

  @Get('/roles')
  post_houses(@Res() res: Response) {
    res.render('roles');
  }

  @Get('/categories')
  categories(@Res() res: Response) {
    res.render('categories');
  }

  @Get('/feedbacks')
  feedback(@Query() query, @Res() res: Response) {
    return this.commonService.feedbacks(res, query);
  }

  @Get('/filters')
  filters(@Res() res: Response) {
    res.render('filters');
  }
}

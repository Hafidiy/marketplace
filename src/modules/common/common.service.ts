import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { FeedbackService } from '../feedback/feedback.service';
import { ShopService } from '../shop/shop.service';
import { TransactionService } from '../transaction/transaction.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CommonService {
  constructor(
    private userService: UserService,
    private shopService: ShopService,
    private feedbackService: FeedbackService,
    private transactionService: TransactionService,
  ) {}

  async users(res: Response) {
    const page = 1;

    const {
      users,
      meta: { last_page },
    } = await this.userService.getUsers();

    res.render('users', { users, page });
  }

  async shops(res: Response, query?) {
    const page = 1;

    const { shops } = await this.shopService.getShops();

    res.render('shops', { shops, page });
  }

  async transactions(res: Response, query?) {
    const {
      transactions,
      meta: { last_page },
    } = await this.transactionService.getTransactions(query);

    let page = 1;
    if(query && query.page){
      page = parseInt(query.page);
    }

    res.render('transactions', {
      page,
      last_page,
      transactions,
      routeName: 'transactions',
    });
  }

  async feedbacks(res: Response, query?) {
    const {
      feedbacks,
      meta: { last_page },
    } = await this.feedbackService.getFeedbacks(query);

    let page = 1;
    if(query && query.page){
      page = parseInt(query.page);
    }

    res.render('feedbacks', {
      page,
      last_page,
      feedbacks,
      routeName: 'feedbacks',
    });
  }
}

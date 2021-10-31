import { Module } from '@nestjs/common';
import { FeedbackModule } from '../feedback/feedback.module';
import { ShopModule } from '../shop/shop.module';
import { TransactionModule } from '../transaction/transaction.module';
import { UserModule } from '../user/user.module';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  imports: [UserModule, FeedbackModule, TransactionModule, ShopModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}

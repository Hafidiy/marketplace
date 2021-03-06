import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductModule } from './modules/product/product.module';
import { CommonModule } from './modules/common/common.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { OrderModule } from './modules/order/order.module';
import { RegionModule } from './modules/region/region.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { PostHouseModule } from './modules/post-house/post-house.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { ShopModule } from './modules/shop/shop.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductModule,
    CommonModule,
    PermissionModule,
    RoleModule,
    UserModule,
    AuthModule,
    TransactionModule,
    OrderModule,
    RegionModule,
    FeedbackModule,
    OrderItemModule,
    ShopModule,
    CategoryModule,
    
    // PostHouseModule,
  ],
})
export class AppModule {}

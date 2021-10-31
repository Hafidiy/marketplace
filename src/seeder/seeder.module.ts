import { Logger, Module } from '@nestjs/common';
import { Seeder } from './seeder';
import { DatabaseProviderModule } from './providers/database/postgres/provider.module';
import { PermissionSeederModule } from './modules/permissions/permissions.module';
import { RoleSeederModule } from './modules/roles/roles.module';
import { CategorySeederModule } from './modules/categories/categories.module';
import { CategoryItemSeederModule } from './modules/category_items/category_items.module'
import { BrandSeederModule } from './modules/brands/brands.module';
import { TransactionSeederModule } from './modules/transactions/transactions.module';
import { FeedbackSeederModule } from './modules/feedbacks/feedbacks.module';
import { RegionSeederModule } from './modules/regions/regions.module';
import { OrderSeederModule } from './modules/orders/orders.module';
import { OrderItemSeederModule } from './modules/order_items/order_items.module';
import { ProductSeederModule } from './modules/products/products.module';
import { ShopSeederModule } from './modules/shops/shops.module';

@Module({
  imports: [
    DatabaseProviderModule,
    PermissionSeederModule,
    RoleSeederModule,
    CategorySeederModule,
    CategoryItemSeederModule,
    BrandSeederModule,
    TransactionSeederModule,
    FeedbackSeederModule,
    RegionSeederModule,
    OrderSeederModule,
    OrderItemSeederModule,
    ShopSeederModule,
    // ProductSeederModule,
  ],
  providers: [Logger, Seeder],
})
export class SeederModule {}

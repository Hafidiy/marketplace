import { Injectable, Logger } from '@nestjs/common';
import { PermissionSeederService } from './modules/permissions/permissions.services';
import { RoleSeederService } from './modules/roles/roles.services';
import { CategorySeederService } from './modules/categories/categories.services';
import { CategoryItemSeederService } from './modules/category_items/category_items.services';
import { OrderSeederService } from './modules/orders/orders.services';
import { OrderItemSeederService } from './modules/order_items/order_items.services';
import { BrandSeederService } from './modules/brands/brands.services';
import { TransactionSeederService } from './modules/transactions/transactions.services';
import { FeedbackSeederService } from './modules/feedbacks/feedbacks.services';
import { RegionSeederService } from './modules/regions/regions.services';
import { ShopSeederService } from './modules/shops/shops.services';
// import { ProductSeederService } from './modules/products/products.services';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly permissionSeederService: PermissionSeederService,
    private readonly roleSeederService: RoleSeederService,
    private readonly categorySeederService: CategorySeederService,
    private readonly categoryItemSeederService: CategoryItemSeederService,
    private readonly orderSeederService: OrderSeederService,
    private readonly orderItemSeederService: OrderItemSeederService,
    private readonly brandSeederService: BrandSeederService,
    private readonly transactionSeederService: TransactionSeederService,
    private readonly feedbackSeederService: FeedbackSeederService,
    private readonly regionSeederService: RegionSeederService,
    private readonly shopSeederService: ShopSeederService,
    // private readonly productSeederService: ProductSeederService,
  ) {}

  async seed() {
    try {
      let completed = true;

      // completed = (await this.permissions()) && completed;
      // completed = (await this.roles()) && completed;
      // completed = (await this.categories()) && completed;
      // completed = (await this.category_items()) && completed;
      // completed = await this.orders() && completed;
      // completed = (await this.order_items()) && completed;
      // completed = (await this.brands()) && completed;
      completed = (await this.transactions()) && completed;
      completed = (await this.feedbacks()) && completed;
      completed = (await this.regions()) && completed;
      completed = (await this.shops()) && completed;

      // completed = await this.products() && completed;

      console.log('completed: ', completed);
      this.logger.debug('Successfuly completed seeding...');
      Promise.resolve(completed);
    } catch (err) {
      this.logger.error('Failed seeding users...');
      console.log('Error Seeder seed: ', err);
      Promise.reject(err);
    }
  }

  async permissions() {
    try {
      const createdPermissions = await this.permissionSeederService.create();
      this.logger.debug(
        'No. of permissions created : ' +
          createdPermissions.filter((e) => e).length,
      );
      return Promise.resolve(true);
    } catch (err) {
      console.log('Error Seeder permissions: ', err);
      Promise.reject(err);
    }
  }

  async roles() {
    try {
      const createdRoles = await this.roleSeederService.create();
      this.logger.debug(
        'No. of roles created : ' + createdRoles.filter((e) => e).length,
      );
      return Promise.resolve(true);
    } catch (err) {
      console.log('Error Seeder roles: ', err);
      Promise.reject(err);
    }
  }

  async categories() {
    try {
      const createdCategories = await this.categorySeederService.create();
      this.logger.debug(
        'No. of categories created : ' +
          createdCategories.filter((e) => e).length,
      );
      return Promise.resolve(true);
    } catch (err) {
      console.log('Error Seeder categories: ', err);
      Promise.reject(err);
    }
  }

  async category_items() {
    try {
      const createdCategoryItems =
        await this.categoryItemSeederService.create();
      this.logger.debug(
        'No. of category_items created : ' +
          createdCategoryItems.filter((e) => e).length,
      );
      return Promise.resolve(true);
    } catch (err) {
      console.log('Error Seeder category_items: ', err);
      Promise.reject(err);
    }
  }

  async orders() {
    try {
      const createdOrders = await this.orderSeederService.create();
      this.logger.debug(
        'No. of orders created : ' + createdOrders.filter((e) => e).length,
      );
      return Promise.resolve(true);
    } catch (err) {
      console.log('Error Seeder orders: ', err);
      Promise.reject(err);
    }
  }

  async order_items() {
    try {
      const createdOrderItems = await this.orderItemSeederService.create();
      this.logger.debug(
        'No. of orders created : ' + createdOrderItems.filter((e) => e).length,
      );
      return Promise.resolve(true);
    } catch (err) {
      console.log('Error Seeder orders: ', err);
      Promise.reject(err);
    }
  }

  async brands() {
    try {
      const createdBrands = await this.brandSeederService.create();
      this.logger.debug(
        'No. of brands created : ' + createdBrands.filter((e) => e).length,
      );
      return Promise.resolve(true);
    } catch (err) {
      console.log('Error Seeder brands: ', err);
      Promise.reject(err);
    }
  }

  async transactions() {
    try {
      const createdTransactions = await this.transactionSeederService.create();
      this.logger.debug(
        'No. of transactions created : ' +
          createdTransactions.filter((e) => e).length,
      );
      return Promise.resolve(true);
    } catch (err) {
      console.log('Error Seeder transactions: ', err);
      Promise.reject(err);
    }
  }

  async feedbacks() {
    try {
      const createdFeedbacks = await this.feedbackSeederService.create();
      this.logger.debug(
        'No. of feedbacks created : ' +
          createdFeedbacks.filter((e) => e).length,
      );
      return Promise.resolve(true);
    } catch (err) {
      console.log('Error Seeder feedbacks: ', err);
      Promise.reject(err);
    }
  }

  async regions() {
    try {
      const createdRegions = await this.regionSeederService.create();
      this.logger.debug(
        'No. of regions created : ' + createdRegions.filter((e) => e).length,
      );
      return Promise.resolve(true);
    } catch (err) {
      console.log('Error Seeder regions: ', err);
      Promise.reject(err);
    }
  }

  async shops() {
    try {
      const createdShops = await this.shopSeederService.create();
      this.logger.debug(
        'No. of shops created : ' + createdShops.filter((e) => e).length,
      );
      return Promise.resolve(true);
    } catch (err) {
      console.log('Error Seeder shops: ', err);
      Promise.reject(err);
    }
  }

  // async products() {
  //   try {
  //     const createdProducts = await Promise.all(
  //       this.productSeederService.create(),
  //     );
  //     this.logger.debug(
  //       'No. of products created : ' + createdProducts.filter((e) => e).length,
  //     );
  //     return Promise.resolve(true);
  //   } catch (err) {
  //     console.log('Error Seeder products: ', err);
  //     Promise.reject(err);
  //   }
  // }
}

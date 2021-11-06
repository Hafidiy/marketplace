import { Injectable, Logger } from '@nestjs/common';
import { PermissionSeederService } from './modules/permissions/permissions.services';
import { RoleSeederService } from './modules/roles/roles.services';
import { OrderSeederService } from './modules/orders/orders.services';
import { OrderItemSeederService } from './modules/order_items/order_items.services';
import { TransactionSeederService } from './modules/transactions/transactions.services';
import { RegionSeederService } from './modules/regions/regions.services';
import { ShopSeederService } from './modules/shops/shops.services';
// import { ProductSeederService } from './modules/products/products.services';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly permissionSeederService: PermissionSeederService,
    private readonly roleSeederService: RoleSeederService,
    private readonly orderSeederService: OrderSeederService,
    private readonly orderItemSeederService: OrderItemSeederService,
    private readonly transactionSeederService: TransactionSeederService,
    private readonly regionSeederService: RegionSeederService,
    private readonly shopSeederService: ShopSeederService,
    // private readonly productSeederService: ProductSeederService,
  ) {}

  async seed() {
    try {
      let completed = true;

      // completed = (await this.permissions()) && completed;
      // completed = (await this.roles()) && completed;
      // completed = await this.orders() && completed;
      // completed = (await this.order_items()) && completed;
      // completed = (await this.transactions()) && completed;
      // completed = (await this.regions()) && completed;
      // completed = (await this.shops()) && completed;
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

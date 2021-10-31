import { Module } from "@nestjs/common";
import { OrderModule } from "src/modules/order/order.module";
import { OrderSeederService } from "./orders.services";

@Module({
    imports: [OrderModule],
    providers: [OrderSeederService],
    exports: [OrderSeederService],
  })
  export class OrderSeederModule {}
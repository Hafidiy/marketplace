import { Module } from "@nestjs/common";
import { OrderItemModule } from "src/modules/order-item/order-item.module";
import { OrderItemSeederService } from "./order_items.services";

@Module({
    imports: [OrderItemModule],
    providers: [OrderItemSeederService],
    exports: [OrderItemSeederService],
  })
  export class OrderItemSeederModule {}
  
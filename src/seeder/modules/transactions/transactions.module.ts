import { Module } from "@nestjs/common";
import { TransactionModule } from "src/modules/transaction/transaction.module";
import { TransactionSeederService } from "./transactions.services";

@Module({
    imports: [TransactionModule],
    providers: [TransactionSeederService],
    exports: [TransactionSeederService],
  })
  export class TransactionSeederModule {}
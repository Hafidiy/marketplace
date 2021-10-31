import { Injectable } from "@nestjs/common";
import { ITransaction } from "src/modules/transaction/models/transaction.interface";
import { TransactionService } from "src/modules/transaction/transaction.service";
import { initialTransactions } from "src/seeder/data/transactions";

@Injectable()
export class TransactionSeederService {
  constructor(private transactionService: TransactionService) {}

  async create(): Promise<ITransaction[]> {
    const transactions: ITransaction[] = [];

    for (let i = 0; i < initialTransactions.length; i++) {
      // console.log('name: ', initialTransactions[i].name);
      try {
        const { transaction } = await this.transactionService.createTransaction(
          initialTransactions[i],
        );

        // console.log('transaction: ', transaction);
        transactions.push(transaction);
      } catch (err) {
        console.log('Error transaction service', err);
        Promise.reject(err);
      }
    }

    // console.log('transactions: ', transactions);
    return transactions;
  }
}

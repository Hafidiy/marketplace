import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryDto } from "../common/models/query.dto";
import { TransactionDto } from "./models/transaction.dto";
import { TransactionEntity } from "./models/transaction.entity";
import { ITransaction, ITransactionPaginated } from "./models/transaction.interface";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async getTransactions(query?: QueryDto): Promise<ITransactionPaginated> {
    let { page, count } = query || {};

    if(page && typeof page === 'string'){
      page = parseInt(page);
    }

    if(count && typeof count === 'string'){
      count = parseInt(count)
    }

    page = page && page > 1 ? page : 1;
    count = count && count > 1 ? count : 10;

    const [transactions, total] = await this.transactionRepository.findAndCount({
      take: count,
      skip: (page - 1) * count,
    });

    return { transactions, meta: {
      total,
      page,
      last_page: Math.ceil(total / count)
    } };
  }

  async createTransaction(
    data: TransactionDto,
  ): Promise<{ transaction: ITransaction }> {
    const { name } = data;

    try {
      const newTransaction = await this.transactionRepository.save({ name });
      return { transaction: newTransaction };
    } catch (err) {
      console.log('err: ', err);
      if (err.code === '23505') {
        throw new ConflictException('Brand already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getTransaction(condition): Promise<{ transaction: ITransaction }> {
    const transaction = await this.transactionRepository.findOne(condition);

    if(!transaction){
        throw new NotFoundException();
    }

    return { transaction };
  }

  async deleteTransaction(id: number): Promise<void> {
    const result = await this.transactionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateTransaction(
    id: number,
    data: TransactionDto,
  ): Promise<{ transaction: ITransaction }> {
    const { name } = data;

    const { transaction } = await this.getTransaction({ id });

    try {
      const updatedTransaction = await this.transactionRepository.save({
        ...transaction,
        name,
      });

      return { transaction: updatedTransaction };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Transaction already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

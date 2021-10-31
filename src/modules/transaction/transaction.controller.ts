import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { QueryDto } from '../common/models/query.dto';
import { TransactionDto } from './models/transaction.dto';
import { ITransaction } from './models/transaction.interface';
import { TransactionService } from './transaction.service'

@Controller('api/transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  getTransactions(
    @Query() queryDto: QueryDto
  ): Promise<{ transactions: ITransaction[] }> {
    return this.transactionService.getTransactions(queryDto);
  }

  @Post()
  createTransaction(@Body() body: TransactionDto): Promise<{ transaction: ITransaction }> {
    return this.transactionService.createTransaction(body);
  }

  @Get('/:id')
  getTransactionById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ transaction: ITransaction }> {
    return this.transactionService.getTransaction({ id });
  }

  @Delete('/:id')
  deleteTransaction(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.transactionService.deleteTransaction(id);
  }

  @Put('/:id')
  updateTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: TransactionDto,
  ): Promise<{ transaction: ITransaction }> {
    return this.transactionService.updateTransaction(id, body);
  }
}


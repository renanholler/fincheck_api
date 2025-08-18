import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './transactions.controller';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { CategoriesModule } from '../categories/categories.module';
import { ValidateTransactionsOwnershipService } from './services/validate-transactions-ownership.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, ValidateTransactionsOwnershipService],
  imports: [BankAccountsModule, CategoriesModule],
})
export class TransactionsModule {}

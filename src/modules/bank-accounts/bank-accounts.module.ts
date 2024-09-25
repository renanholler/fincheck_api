import { Module } from '@nestjs/common';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './services/bank-accounts.service';
import { ValidateBankOwnershipOwnershipService } from './services/validate-bank-account-ownership.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidateBankOwnershipOwnershipService],
  exports: [ValidateBankOwnershipOwnershipService],
})
export class BankAccountsModule {}

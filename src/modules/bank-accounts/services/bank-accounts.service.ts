import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValidateBankOwnershipOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankOwnershipOwnershipService: ValidateBankOwnershipOwnershipService,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, color, initialBalance, type } = createBankAccountDto;

    return this.bankAccountsRepo.create({
      data: {
        userId,
        name,
        color,
        initialBalance,
        type,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepo.findMany({
      where: { userId },
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankOwnershipOwnershipService.validate(
      userId,
      bankAccountId,
    );

    const { name, color, initialBalance, type } = updateBankAccountDto;

    return this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: {
        name,
        color,
        initialBalance,
        type,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankOwnershipOwnershipService.validate(
      userId,
      bankAccountId,
    );

    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId },
    });

    return null;
  }
}

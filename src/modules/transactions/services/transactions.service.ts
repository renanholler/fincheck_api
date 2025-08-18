import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionsOwnershipService } from './validate-transactions-ownership.service';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionsOwnershipService: ValidateTransactionsOwnershipService,
  ) {}

  async create(
    @ActiveUserId() userId: string,
    createTransactionDto: CreateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, value, type } =
      createTransactionDto;

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

    return this.transactionsRepo.create({
      data: { userId, bankAccountId, categoryId, date, name, value, type },
    });
  }

  findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    return this.transactionsRepo.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month - 1)),
          lt: new Date(Date.UTC(filters.year, filters.month)),
        },
      },
    });
  }

  async update(
    @ActiveUserId() userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, value, type } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });

    return this.transactionsRepo.update({
      where: { id: transactionId },
      data: { userId, bankAccountId, categoryId, date, name, value, type },
    });
  }

  async remove(@ActiveUserId() userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({ userId, transactionId });

    return this.transactionsRepo.delete({
      where: { id: transactionId },
    });
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionsOwnershipService.validate(
          userId,
          transactionId,
        ),
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}

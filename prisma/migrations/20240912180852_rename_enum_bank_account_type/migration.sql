/*
  Warnings:

  - You are about to drop the column `bank_account_type` on the `bank_accounts` table. All the data in the column will be lost.
  - Added the required column `type` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "bank_account_type" AS ENUM ('CHECKING', 'INVESTIMENT', 'CASH');

-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "bank_account_type",
ADD COLUMN     "type" "bank_account_type" NOT NULL;

-- DropEnum
DROP TYPE "BankAccountType";

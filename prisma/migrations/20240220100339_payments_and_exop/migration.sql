/*
  Warnings:

  - You are about to drop the column `last_payment_date` on the `lease` table. All the data in the column will be lost.
  - You are about to drop the column `lease_length` on the `lease` table. All the data in the column will be lost.
  - You are about to drop the column `lease_terms` on the `lease` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LeaseStatus" AS ENUM ('ACTIVE', 'PENDING', 'EXPIRED', 'TERMINATED');

-- CreateEnum
CREATE TYPE "PaymentFrequency" AS ENUM ('MONTHLY', 'QUARTERLY', 'ANNUALLY', 'WEEKLY');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'LATE', 'OVERDUE', 'CANCELLED', 'REJECTED');

-- AlterTable
ALTER TABLE "lease" DROP COLUMN "last_payment_date",
DROP COLUMN "lease_length",
DROP COLUMN "lease_terms",
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "payment_frequency" "PaymentFrequency",
ADD COLUMN     "special_terms" TEXT,
ADD COLUMN     "status" "LeaseStatus" DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "lease_payment_schedules" (
    "id" SERIAL NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "amountDue" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "lease_id" INTEGER NOT NULL,

    CONSTRAINT "lease_payment_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "description" TEXT,
    "amount" DOUBLE PRECISION,
    "currency" "CurrencyCode" DEFAULT 'USD',
    "date" TIMESTAMP(3),
    "category" TEXT,
    "status" TEXT,
    "notes" TEXT,
    "unit_id" INTEGER,
    "lease_id" INTEGER,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rent_payment" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION,
    "currency" "CurrencyCode" DEFAULT 'USD',
    "date" TIMESTAMP(3),
    "status" "PaymentStatus",
    "notes" TEXT,
    "payment_method" TEXT,
    "submitted_by" TEXT,
    "submission_date" TIMESTAMP(3),
    "approval_date" TIMESTAMP(3),
    "lease_id" INTEGER,
    "tenant_id" INTEGER,

    CONSTRAINT "rent_payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lease_payment_schedules" ADD CONSTRAINT "lease_payment_schedules_lease_id_fkey" FOREIGN KEY ("lease_id") REFERENCES "lease"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_lease_id_fkey" FOREIGN KEY ("lease_id") REFERENCES "lease"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent_payment" ADD CONSTRAINT "rent_payment_lease_id_fkey" FOREIGN KEY ("lease_id") REFERENCES "lease"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent_payment" ADD CONSTRAINT "rent_payment_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - The values [LATE,OVERDUE] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `submitted_by` to the `rent_payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentScheduleStatus" AS ENUM ('SCHEDULED', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'WAIVED');

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('PENDING', 'REPORTED', 'PAID', 'CANCELLED', 'REJECTED');
ALTER TABLE "lease_payment_schedules" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "lease_payment_schedules" ALTER COLUMN "status" TYPE "PaymentStatus_new" USING ("status"::text::"PaymentStatus_new");
ALTER TABLE "rent_payment" ALTER COLUMN "status" TYPE "PaymentStatus_new" USING ("status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "PaymentStatus_old";
ALTER TABLE "lease_payment_schedules" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "rent_payment" DROP COLUMN "submitted_by",
ADD COLUMN     "submitted_by" INTEGER NOT NULL;

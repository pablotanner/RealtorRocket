/*
  Warnings:

  - The `status` column on the `lease_payment_schedules` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "lease_payment_schedules" DROP COLUMN "status",
ADD COLUMN     "status" "PaymentScheduleStatus" NOT NULL DEFAULT 'SCHEDULED';

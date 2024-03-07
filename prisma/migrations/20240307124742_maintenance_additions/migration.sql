/*
  Warnings:

  - The values [CLOSED] on the enum `MaintenanceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MaintenanceStatus_new" AS ENUM ('REPORTED', 'OPEN', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED');
ALTER TABLE "maintenance_request" ALTER COLUMN "status" TYPE "MaintenanceStatus_new" USING ("status"::text::"MaintenanceStatus_new");
ALTER TYPE "MaintenanceStatus" RENAME TO "MaintenanceStatus_old";
ALTER TYPE "MaintenanceStatus_new" RENAME TO "MaintenanceStatus";
DROP TYPE "MaintenanceStatus_old";
COMMIT;

-- AlterEnum
ALTER TYPE "Priority" ADD VALUE 'CRITICAL';

-- AlterTable
ALTER TABLE "expense" ADD COLUMN     "maintenance_request_id" INTEGER;

-- AlterTable
ALTER TABLE "maintenance_request" ADD COLUMN     "category" TEXT,
ADD COLUMN     "notes" TEXT;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_maintenance_request_id_fkey" FOREIGN KEY ("maintenance_request_id") REFERENCES "maintenance_request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

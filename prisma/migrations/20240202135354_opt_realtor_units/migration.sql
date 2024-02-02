/*
  Warnings:

  - You are about to drop the column `realtor_id` on the `lease` table. All the data in the column will be lost.
  - You are about to drop the column `lease_id` on the `maintenance_request` table. All the data in the column will be lost.
  - You are about to drop the column `realtor_id` on the `unit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "lease" DROP CONSTRAINT "lease_realtor_id_fkey";

-- DropForeignKey
ALTER TABLE "maintenance_request" DROP CONSTRAINT "maintenance_request_lease_id_fkey";

-- DropForeignKey
ALTER TABLE "unit" DROP CONSTRAINT "unit_realtor_id_fkey";

-- AlterTable
ALTER TABLE "lease" DROP COLUMN "realtor_id";

-- AlterTable
ALTER TABLE "maintenance_request" DROP COLUMN "lease_id",
ADD COLUMN     "unit_id" INTEGER;

-- AlterTable
ALTER TABLE "unit" DROP COLUMN "realtor_id";

-- AddForeignKey
ALTER TABLE "maintenance_request" ADD CONSTRAINT "maintenance_request_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

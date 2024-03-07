/*
  Warnings:

  - You are about to drop the column `description` on the `maintenance_request` table. All the data in the column will be lost.
  - Made the column `title` on table `maintenance_request` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "maintenance_request" DROP CONSTRAINT "maintenance_request_reporter_id_fkey";

-- AlterTable
ALTER TABLE "maintenance_request" DROP COLUMN "description",
ALTER COLUMN "resolved_at" DROP NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "reporter_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "maintenance_request" ADD CONSTRAINT "maintenance_request_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - The `civil_status` column on the `tenant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CivilStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'SEPARATED', 'OTHER');

-- AlterTable
ALTER TABLE "tenant" DROP COLUMN "civil_status",
ADD COLUMN     "civil_status" "CivilStatus";

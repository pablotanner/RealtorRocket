-- DropForeignKey
ALTER TABLE "lease" DROP CONSTRAINT "lease_unit_id_fkey";

-- AlterTable
ALTER TABLE "unit" ADD COLUMN     "unit_identifier" TEXT;

-- AddForeignKey
ALTER TABLE "lease" ADD CONSTRAINT "lease_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

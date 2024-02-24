-- AlterTable
ALTER TABLE "unit" ADD COLUMN     "tenant_id" INTEGER;

-- AddForeignKey
ALTER TABLE "unit" ADD CONSTRAINT "unit_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

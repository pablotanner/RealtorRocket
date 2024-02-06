/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `tenant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `realtor_id` to the `lease` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lease" DROP CONSTRAINT "lease_tenant_id_fkey";

-- AlterTable
ALTER TABLE "lease" ADD COLUMN     "realtor_id" INTEGER NOT NULL,
ALTER COLUMN "tenant_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tenant" ADD COLUMN     "email" TEXT,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "user_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tenant_email_key" ON "tenant"("email");

-- AddForeignKey
ALTER TABLE "lease" ADD CONSTRAINT "lease_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lease" ADD CONSTRAINT "lease_realtor_id_fkey" FOREIGN KEY ("realtor_id") REFERENCES "realtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
